///<reference path='base/baseValidator.ts'/>
///<reference path='../managers/resourceManager.ts'/>

module MetaApp.Validators {
    /**
     * Required value validator class implementation. Used to check component value is set.
     */
    export class RequiredValidator extends BaseValidator {
        /**
         * Validates component and return validation result.
         * @returns {{isValid: boolean, message: string}}
         */
        public validate(): Contracts.IValidationResult {
            var value = this._element.getValue();

            return {
                isValid: value !== undefined && value !== null && value !== '',
                message: MetaApp.Managers.ResourceManager.get('validators.requiredValidator.message')
            };
        }
    }
}