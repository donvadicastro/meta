///<reference path='maxValidator.ts'/>
///<reference path='../managers/resourceManager.ts'/>

module MetaApp.Validators {
    /**
     * Min value component validator. Used to check that input value is more then allowed.
     * This check includes string length min criteria checking, number min criteria checking or date min value checking.
     */
    export class MinValidator extends MaxValidator {
        /**
         * Gets min validation value to be used as left boundary
         * @returns {number} validation to check with
         */
        protected getValidatorValue() {
            return this._element.validation.min;
        }

        /**
         * Gets validation message
         * @param type
         * @returns {string}
         */
        protected getErrorMessage(type: string): string {
            return MetaApp.Managers.ResourceManager.get('validators.minValidator.message.' + type);
        }

        /**
         * String validator comparison
         * @param actual
         * @param compare
         * @returns {boolean}
         */
        protected stringValidate(actual: string, compare: number): boolean {
            return actual.length >= compare;
        }

        /**
         * Number validator comparison
         * @param actual
         * @param compare
         * @returns {boolean}
         */
        protected numberValidate(actual: number, compare: number): boolean {
            return actual >= compare;
        }
    }
}