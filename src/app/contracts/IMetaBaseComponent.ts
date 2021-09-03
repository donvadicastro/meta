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
	renderer?: 'default' | 'textbox' | 'label' | 'form' | 'button' | 'dropdown' | 'table' | 'container';

	/**
	 * Component dynamic settings
	 */
	dynamic?: any;

	/**
	 * Component UI settings
	 */
	ui?: any;
}
