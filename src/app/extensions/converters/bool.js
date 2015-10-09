var MetaApp;
(function (MetaApp) {
    var Extensions;
    (function (Extensions) {
        var Converters;
        (function (Converters) {
            var BoolConverter = (function () {
                function BoolConverter() {
                    BoolConverter._instance = this;
                }
                BoolConverter.getInstance = function () {
                    return BoolConverter._instance;
                };
                BoolConverter.prototype.parse = function (value) {
                    return !!value;
                };
                BoolConverter._instance = new BoolConverter();
                return BoolConverter;
            })();
            Converters.BoolConverter = BoolConverter;
        })(Converters = Extensions.Converters || (Extensions.Converters = {}));
    })(Extensions = MetaApp.Extensions || (MetaApp.Extensions = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=bool.js.map