var MetaApp;
(function (MetaApp) {
    var Models;
    (function (Models) {
        var Components;
        (function (Components) {
            var ElementBase = (function () {
                function ElementBase(options) {
                    this.type = 'field';
                }
                ElementBase.prototype.validate = function () {
                    return true;
                };
                return ElementBase;
            })();
            Components.ElementBase = ElementBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));

//# sourceMappingURL=../../../models/components/base/element.js.map