///<reference path='../../../Contracts/IMetaBaseComponent.ts'/>
///<reference path='../../../Contracts/IMetaContainerComponent.ts'/>
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
            var ContainerBase = (function (_super) {
                __extends(ContainerBase, _super);
                function ContainerBase(meta) {
                    _super.call(this, meta);
                    this.items = [];
                    //parse all childs and instantiate child list
                    for (var i = 0, len = (meta.items || []).length; i < len; i++) {
                        this.items.push(new Components.ElementBase(meta.items[i]));
                    }
                }
                ContainerBase.prototype.destroy = function () {
                    this.items.length = 0;
                };
                //#region "Container CRUD"
                ContainerBase.prototype.add = function (component) {
                    return true;
                };
                ContainerBase.prototype.remove = function (component) {
                    return true;
                };
                ContainerBase.prototype.move = function (component) {
                    return true;
                };
                return ContainerBase;
            })(Components.ElementBase);
            Components.ContainerBase = ContainerBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));

//# sourceMappingURL=container.js.map
