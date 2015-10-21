///<reference path='base/baseValidator.ts'/>

module MetaApp.Validators {
    export class RequiredValidator extends BaseValidator {
        public validate(value: any): Contracts.IValidationResult {
            return {
                success: value !== undefined && value !== null && value !== '',
                message: 'this field is required'
            };
        }
    }
}