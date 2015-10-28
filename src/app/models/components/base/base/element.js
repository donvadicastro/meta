///<reference path='../../../../contracts/IMetaBaseComponent.ts'/>
///<reference path='../../../../contracts/IValidationResult.ts'/>
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
                /**
                 * Constructor
                 * @param meta
                 * @param options
                 */
                function ElementBase(meta, options) {
                    options || (options = {});
                    this.name = meta.name;
                    this._parent = options.parent;
                    this._form = options.form;
                }
                /**
                 * Validate component and returns validation result
                 * @returns {{isValid: boolean, message: string}}
                 */
                ElementBase.prototype.validate = function () {
                    return { isValid: true, message: undefined };
                };
                /**
                 * Destroy
                 */
                ElementBase.prototype.destroy = function () {
                };
                return ElementBase;
            })();
            Components.ElementBase = ElementBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=element.js.map