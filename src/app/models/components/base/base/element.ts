import {MetaComponentType} from "../../../../enums/metaComponentType";
import {ContainerBase} from "../container";
import {Form} from "../../form";
import {CollectionBase} from "../../collection";
import {IValidationResult} from "../../../../contracts/IValidationResult";
import {IMetaBaseComponent} from "../../../../contracts/IMetaBaseComponent";
import {DynamicManager} from "../../../../managers/dynamicManager";
import {getByPath} from "../../../../utils/object";
import _ from "underscore";

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
	 * Component data type (optional)
	 */
	type?: MetaComponentType;

	/**
	 * Element meta declaration
	 */
	_meta: any;

	//_parent and _form relations
	/**
	 * Parent container reference.
	 * Can be unset when element removed.
	 */
	_parent: ContainerBase | undefined;

	/**
	 * Root container reference
	 */
	_container: CollectionBase;

	/**
	 * Root form reference
	 */
	_form: Form;

	/**
	 * Dynamic manager. Can be unspecified when no dynamic config presented.
	 */
	_dynamicManager: DynamicManager | null = null;

	/**
	 * Gets component dynamic settings
	 */
	get dynamic(): any {
		return this._meta.dynamic;
	}

	/**
	 * Get dynamic value by key.
	 * @param key
	 */
	getPropertyValue(key: string) {
		const dynamic = this._dynamicManager?.getPropertyValue(key);
		return _.isUndefined(dynamic) ? getByPath(key, this._meta) : dynamic;
	}

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

		meta.dynamic && (this._dynamicManager = new DynamicManager(this));
	}

	/**
	 * Element initialization
	 * @param options
	 */
	public initialize(options?: any): void {
		this._dynamicManager?.bind();
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
		this._dynamicManager?.unbind();
	}

	/**
	 * Bind to dynamic change.
	 * @param onDataChange change handler.
	 */
	public bindDynamicChange(onDataChange: Function) {
		this._form.eventManager.on('prop:' + this.name, onDataChange);
	}

	/**
	 * Unbind to dynamic change.
	 * @param onDataChange change handler.
	 */
	public unbindDynamicChange(onDataChange: Function) {
		this._form.eventManager.off('prop:' + this.name, onDataChange);
	}
}
