///<reference path='base/baseValidator.ts'/>
///<reference path='../managers/resourceManager.ts'/>

module MetaApp.Validators {
    export class RequiredValidator extends BaseValidator {
        public validate(): Contracts.IValidationResult {
            var value = this._element.getValue();

            return {
                isValid: value !== undefined && value !== null && value !== '',
                message: MetaApp.Managers.ResourceManager.get('validators.requiredValidator.message')
            };
        }
    }
}