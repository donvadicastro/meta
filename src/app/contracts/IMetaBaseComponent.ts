///<reference path="../enums/metaComponentType.ts"/>
///<reference path="../enums/metaComponentRenderer.ts"/>

module MetaApp.Contracts {
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
		renderer?: Enums.MetaComponentRenderer;

		/**
		 * Component dynamic settings
		 */
		dynamic?: any;

		/**
		 * Component UI settings
		 */
		ui?: any;
	}
}