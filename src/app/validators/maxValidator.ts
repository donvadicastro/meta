///<reference path='base/baseValidator.ts'/>
///<reference path='../managers/resourceManager.ts'/>

module MetaApp.Validators {
    export class MaxValidator extends BaseValidator {
        public validate(): Contracts.IValidationResult {
            var value = this._element.getValue(),
                valValue = this.getValidatorValue(),
                type = this.getTypeName(value);

            //call base when value is not set
            if(_.isUndefined(value)) { return super.validate(); }

            return {
                isValid: this[type + 'Validate'](value, valValue),
                message: this.getErrorMessage(type)
            };
        }

        protected getValidatorValue() {
            return this._element.validation.max;
        }

        protected getErrorMessage(type: string): string {
            return MetaApp.Managers.ResourceManager.get('validators.maxValidator.message.' + type);
        }

        protected stringValidate(actual: string, compare: number): boolean {
            return actual.length <= compare;
        }

        protected numberValidate(actual: number, compare: number): boolean {
            return actual <= compare;
        }

        protected getTypeName(actual: any): string {
            if(_.isString(actual)) { return 'string'; }
            if(_.isNumber(actual)) { return 'number'; }

            return 'object';
        }
    }
}