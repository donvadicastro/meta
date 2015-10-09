module MetaApp.Extensions.Converters {
    export class NumberConverter {
        private static _instance:NumberConverter = new NumberConverter();

        constructor() {
            NumberConverter._instance = this;
        }

        public static getInstance():NumberConverter
        {
            return NumberConverter._instance;
        }

        public parse(value:string):Number {
            return parseInt(value);
        }
    }
}