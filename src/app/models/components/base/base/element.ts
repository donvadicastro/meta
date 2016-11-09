import {MetaComponentType} from "../../../../enums/metaComponentType";
import {ContainerBase} from "../container";
import {Form} from "../../form";
import {CollectionBase} from "../../collection";
import {IValidationResult} from "../../../../contracts/IValidationResult";
import {IMetaBaseComponent} from "../../../../contracts/IMetaBaseComponent";

/**
 * Base class to describe meta component. All custom components should inherit from this base class.
 */
export class ElementBase {
	//element metadata properties
	/**
	 * Component unique name. Should be unique per form
	 */
	name: string;

	/**
	 * Component data type
	 */
	type: MetaComponentType;

	/**
	 * Element meta declaration
	 */
	_meta: any;

	//_parent and _form relations
	/**
	 * Parent container reference
	 */
	_parent: ContainerBase;

	/**
	 * Root container reference
	 */
	_container: CollectionBase;

	/**
	 * Root form reference
	 */
	_form: Form;

	/**
	 * Constructor
	 * @param meta
	 * @param options
	 */
	constructor(meta: IMetaBaseComponent, options?: any) {
		options || (options = {});

		this.name = meta.name;

		this._meta = meta;
		this._container = options.container;
		this._parent = options.parent;

		this._form = options.form;
	}

	/**
	 * Validate component and returns validation result
	 * @returns {{isValid: boolean, message: string}}
	 */
	public validate(): IValidationResult {
		return {isValid: true, message: undefined};
	}

	/**
	 * Destroy
	 */
	public destroy(): void {

	}
}