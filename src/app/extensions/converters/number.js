var MetaApp;
(function (MetaApp) {
    var Extensions;
    (function (Extensions) {
        var Converters;
        (function (Converters) {
            /**
             * Meta component number data converter singleton class implementation. Used to convert incoming server data to correct type.
             */
            var NumberConverter = (function () {
                /**
                 * Constructor
                 */
                function NumberConverter() {
                    NumberConverter._instance = this;
                }
                /**
                 * Return current class instance
                 * @returns {NumberConverter}
                 */
                NumberConverter.getInstance = function () {
                    return NumberConverter._instance;
                };
                /**
                 * Convert input object into number value
                 * @param value
                 * @returns {boolean}
                 */
                NumberConverter.prototype.parse = function (value) {
                    return parseInt(value);
                };
                /**
                 * Singleton class instance
                 * @type {MetaApp.Extensions.Converters.NumberConverter}
                 * @private
                 */
                NumberConverter._instance = new NumberConverter();
                return NumberConverter;
            })();
            Converters.NumberConverter = NumberConverter;
        })(Converters = Extensions.Converters || (Extensions.Converters = {}));
    })(Extensions = MetaApp.Extensions || (MetaApp.Extensions = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=number.js.map