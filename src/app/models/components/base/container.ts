import {IMetaCollectionComponent} from "../../../contracts/IMetaCollectionComponent";
import {IMetaBaseComponent} from "../../../contracts/IMetaBaseComponent";
import {IMetaContainerComponent} from "../../../contracts/IMetaContainerComponent";

import {ElementBase} from "./base/element";
import {MetaComponentType} from "../../../enums/metaComponentType";
import {CollectionBase} from "../collection";
import {DictionaryBase} from "./dictionary";
import {DataBase} from "./data";
import {IValidationResult} from "../../../contracts/IValidationResult";
import {toUpperCaseFirstLetter} from "../../../utils/string";
import _ from "underscore";

/**
 * Base class to describe containers. All container-based components should inherit from this base.
 * Handle all child relations.
 */
export class ContainerBase extends ElementBase implements IMetaContainerComponent {
	/**
	 * Component children list
	 * @type {Array}
	 */
	items: Array<any> = [];

	/**
	 * Constructor
	 * @param meta
	 * @param options
	 */
	constructor(meta: IMetaContainerComponent | IMetaCollectionComponent, options?: any) {
		super(meta, options);
	}

	/**
	 * Destroy
	 */
	destroy() {
		this.items.length = 0;
	}

	/**
	 * Initialize component
	 * @param options options
	 */
	initialize(options?: any) {
		//parse all children and instantiate child list
		this.initializeItems(this._meta.items, options || {});
	}

	/**
	 * Initialize children
	 */
	private initializeItems(items: Array<IMetaBaseComponent | IMetaCollectionComponent | IMetaContainerComponent>, options: any) {
		options || (options = {});
		for(var i=0, len=(items || []).length, e; i<len; i++) {
			e = items[i];

			//TODO: looks like not possible
			// if(_.isString(e.type)) {
			// 	e.type = MetaComponentType[toUpperCaseFirstLetter(e.type)];
			// }

			e = new (ContainerBase.getComponentConstructor(e))(e, {parent: this, form: this._form, container: options.container});
			e.initialize();

			this.items.push(e);
			this._form && this._form.registerComponent(e);
		}
	}

	/**
	 * Returns child component constructor class
	 * @param meta
	 * @returns {any}
	 */
	public static getComponentConstructor(meta: any): any {

		if(meta.type === MetaComponentType.List) { return CollectionBase; }

		if(meta.dictionary) { return DictionaryBase; }
		if(meta.binding) { return DataBase; }
		if(meta.items) { return ContainerBase; }

		return ElementBase;
	}

	//#region "Container CRUD"
	/**
	 * Add new component into container
	 * @param component Component
	 * @param position Position
	 */
	public add(component: ElementBase, position?: number) {
		component._parent = this;
		this.items.splice((position && position >= 0) ? position : -1, 0, component);
	}

	/**
	 * Remove component from container
	 * @param component
	 * @param destroy Destroy this component after removing
	 */
	public remove(component: ElementBase, destroy?: boolean) {
		//delete component._parent;

		this.items.splice(this.items.indexOf(component), 1);
		destroy && component.destroy();
	}

	/**
	 * Move component into new container
	 * @param component
	 */
	public move(component: ElementBase) {
		component._parent.remove(component);
		this.add(component);
	}

	/**
	 * Validate component and return validation result
	 * @returns {{isValid: boolean, message: string}}
	 */
	public validate(): IValidationResult {
		var isValid = true;

		for(var i=0, len=(this.items || []).length, e; i<len; i++) {
			e = this.items[i];

			e.validate && !e.validate().isValid && (isValid = false);
		}

		return {isValid: isValid, message: undefined};
	}
	//#endregion
}
