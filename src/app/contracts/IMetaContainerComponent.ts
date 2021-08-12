import {IMetaBaseComponent} from "./IMetaBaseComponent";
import {IMetaDataComponent} from "./IMetaDataComponent";
import {IMetaDictionaryComponent} from "./IMetaDictionaryComponent";
import {IMetaCollectionComponent} from "./IMetaCollectionComponent";
import {IMetaActionComponent} from "./IMetaActionComponent";

/**
 * Base meta container contract declaration. Inherits from IMetaBaseComponent.
 */
export interface IMetaContainerComponent extends IMetaBaseComponent {
	/**
	 * List of child components
	 */
	items?: Array<IMetaDataComponent | IMetaContainerComponent | IMetaDictionaryComponent | IMetaCollectionComponent | IMetaActionComponent>;

	/**
	 * Container specific dictionaries to be used by children
	 */
	dictionaries?: Object;
}
