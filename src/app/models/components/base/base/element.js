///<reference path='../../../../contracts/IMetaBaseComponent.ts'/>
///<reference path='../container.ts'/>
///<reference path='../../form.ts'/>
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
                function ElementBase(meta, options) {
                    this.type = 'field';
                    options || (options = {});
                    this.name = meta.name;
                    this.parent = options.parent;
                    this.form = options.form;
                }
                ElementBase.prototype.validate = function () {
                    return true;
                };
                ElementBase.prototype.destroy = function () {
                };
                return ElementBase;
            })();
            Components.ElementBase = ElementBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=element.js.map