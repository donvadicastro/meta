var MetaApp;
(function (MetaApp) {
    var Extensions;
    (function (Extensions) {
        var Converters;
        (function (Converters) {
            var DateConverter = (function () {
                function DateConverter() {
                    DateConverter._instance = this;
                }
                DateConverter.getInstance = function () {
                    return DateConverter._instance;
                };
                DateConverter.prototype.parse = function (value) {
                    return new Date(value);
                };
                DateConverter._instance = new DateConverter();
                return DateConverter;
            })();
            Converters.DateConverter = DateConverter;
        })(Converters = Extensions.Converters || (Extensions.Converters = {}));
    })(Extensions = MetaApp.Extensions || (MetaApp.Extensions = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=date.js.map