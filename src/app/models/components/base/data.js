///<reference path='../../../Contracts/IMetaDataComponent.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../../../extensions/converters/date.ts'/>
///<reference path='../../../extensions/converters/number.ts'/>
///<reference path='../../../validators/requiredValidator.ts'/>
///<reference path='base/element.ts'/>
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
                    this.validators = [];
                    this.binding = meta.binding;
                    this.type = meta.type;
                    this.validation = meta.validation;
                    this.bind();
                    this.addValidators();
                    (meta.value === undefined) || this.setValue(meta.value);
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
                DataBase.prototype.validate = function () {
                    for (var i = 0, len = this.validators.length, v; i < len; i++) {
                        v = this.validators[i].validate(this.value);
                        if (!v.success)
                            return v;
                    }
                };
                DataBase.prototype.bind = function () {
                    this.form && this.form.eventManager.on('data:' + this.binding, this.onDataChange, this);
                };
                DataBase.prototype.unbind = function () {
                    this.form && this.form.eventManager.off('data:' + this.binding, this.onDataChange, this);
                };
                DataBase.prototype.onDataChange = function (value) {
                    var type = this.type && this.type.charAt(0).toUpperCase() + this.type.slice(1), converter = type && MetaApp.Extensions.Converters[type + 'Converter'], newValue = converter ? converter.getInstance().parse(value) : value;
                    if (newValue !== this.value)
                        this.value = newValue;
                };
                DataBase.prototype.addValidators = function () {
                    var vRef = { required: MetaApp.Validators.RequiredValidator };
                    for (var name in this.validation) {
                        var v = this.validation[name];
                        this.validators.push(vRef[name]);
                    }
                };
                return DataBase;
            })(Components.ElementBase);
            Components.DataBase = DataBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=data.js.map