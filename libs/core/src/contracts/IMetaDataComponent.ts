import {IMetaBaseComponent} from "./IMetaBaseComponent";
import {MetaComponentType} from "../enums/metaComponentType";
import {IMetaActionComponent} from "./IMetaActionComponent";

/**
 * Base meta data component contract declaration. Inherits from IMetaBaseComponent.
 */
export interface IMetaDataComponent extends IMetaBaseComponent, IMetaActionComponent {
	/**
	 * Data binding path
	 */
	binding?: string;

	/**
	 * Predefined component value
	 */
	value?: any;

	/**
	 * Remote source content.
	 */
	valueSource?: string;

	/**
	 * Component data type
	 */
	type?: MetaComponentType;

	/**
	 * Component validation rules
	 */
	validation?: any;

	/**
	 * Component sorting rule
	 */
	sort?: 'ASC' | 'DESC';

	/**
	 * Component filtration rules
	 */
	filters?: Array<{by: string, comparator: string, val: string}>;
}
