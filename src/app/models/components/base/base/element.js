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
            var DynamicManager = MetaApp.Managers.DynamicManager;
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
                    this.dynamic = meta.dynamic;
                    this.ui = meta.ui;
                    this._parent = options.parent;
                    this._form = options.form;
                    this._dynamicManager = new DynamicManager(this);
                    this.bindDynamic();
                }
                /**
                 * Validate component and returns validation result
                 * @returns {{isValid: boolean, message: string}}
                 */
                ElementBase.prototype.validate = function () {
                    return { isValid: true, message: undefined };
                };
                /**
                 * Returns element property value
                 */
                ElementBase.prototype.getPropertyValue = function (property) {
                    return this._dynamicManager.getPropertyValue(property) || MetaApp.Utils.Object.getByPath(property, this);
                };
                /**
                 * Destroy
                 */
                ElementBase.prototype.destroy = function () {
                    this.unbindDynamic();
                };
                /**
                 * Bind component to form data processing
                 */
                ElementBase.prototype.bindDynamic = function () {
                    this._dynamicManager.bind();
                    this._form && this._form.eventManager.on('prop:' + this.name, this.onPropertyChange, this);
                };
                /**
                 * Unbind component from form processing
                 */
                ElementBase.prototype.unbindDynamic = function () {
                    this._dynamicManager.unbind();
                    this._form && this._form.eventManager.off('prop:' + this.name, this.onPropertyChange, this);
                };
                /**
                 * Fire when element property was changed
                 * @param property
                 */
                ElementBase.prototype.onPropertyChange = function (property) {
                    //to get property: this.getPropertyValue(property);
                };
                return ElementBase;
            })();
            Components.ElementBase = ElementBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=element.js.map