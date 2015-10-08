///<reference path='../../managers/eventManager.ts'/>
///<reference path='base/container.ts'/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
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
                function Form(meta) {
                    _super.call(this, meta);
                    this.eventManager = new MetaApp.Managers.EventManager();
                }
                Form.prototype.validate = function () {
                    return true;
                };
                Form.prototype.destroy = function () {
                };
                return Form;
            })(Components.ContainerBase);
            Components.Form = Form;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));

//# sourceMappingURL=form.js.map
