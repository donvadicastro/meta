import {ContainerBase} from './base/container';
import {EventManager} from '../../managers/eventManager';
import {IMetaContainerComponent} from '../../contracts/IMetaContainerComponent';
import {ElementBase} from "./base/base/element";
import {setByPath} from '../../utils/object';

/**
 * Form is the main logical container for some set of components which bound to some single data model.
 * Form handles all communications inside this logical container and is fully isolated.
 */
export class Form extends ContainerBase {
    /**
     * Data hash as set of key-value pairs where key is the binding
     */
    private _dataByBinding: any;

    /**
     * Component hash as set of key-value pairs where key is the component name
     */
    private _componentByName: any;

    /**
     * Event mediator reference
     */
    public eventManager: EventManager;

    /**
     * Form data reference
     */
    public data: Object;

    /**
     * Form-specific dictionaries
     */
    public dictionaries: Object;

    /**
     * Hash list of invalid elements
     */
    private invalidElements: Object;

    /**
     * Constructor
     * @param meta
     * @param options
     */
    constructor(meta: IMetaContainerComponent, options: any) {
        super(meta, options);
        this.eventManager = new EventManager();

        this.data = {};
        this.invalidElements = {};

        this._form = this;
        this._dataByBinding = {};
        this._componentByName = {};

        this.eventManager.on('data:*', this.onDataChange, this);
        this.eventManager.on('valid:*', this.onValid, this);
        this.eventManager.on('invalid:*', this.onInvalid, this);

        this.dictionaries = meta.dictionaries;

        //initialize component
        this.initialize(options);
    }

    /**
     * Component registration inside form
     * @param element
     */
    public registerComponent(element: ElementBase): void {
        this._form._componentByName[element.name] = element;
    }

    /**
     * Returns value in data model tree by path accessor
     * @param binding
     * @returns {any}
     */
    public getDataByPath(binding: string): any {
        return this._dataByBinding[binding];
    }

    /**
     * Form destroy
     */
    public destroy() {
    }

    /**
     * Data changes event listener
     * @param binding
     * @param value
     */
    private onDataChange(binding: string, value): void {
        this._dataByBinding[binding] = value;
        this.setByPath(binding, value);
    }

    /**
     * Component is valid event listener
     * @param name
     */
    private onValid(name: string) {
        delete this.invalidElements[name];
    }

    private onInvalid(name: string, message: string) {
        this.invalidElements[name] = message;
    }

    /**
     * Component is invalid event listener
     * @param binding
     * @param value
     */
    private setByPath(binding: string, value): void {
        setByPath(this.data, binding, value);
    }
}