import {IMetaDataComponent} from "./IMetaDataComponent";
import {IMetaDictionaryComponent} from "./IMetaDictionaryComponent";
import {IMetaCollectionComponent} from "./IMetaCollectionComponent";
import {IMetaActionComponent} from "./IMetaActionComponent";

/**
 * Base meta container contract declaration. Inherits from IMetaBaseComponent.
 */
export interface IMetaContainerComponent extends IMetaDataComponent {
	/**
	 * List of child components
	 */
	items?: Array<IMetaDataComponent | IMetaContainerComponent | IMetaDictionaryComponent | IMetaCollectionComponent | IMetaActionComponent>;

	/**
	 * Container specific dictionaries to be used by children
	 */
	dictionaries?: Object;
}
