//TODO: create interface to work with. Should implement required 'parse' method
var MetaApp;
(function (MetaApp) {
    var Extensions;
    (function (Extensions) {
        var Converters;
        (function (Converters) {
            /**
             * Meta component boolean data converter singleton class implementation. Used to convert incoming server data to correct type.
             */
            var BoolConverter = (function () {
                /**
                 * Constructor
                 */
                function BoolConverter() {
                    BoolConverter._instance = this;
                }
                /**
                 * Return current class instance
                 * @returns {BoolConverter}
                 */
                BoolConverter.getInstance = function () {
                    return BoolConverter._instance;
                };
                /**
                 * Convert input object into boolean value
                 * @param value
                 * @returns {boolean}
                 */
                BoolConverter.prototype.parse = function (value) {
                    return !!value;
                };
                /**
                 * Singleton class instance
                 * @type {MetaApp.Extensions.Converters.BoolConverter}
                 * @private
                 */
                BoolConverter._instance = new BoolConverter();
                return BoolConverter;
            })();
            Converters.BoolConverter = BoolConverter;
        })(Converters = Extensions.Converters || (Extensions.Converters = {}));
    })(Extensions = MetaApp.Extensions || (MetaApp.Extensions = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=bool.js.map