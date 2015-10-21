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
        binding: string;
        value: any;
<<<<<<< HEAD
        type: string;
        validation: any;

        private validators: Array<any> = [];
=======
        type: Enums.MetaComponentType;
>>>>>>> 5ac5ad719ad8bf9e933b5f8f701c421ed7aa4346

        constructor(meta: Contracts.IMetaDataComponent, options: any) {
            super(meta, options);

            this.binding = meta.binding;
            this.type = meta.type;
            this.validation = meta.validation;

            this.bind();
            this.addValidators();

            (meta.value === undefined) || this.setValue(meta.value);
        }

        public setValue(value: any) {
            this.value = value;

            this._form && this._form.eventManager.trigger('data:' + this.binding, value);
            this._form && this._form.eventManager.trigger('data:*', this.binding, value);
        }

        public getValue() {
            return this.value;
        }

        public destroy() {
            this.unbind();
        }

        public validate(): Contracts.IValidationResult {
            for(var i=0, len=this.validators.length, v; i<len; i++) {
                v = this.validators[i].validate(this.value);
                if(!v.success) return v;
            }
        }

        private bind() {
            this._form && this._form.eventManager.on('data:' + this.binding, this.onDataChange, this);
        }

        private unbind() {
            this._form && this._form.eventManager.off('data:' + this.binding, this.onDataChange, this);
        }

        private onDataChange(value) {
            var type = this.type,
                converter = type && MetaApp.Extensions.Converters[Enums.MetaComponentType[type] + 'Converter'],
                newValue = converter ? converter.getInstance().parse(value) : value;

            if(newValue !== this.value)
                this.value = newValue;
        }

        private addValidators() {
            var vRef = {required: Validators.RequiredValidator};

            for(var name in this.validation) {
                var v = this.validation[name];
                this.validators.push(vRef[name]);
            }
        }
    }
}