///<reference path='../../../Contracts/IMetaDataComponent.ts'/>
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
                function DataBase(meta) {
                    _super.call(this, meta);
                    this.binding = meta.binding;
                }
                return DataBase;
            })(Components.ElementBase);
            Components.DataBase = DataBase;
        })(Components = Models.Components || (Models.Components = {}));
    })(Models = MetaApp.Models || (MetaApp.Models = {}));
})(MetaApp || (MetaApp = {}));

//# sourceMappingURL=data.js.map
