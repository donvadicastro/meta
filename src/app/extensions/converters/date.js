var MetaApp;
(function (MetaApp) {
    var Extensions;
    (function (Extensions) {
        var Converters;
        (function (Converters) {
            /**
             * Meta component date data converter singleton class implementation. Used to convert incoming server data to correct type.
             */
            var DateConverter = (function () {
                /**
                 * Constructor
                 */
                function DateConverter() {
                    DateConverter._instance = this;
                }
                /**
                 * Return current class instance
                 * @returns {DateConverter}
                 */
                DateConverter.getInstance = function () {
                    return DateConverter._instance;
                };
                /**
                 * Convert input object into date value
                 * @param value
                 * @returns {boolean}
                 */
                DateConverter.prototype.parse = function (value) {
                    return new Date(value);
                };
                /**
                 * Singleton class instance
                 * @type {MetaApp.Extensions.Converters.DateConverter}
                 * @private
                 */
                DateConverter._instance = new DateConverter();
                return DateConverter;
            })();
            Converters.DateConverter = DateConverter;
        })(Converters = Extensions.Converters || (Extensions.Converters = {}));
    })(Extensions = MetaApp.Extensions || (MetaApp.Extensions = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=date.js.map