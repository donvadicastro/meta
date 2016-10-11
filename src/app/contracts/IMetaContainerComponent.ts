import {IMetaBaseComponent} from "./IMetaBaseComponent";

/**
 * Base meta container contract declaration. Inherits from IMetaBaseComponent.
 */
export interface IMetaContainerComponent extends IMetaBaseComponent {
	/**
	 * List of child components
	 */
	items: Array<IMetaBaseComponent>;

	/**
	 * Container specific dictionaries to be used by children
	 */
	dictionaries?: Object;
}