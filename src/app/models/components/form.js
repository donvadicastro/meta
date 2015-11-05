///<reference path='../../managers/eventManager.ts'/>
///<reference path='base/container.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MetaApp;
(function (MetaApp) {
    var Models;
    (function (Models) {
        var Components;
        (function (Components) {
            /**
             * Form is the main logical container for some set of components which bound to some single data model.
             * Form handles all communications inside this logical container and is fully isolated.
             */
            var Form = (function (_super) {
                __extends(Form, _super);
                /**
                 * Constructor
                 * @param meta
                 * @param options
                 */
                function Form(meta, options) {
                    this.eventManager = new MetaApp.Managers.EventManager();
                    this.data = {};
                    this.invalidElements = {};
                    this._dataByBinding = {};
                    this._componentByName = {};
                    _super.call(this, meta, { form: this });
                    this.eventManager.on('data:*', this.onDataChange, this);
                    this.eventManager.on('valid:*', this.onValid, this);
                    this.eventManager.on('invalid:*', this.onInvalid, this);
                    this.dictionaries = meta.dictionaries;
                }
                /**
                 * Component registration inside form
                 * @param element
                 */
                Form.prototype.registerComponent = function (element) {
                    this._form._componentByName[element.name] = element;
                };
                /**
                 * Returns value in data model tree by path accessor
                 * @param binding
                 * @returns {any}
                 */
                Form.prototype.getDataByPath = function (binding) {
                    return this._dataByBinding[binding];
                };
                /**
                 * Form destroy
                 */
                Form.prototype.destroy = function () {
                };
                /**
                 * Data changes event listener
                 * @param binding
                 * @param value
                 */
                Form.prototype.onDataChange = function (binding, value) {
                    this._dataByBinding[binding] = value;
                    this.setByPath(binding, value);
                };
                /**
                 * Component is valid event listener
                 * @param name
                 */
                Form.prototype.onValid = function (name) {
                    delete this.invalidElements[name];
                };
                Form.prototype.onInvalid = function (name, message) {
                    this.invalidElements[name] = message;
                };
                /**
                 * Component is invalid event listener
                 * @param binding
                 * @param value
                 */
                Form.prototype.setByPath = function (binding, value) {
                    var bindingParts = binding.split('.'), data = this.data;
                    for (var i = 0, len = bindingParts.length - 1, b; i < len; i++) {
                        b = bindingParts[i];
                        data[b] || (data[b] = {});
                        data = data[b];
                    }
                    data[bindingParts[bindingParts.length - 1]] = value;
                };
                return Form;
            })(Components.ContainerBase);
            Components.Form = Form;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=form.js.map