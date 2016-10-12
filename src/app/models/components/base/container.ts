/// <reference path="../../../../../typings/underscore.d.ts" />

import {ElementBase} from "./base/element";
import {IMetaCollectionComponent} from "../../../contracts/IMetaCollectionComponent";
import {IMetaBaseComponent} from "../../../contracts/IMetaBaseComponent";
import {IMetaContainerComponent} from "../../../contracts/IMetaContainerComponent";
import {MetaComponentType} from "../../../enums/metaComponentType";
import {CollectionBase} from "../collection";
import {DictionaryBase} from "./dictionary";
import {DataBase} from "./data";
import {IValidationResult} from "../../../contracts/IValidationResult";
import {toUpperCaseFirstLetter} from "../../../utils/string";
import _ = require('underscore');

/**
 * Base class to describe containers. All container-based components should inherit from this base.
 * Handle all child relations.
 */
export class ContainerBase extends ElementBase implements IMetaContainerComponent {
	/**
	 * Component children list
	 * @type {Array}
	 */
	items: Array<IMetaBaseComponent | IMetaCollectionComponent> = [];

	/**
	 * Constructor
	 * @param meta
	 * @param options
	 */
	constructor(meta: IMetaContainerComponent | IMetaCollectionComponent, options: any) {
		super(meta, options);

		//parse all children and instantiate child list
		this.initializeItems(meta.items, options);
	}

	/**
	 * Destroy
	 */
	destroy() {
		this.items.length = 0;
	}

	/**
	 * Initialize children
	 */
	private initializeItems(items: Array<IMetaBaseComponent | IMetaCollectionComponent>, options: any) {
		options || (options = {});
		for(var i=0, len=(items || []).length, e; i<len; i++) {
			e = items[i];

			if(_.isString(e.type)) {
				e.type = MetaComponentType[toUpperCaseFirstLetter(e.type)];
			}

			e = new (this.getComponentConstructor(e))(e, {parent: this, form: this._form, container: options.container});

			this.items.push(e);
			this._form && this._form.registerComponent(e);
		}
	}

	/**
	 * Returns child component constructor class
	 * @param meta
	 * @returns {any}
	 */
	public getComponentConstructor(meta: any): any {
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
		this.items.splice(position >= 0 ? position : -1, 0, component);
	}

	/**
	 * Remove component from container
	 * @param component
	 * @param destroy Destroy this component after removing
	 */
	public remove(component: ElementBase, destroy?: boolean) {
		delete component._parent;

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