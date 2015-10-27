module MetaApp.Utils {
    /**
     * String utility manager
     */
    export class String {
        /**
         * Returns new string with first letter in upper case and all other in lower case.
         * @param input
         * @returns {string}
         */
        public static toUpperCaseFirstLetter(input: string): string {
            return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        }
    }
}