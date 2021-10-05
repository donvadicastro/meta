import {IMetaDataComponent} from "../../../contracts/IMetaDataComponent";
import {MetaComponentType} from "../../../enums/metaComponentType";
import {IValidationResult} from "../../../contracts/IValidationResult";
import {setByPath} from "../../../utils/object";
import {capitalize} from "../../../utils/string";
import _ from "underscore";

import * as Converters from "../../../extensions/converters";
import * as Validators from "../../../validators";
import {request} from "../../../utils/remote";
import {ActionBase} from "./action";

/**
 * Base class to describe containers. All container-based components should inherit from this base.
 * Handle all child relations.
 */
export class DataBase extends ActionBase implements IMetaDataComponent {
    /**
     * Data binding as path in data model tree
     */
    binding?: string;

    /**
     * Component predefined value
     */
    value: any;

    /**
     * Component data type
     */
    type: MetaComponentType;

    /**
     * Component validators declaration
     */
    validation: any;

    /**
     * List of component filters
     */
    filters?: Array<any>;

    /**
     * Component instantiated validators
     * @type {Array}
     */
    private validators: Array<any> = [];

    /**
     * Constructor
     * @param meta
     * @param options
     */
    constructor(meta: IMetaDataComponent, options?: any) {
        super(meta, options);

        this.binding = meta.binding;
        this.type = meta.type || 'string';
        this.validation = meta.validation;
        this.filters = meta.filters;

        this._bind();
        this._addValidators();

        (meta.value === undefined) || this.setValue(meta.value);
    }

    initialize(options?: any) {
        super.initialize(options);

        // support remote load only when there is place to inject data into
        if (this._meta.valueSource && this._meta.binding) {
            request(this._meta.valueSource).then((data: any) => this.setValue(data));
        }
    }

    /**
     * Set new component value
     * @param value
     */
    public setValue(value: any): DataBase {
        const type = this.type,
            //@ts-ignore
            converter = type && Converters['convert' + capitalize(type)],
            newValue = converter ? converter(value) : value;

        if(this.value !== newValue) {
            this.value = newValue;

            if (this.binding) {
                this._notifyChange(newValue, this.binding);
                this._container && setByPath(this._container.data, this.binding, newValue);
            }
        }

        return this;
    }

    /**
     * Get current component value
     * @returns {any}
     */
    public getValue() {
        return this.value;
    }

    /**
     * Destroy
     */
    public destroy() {
        this._unbind();
        this.validators.length = 0;
    }

    /**
     * Validate component and return validation result
     * @returns {IValidationResult}
     */
    public validate(): IValidationResult {
        let valResult: IValidationResult = super.validate();

        for(let i=0, len=this.validators.length, v; i<len; i++) {
            v = this.validators[i].validate(this.value);
            if(!v.success) { valResult = v; }
        }

        this._form && this._form.eventManager.trigger((valResult.isValid ? 'valid:' : 'invalid:') + this.name, valResult.message);
        this._form && this._form.eventManager.trigger((valResult.isValid ? 'valid:*' : 'invalid:*'), this.name, valResult.message);

        return valResult;
    }

    /**
     * Bind to data model change event.
     * @param onDataChange change handler.
     */
    public bindModelChange(onDataChange: Function) {
        this._form && this._form.eventManager.on('data:' + this.binding, onDataChange, this);
    }

    /**
     * Unbind from data model change event.
     * @param onDataChange change handler.
     */
    public unbindModelChange(onDataChange: Function) {
        this._form && this._form.eventManager.off('data:' + this.binding, onDataChange, this);
    }

    /**
     * Bind component to form data processing mechanism
     */
    private _bind() {
        const binding = this._parent?.binding ? `${this._parent?.binding}.${this.binding}` : this.binding;
        this._form && this._form.eventManager.on('data:' + binding, this._onDataChange, this);
    }

    /**
     * Unbind component from form data processing mechanism
     */
    private _unbind() {
        const binding = this._parent?.binding ? `${this._parent?.binding}.${this.binding}` : this.binding;
        this._form && this._form.eventManager.off('data:' + binding, this._onDataChange, this);
    }

    /**
     * Component data was changed event listener
     * @param value
     * @param sender
     */
    private _onDataChange(value: any, sender: IMetaDataComponent) {
        sender === this || this.setValue(value).validate();
    }

    /**
     * Apply component validators
     */
    private _addValidators() {
        for(let name in this.validation) {
            //@ts-ignore
            const vRef = Validators[capitalize(name) + 'Validator'];
            this.validators.push(new vRef(this));
        }
    }

    private _notifyChange(value: any, binding: string) {
        // form should catch event earlier to properly update data model before it use, so "*" is first
        this._form && this._form.eventManager.trigger('data:*', binding, value, this);
        this._form && this._form.eventManager.trigger(`data:${binding}`, value, this);

        // as well iterate over complex object to notify change happens when particular property binding exists
        _.isObject(value) && Object.keys(value).forEach(key => this._notifyChange(value[key], `${binding}.${key}`));
    }
}
