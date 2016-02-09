///<reference path='IMetaDataComponent.ts'/>
///<reference path='IMetaContainerComponent.ts'/>

module MetaApp.Contracts {
    /**
     * Base meta collection contract declaration. Inherits from IMetaDataComponent and IMetaContainerComponent.
     */
    export interface IMetaCollectionComponent extends IMetaDataComponent, IMetaContainerComponent {
    }
}