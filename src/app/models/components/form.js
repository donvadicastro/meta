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
             * Form handle all communications inside this logical container and is fully isolated.
             */
            var Form = (function (_super) {
                __extends(Form, _super);
                function Form(meta, options) {
                    this.eventManager = new MetaApp.Managers.EventManager();
                    this.data = {};
                    this.dataByBinding = {};
                    _super.call(this, meta, { form: this });
                    this.eventManager.on('data:*', this.onDataChange, this);
                }
                Form.prototype.validate = function () {
                    return true;
                };
                Form.prototype.destroy = function () {
                };
                Form.prototype.onDataChange = function (binding, value) {
                    this.dataByBinding[binding] = value;
                    this.setByPath(binding, value);
                };
                Form.prototype.setByPath = function (binding, value) {
                    var bindingParts = binding.split('.'), data = this.data;
                    for (var i = 0, len = bindingParts.length - 1, b; i < len; i++) {
                        b = bindingParts[i];
                        data[b] || (data[b] = {});
                        data = data[b];
                    }
                    data[bindingParts[bindingParts.length - 1]] = value;
                };
                Form.prototype.getByPath = function (binding) {
                    var bindingParts = binding.split('.'), data = this.data;
                    for (var i = 0, len = bindingParts.length, b; i < len; i++) {
                        b = bindingParts[i];
                        data && data[b] && (data = data[b]);
                    }
                    return data;
                };
                return Form;
            })(Components.ContainerBase);
            Components.Form = Form;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=form.js.map