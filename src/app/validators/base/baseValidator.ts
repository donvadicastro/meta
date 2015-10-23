///<reference path='../../contracts/IValidationResult.ts'/>
///<reference path='../../models/components/base/data.ts'/>

module MetaApp.Validators {
    export class BaseValidator {
        protected _element: Models.Components.DataBase;

        constructor(element: Models.Components.DataBase) {
            this._element = element;
        }

        public validate(): Contracts.IValidationResult {
            return {isValid: true, message: undefined};
        }
    }
}