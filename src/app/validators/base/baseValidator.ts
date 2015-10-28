///<reference path='../../contracts/IValidationResult.ts'/>
///<reference path='../../models/components/base/data.ts'/>

module MetaApp.Validators {
    /**
     * Base validator class implementation. Class to be inherited from to create any other validators.
     */
    export class BaseValidator {
        /**
         * Component reference to be validated
         */
        protected _element: Models.Components.DataBase;

        /**
         * Constructor
         * @param element
         */
        constructor(element: Models.Components.DataBase) {
            this._element = element;
        }

        /**
         * Validates component and returns validation result
         * @returns {{isValid: boolean, message: string}}
         */
        public validate(): Contracts.IValidationResult {
            return {isValid: true, message: undefined};
        }
    }
}