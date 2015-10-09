module MetaApp.Extensions.Converters {
    export class DateConverter {
        private static _instance:DateConverter = new DateConverter();

        constructor() {
            DateConverter._instance = this;
        }

        public static getInstance():DateConverter
        {
            return DateConverter._instance;
        }

        public parse(value:string):Date {
            return new Date(value);
        }
    }
}