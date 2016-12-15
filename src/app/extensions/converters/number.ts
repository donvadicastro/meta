/**
 * Meta component number data converter singleton class implementation. Used to convert incoming server data to correct type.
 */
export class NumberConverter {
    /**
     * Singleton class instance
     * @type {MetaApp.Extensions.Converters.NumberConverter}
     * @private
     */
    private static _instance:NumberConverter = new NumberConverter();

    /**
     * Constructor
     */
    constructor() {
        NumberConverter._instance = this;
    }

    /**
     * Return current class instance
     * @returns {NumberConverter}
     */
    public static getInstance(): NumberConverter
    {
        return NumberConverter._instance;
    }

    /**
     * Convert input object into number value
     * @param value
     * @returns {boolean}
     */
    public parse(value: string): Number {
        return parseInt(value);
    }
}