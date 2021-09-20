export type RendererType = 'default'
	| 'textbox'
	| 'label'
	| 'form'
	| 'button'
	| 'dropdown'
	| 'table'
	| 'container'
	| 'section';

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
	renderer?: RendererType;

	/**
	 * Component dynamic settings
	 */
	dynamic?: any;

	/**
	 * Component UI settings
	 */
	ui?: any;
}
