///<reference path='../../../Contracts/IMetaDataComponent.ts'/>
///<reference path='base/element.ts'/>
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
             * Base class to describe containers. All container-based components should inherit from this base.
             * Handle all child relations.
             */
            var DataBase = (function (_super) {
                __extends(DataBase, _super);
                function DataBase(meta, options) {
                    _super.call(this, meta, options);
                    this.binding = meta.binding;
                    this.bind();
                }
                DataBase.prototype.setValue = function (value) {
                    this.value = value;
                    this.form && this.form.eventManager.trigger('data:' + this.binding, value);
                    this.form && this.form.eventManager.trigger('data:*', this.binding, value);
                };
                DataBase.prototype.getValue = function () {
                    return this.value;
                };
                DataBase.prototype.destroy = function () {
                    this.unbind();
                };
                DataBase.prototype.bind = function () {
                    this.form && this.form.eventManager.on('data:' + this.binding, this.onDataChange, this);
                };
                DataBase.prototype.unbind = function () {
                    this.form && this.form.eventManager.off('data:' + this.binding, this.onDataChange, this);
                };
                DataBase.prototype.onDataChange = function (value) {
                    if (value !== this.value)
                        this.value = value;
                };
                return DataBase;
            })(Components.ElementBase);
            Components.DataBase = DataBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=data.js.map