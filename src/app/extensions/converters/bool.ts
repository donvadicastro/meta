//TODO: create interface to work with. Should implement required 'parse' method
module MetaApp.Extensions.Converters {
    /**
     * Meta component boolean data converter singleton class implementation. Used to convert incoming server data to correct type.
     */
    export class BoolConverter {
        /**
         * Singleton class instance
         * @type {MetaApp.Extensions.Converters.BoolConverter}
         * @private
         */
        private static _instance: BoolConverter = new BoolConverter();

        /**
         * Constructor
         */
        constructor() {
            BoolConverter._instance = this;
        }

        /**
         * Return current class instance
         * @returns {BoolConverter}
         */
        public static getInstance(): BoolConverter
        {
            return BoolConverter._instance;
        }

        /**
         * Convert input object into boolean value
         * @param value
         * @returns {boolean}
         */
        public parse(value: string): boolean {
            return !!value;
        }
    }
}