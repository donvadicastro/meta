///<reference path='IMetaBaseComponent.ts'/>

module MetaApp.Contracts {
	/**
	 * Base meta data component contract declaration. Inherits from IMetaBaseComponent.
	 */
	export interface IMetaDataComponent extends IMetaBaseComponent {
		/**
		 * Data binding path
		 */
		binding: string;

		/**
		 * Predefined component value
		 */
		value: any;

		/**
		 * Component data type
		 */
		type?: Enums.MetaComponentType;

		/**
		 * Component validation rules
		 */
		validation?: any;
	}
}