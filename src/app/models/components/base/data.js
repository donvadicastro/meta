///<reference path='../../../Contracts/IMetaDataComponent.ts'/>
///<reference path='../../../extensions/converters/date.ts'/>
///<reference path='../../../extensions/converters/number.ts'/>
///<reference path='../../../validators/requiredValidator.ts'/>
///<reference path='base/element.ts'/>
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
             * Base class to describe containers. All container-based components should inherit from this base.
             * Handle all child relations.
             */
            var DataBase = (function (_super) {
                __extends(DataBase, _super);
                /**
                 * Constructor
                 * @param meta
                 * @param options
                 */
                function DataBase(meta, options) {
                    _super.call(this, meta, options);
                    /**
                     * Component instantiated validators
                     * @type {Array}
                     */
                    this.validators = [];
                    this.binding = meta.binding;
                    this.type = meta.type;
                    this.validation = meta.validation;
                    this.filters = meta.filters;
                    this.bind();
                    this.addValidators();
                    (meta.value === undefined) || this.setValue(meta.value);
                }
                /**
                 * Set new component value
                 * @param value
                 */
                DataBase.prototype.setValue = function (value) {
                    var type = this.type, converter = type && MetaApp.Extensions.Converters[MetaApp.Enums.MetaComponentType[type] + 'Converter'], newValue = converter ? converter.getInstance().parse(value) : value;
                    if (this.value !== newValue) {
                        this.value = newValue;
                        this._form && this._form.eventManager.trigger('data:' + this.binding, newValue, this);
                        this._form && this._form.eventManager.trigger('data:*', this.binding, newValue, this);
                        this._container && MetaApp.Utils.Object.setByPath(this._container.data, this.binding, newValue);
                    }
                    return this;
                };
                /**
                 * Get current component value
                 * @returns {any}
                 */
                DataBase.prototype.getValue = function () {
                    return this.value;
                };
                /**
                 * Destroy
                 */
                DataBase.prototype.destroy = function () {
                    this.unbind();
                    this.validators.length = 0;
                };
                /**
                 * Validate component and return validation result
                 * @returns {Contracts.IValidationResult}
                 */
                DataBase.prototype.validate = function () {
                    var valResult = _super.prototype.validate.call(this);
                    ;
                    for (var i = 0, len = this.validators.length, v; i < len; i++) {
                        v = this.validators[i].validate(this.value);
                        if (!v.success) {
                            valResult = v;
                        }
                        ;
                    }
                    this._form && this._form.eventManager.trigger((valResult.isValid ? 'valid:' : 'invalid:') + this.name, valResult.message);
                    this._form && this._form.eventManager.trigger((valResult.isValid ? 'valid:*' : 'invalid:*'), this.name, valResult.message);
                    return valResult;
                };
                /**
                 * Bind component to form data processing mechanism
                 */
                DataBase.prototype.bind = function () {
                    this._form && this._form.eventManager.on('data:' + this.binding, this.onDataChange, this);
                };
                /**
                 * Unbind component from form data processing mechanism
                 */
                DataBase.prototype.unbind = function () {
                    this._form && this._form.eventManager.off('data:' + this.binding, this.onDataChange, this);
                };
                /**
                 * Component data was changed event listener
                 * @param value
                 */
                DataBase.prototype.onDataChange = function (value, sender) {
                    sender === this || this.setValue(value).validate();
                };
                /**
                 * Apply component validators
                 */
                DataBase.prototype.addValidators = function () {
                    for (var name in this.validation) {
                        var v = this.validation[name], vRef = MetaApp.Validators[MetaApp.Utils.String.toUpperCaseFirstLetter(name) + 'Validator'];
                        this.validators.push(new vRef(this));
                    }
                };
                return DataBase;
            })(Components.ElementBase);
            Components.DataBase = DataBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=data.js.map