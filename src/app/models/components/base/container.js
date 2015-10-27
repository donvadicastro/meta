///<reference path='../../../Enums/MetaComponentType.ts'/>
///<reference path='../../../Contracts/IMetaBaseComponent.ts'/>
///<reference path='../../../Contracts/IMetaContainerComponent.ts'/>
///<reference path='base/element.ts'/>
///<reference path='data.ts'/>
///<reference path='dictionary.ts'/>
///<reference path='../../../utils/string.ts'/>
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
            var ContainerBase = (function (_super) {
                __extends(ContainerBase, _super);
                function ContainerBase(meta, options) {
                    _super.call(this, meta, options);
                    this.items = [];
                    for (var i = 0, len = (meta.items || []).length, e; i < len; i++) {
                        e = meta.items[i];
                        if (_.isString(e.type)) {
                            e.type = MetaApp.Enums.MetaComponentType[MetaApp.Utils.String.toUpperCaseFirstLetter(e.type)];
                        }
                        e = new (this.getComponentConstructor(e))(e, { parent: this, form: this._form });
                        this.items.push(e);
                        this._form && this._form.registerComponent(e);
                    }
                }
                ContainerBase.prototype.destroy = function () {
                    this.items.length = 0;
                };
                ContainerBase.prototype.getComponentConstructor = function (meta) {
                    if (meta.dictionary) {
                        return Components.DictionaryBase;
                    }
                    if (meta.binding) {
                        return Components.DataBase;
                    }
                    if (meta.items) {
                        return ContainerBase;
                    }
                    return Components.ElementBase;
                };
                //#region "Container CRUD"
                ContainerBase.prototype.add = function (component, position) {
                    component._parent = this;
                    this.items.splice(position >= 0 ? position : -1, 0, component);
                };
                ContainerBase.prototype.remove = function (component, destroy) {
                    delete component._parent;
                    this.items.splice(this.items.indexOf(component), 1);
                    destroy && component.destroy();
                };
                ContainerBase.prototype.move = function (component) {
                    component._parent.remove(component);
                    this.add(component);
                };
                ContainerBase.prototype.validate = function () {
                    var isValid = true;
                    for (var i = 0, len = (this.items || []).length, e; i < len; i++) {
                        e = this.items[i];
                        e.validate && !e.validate().isValid && (isValid = false);
                    }
                    return { isValid: isValid, message: undefined };
                };
                return ContainerBase;
            })(Components.ElementBase);
            Components.ContainerBase = ContainerBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));
//# sourceMappingURL=container.js.map