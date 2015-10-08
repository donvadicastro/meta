///<reference path='../../../contracts/IMetaBaseComponent.ts'/>
var MetaApp;
(function (MetaApp) {
    var Models;
    (function (Models) {
        var Components;
        (function (Components) {
            /**
             * Base class to describe meta component. All custom components should inherit from this base class.
             */
            var ElementBase = (function () {
                function ElementBase(meta) {
                    this.type = 'field';
                    this.name = meta.name;
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

//# sourceMappingURL=__element.js.map
