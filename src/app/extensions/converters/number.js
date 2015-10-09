var MetaApp;
(function (MetaApp) {
    var Extensions;
    (function (Extensions) {
        var Converters;
        (function (Converters) {
            var NumberConverter = (function () {
                function NumberConverter() {
                    NumberConverter._instance = this;
                }
                NumberConverter.getInstance = function () {
                    return NumberConverter._instance;
                };
                NumberConverter.prototype.parse = function (value) {
                    return parseInt(value);
                };
                NumberConverter._instance = new NumberConverter();
                return NumberConverter;
            })();
            Converters.NumberConverter = NumberConverter;
        })(Converters = Extensions.Converters || (Extensions.Converters = {}));
    })(Extensions = MetaApp.Extensions || (MetaApp.Extensions = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=number.js.map