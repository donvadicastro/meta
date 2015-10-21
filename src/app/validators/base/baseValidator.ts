///<reference path='../../contracts/IValidationResult.ts'/>

module MetaApp.Validators {
    export class BaseValidator {
        public validate(value: any): Contracts.IValidationResult {
            return {success: true, message: undefined};
        }
    }
}