///<reference path='../../../contracts/IMetaBaseComponent.ts'/>
var MetaApp;
(function (MetaApp) {
    var Models;
    (function (Models) {
        var Components;
        (function (Components) {
            var ElementBase = (function () {
                function ElementBase(meta) {
                    this.type = 'field';
                }
                ElementBase.prototype.validate = function () {
                    return true;
                };
                return ElementBase;
            })();
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));

//# sourceMappingURL=_element.js.map
