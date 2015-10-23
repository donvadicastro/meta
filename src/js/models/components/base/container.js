///<reference path='../../../Contracts/IMetaBaseComponent.ts'/>
///<reference path='../../../Contracts/IMetaContainerComponent.ts'/>
///<reference path='base/element.ts'/>
///<reference path='data.ts'/>
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
            var ContainerBase = (function (_super) {
                __extends(ContainerBase, _super);
                function ContainerBase(meta, options) {
                    _super.call(this, meta, options);
                    this.items = [];
                    //parse all childs and instantiate child list
                    for (var i = 0, len = (meta.items || []).length, e; i < len; i++) {
                        e = new (this.getComponentConstructor(meta.items[i]))(meta.items[i], { parent: this, form: this.form });
                        this.items.push(e);
                        this.form && (this.form._componentByName[e.name] = e);
                    }
                }
                ContainerBase.prototype.destroy = function () {
                    this.items.length = 0;
                };
                ContainerBase.prototype.getComponentConstructor = function (meta) {
                    if (meta.binding) {
                        return Components.DataBase;
                    }
                    return Components.ElementBase;
                };
                //#region "Container CRUD"
                ContainerBase.prototype.add = function (component, position) {
                    component.parent = this;
                    this.items.splice(position >= 0 ? position : -1, 0, component);
                };
                ContainerBase.prototype.remove = function (component, destroy) {
                    delete component.parent;
                    this.items.splice(this.items.indexOf(component), 1);
                    destroy && component.destroy();
                };
                ContainerBase.prototype.move = function (component) {
                    component.parent.remove(component);
                    this.add(component);
                };
                return ContainerBase;
            })(Components.ElementBase);
            Components.ContainerBase = ContainerBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));

//# sourceMappingURL=container.js.map
