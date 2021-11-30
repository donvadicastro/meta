import {IMetaContainerComponent} from "./IMetaContainerComponent";
import {IMetaDataComponent} from "./IMetaDataComponent";

/**
 * Base meta collection contract declaration. Inherits from IMetaDataComponent and IMetaContainerComponent.
 */
export interface IMetaCollectionComponent extends IMetaDataComponent, IMetaContainerComponent {
}
