module MetaApp.Contracts {
    /**
     * Meta component validation status contract declaration
     */
    export interface IValidationResult {
        /**
         * Is component valid
         */
        isValid: boolean;

        /**
         * Validation message for invalid state
         */
        message: string;
    }
}