module MetaApp.Extensions.Converters {
    export class BoolConverter {
        private static _instance:BoolConverter = new BoolConverter();

        constructor() {
            BoolConverter._instance = this;
        }

        public static getInstance():BoolConverter
        {
            return BoolConverter._instance;
        }

        public parse(value:string):boolean {
            return !!value;
        }
    }
}