import {IMetaBaseComponent} from "./IMetaBaseComponent";
import {MetaComponentType} from "../enums/metaComponentType";

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
	value?: any;

	/**
	 * Component data type
	 */
	type?: MetaComponentType;

	/**
	 * Component validation rules
	 */
	validation?: any;

	/**
	 * Component filtration rules
	 */
	filters?: Array<any>;
}