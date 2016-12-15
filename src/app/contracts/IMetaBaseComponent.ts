import {MetaComponentRenderer} from "../enums/metaComponentRenderer";

/**
 * Base meta component contract declaration.
 */
export interface IMetaBaseComponent {
	/**
	 * Component unique name
	 */
	name: string;

	/**
	 * UI renderer type
	 */
	renderer?: MetaComponentRenderer;

	/**
	 * Component dynamic settings
	 */
	dynamic?: any;

	/**
	 * Component UI settings
	 */
	ui?: any;
}