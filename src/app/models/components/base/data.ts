///<reference path='../../../Contracts/IMetaDataComponent.ts'/>
///<reference path='../../../extensions/converters/date.ts'/>
///<reference path='../../../extensions/converters/number.ts'/>
///<reference path='../../../validators/requiredValidator.ts'/>
///<reference path='base/element.ts'/>

module MetaApp.Models.Components {
    /**
     * Base class to describe containers. All container-based components should inherit from this base.
     * Handle all child relations.
     */
    export class DataBase extends ElementBase implements Contracts.IMetaDataComponent {
        /**
         * Data binding as path in data model tree
         */
        binding: string;

        /**
         * Component predefined value
         */
        value: any;

        /**
         * Component data type
         */
        type: Enums.MetaComponentType;

        /**
         * Component validators declaration
         */
        validation: any;

        /**
         * List of component filters
         */
        filters: Array<any>;

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
        constructor(meta: Contracts.IMetaDataComponent, options: any) {
            super(meta, options);

            this.binding = meta.binding;
            this.type = meta.type;
            this.validation = meta.validation;
            this.filters = meta.filters;

            this.bind();
            this.addValidators();

            (meta.value === undefined) || this.setValue(meta.value);
        }

        /**
         * Set new component value
         * @param value
         */
        public setValue(value: any): DataBase {
            var type = this.type,
                converter = type && MetaApp.Extensions.Converters[Enums.MetaComponentType[type] + 'Converter'],
                newValue = converter ? converter.getInstance().parse(value) : value;

            if(this.value !== newValue) {
                this.value = newValue;

                this._form && this._form.eventManager.trigger('data:' + this.binding, newValue, this);
                this._form && this._form.eventManager.trigger('data:*', this.binding, newValue, this);
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
            this.unbind();
            this.validators.length = 0;
        }

        /**
         * Validate component and return validation result
         * @returns {Contracts.IValidationResult}
         */
        public validate(): Contracts.IValidationResult {
            var valResult: Contracts.IValidationResult = super.validate();;

            for(var i=0, len=this.validators.length, v; i<len; i++) {
                v = this.validators[i].validate(this.value);
                if(!v.success) { valResult = v; };
            }

            this._form && this._form.eventManager.trigger((valResult.isValid ? 'valid:' : 'invalid:') + this.name, valResult.message);
            this._form && this._form.eventManager.trigger((valResult.isValid ? 'valid:*' : 'invalid:*'), this.name, valResult.message);

            return valResult;
        }

        /**
         * Bind component to form data processing mechanism
         */
        private bind() {
            this._form && this._form.eventManager.on('data:' + this.binding, this.onDataChange, this);
        }

        /**
         * Unbind component from form data processing mechanism
         */
        private unbind() {
            this._form && this._form.eventManager.off('data:' + this.binding, this.onDataChange, this);
        }

        /**
         * Component data was changed event listener
         * @param value
         */
        private onDataChange(value, sender) {
            sender === this || this.setValue(value).validate();
        }

        /**
         * Apply component validators
         */
        private addValidators() {
            for(var name in this.validation) {
                var v = this.validation[name],
                    vRef = Validators[MetaApp.Utils.String.toUpperCaseFirstLetter(name) + 'Validator'];

                this.validators.push(new vRef(this));
            }
        }
    }
}