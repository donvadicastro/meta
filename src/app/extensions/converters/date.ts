module MetaApp.Extensions.Converters {
    /**
     * Meta component date data converter singleton class implementation. Used to convert incoming server data to correct type.
     */
    export class DateConverter {
        /**
         * Singleton class instance
         * @type {MetaApp.Extensions.Converters.DateConverter}
         * @private
         */
        private static _instance: DateConverter = new DateConverter();

        /**
         * Constructor
         */
        constructor() {
            DateConverter._instance = this;
        }

        /**
         * Return current class instance
         * @returns {DateConverter}
         */
        public static getInstance(): DateConverter
        {
            return DateConverter._instance;
        }

        /**
         * Convert input object into date value
         * @param value
         * @returns {boolean}
         */
        public parse(value: string): Date {
            return new Date(value);
        }
    }
}