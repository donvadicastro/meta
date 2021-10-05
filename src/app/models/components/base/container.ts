import {IMetaCollectionComponent} from "../../../contracts/IMetaCollectionComponent";
import {IMetaBaseComponent} from "../../../contracts/IMetaBaseComponent";
import {IMetaContainerComponent} from "../../../contracts/IMetaContainerComponent";

import {ElementBase} from "./base/element";
import {CollectionBase} from "../collection";
import {DictionaryBase} from "./dictionary";
import {DataBase} from "./data";
import {IValidationResult} from "../../../contracts/IValidationResult";
import {ActionBase} from "./action";
import {IMetaActionComponent} from "../../../contracts/IMetaActionComponent";
import {request} from "../../../utils/remote";

/**
 * Base class to describe containers. All container-based components should inherit from this base.
 * Handle all child relations.
 */
export class ContainerBase extends DataBase implements IMetaContainerComponent {
	/**
	 * Component children list
	 * @type {Array}
	 */
	items: Array<any> = [];

	/**
	 * Component remote value source to populate by binding during initialization.
	 */
	valueSource?: any;

	/**
	 * Component predefined value
	 */
	value: any;

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
		this.items.forEach(x => x.destroy());
		this.items.length = 0;
	}

	/**
	 * Initialize component
	 * @param options options
	 */
	initialize(options?: any) {
		//parse all children and instantiate child list
		this.initializeItems(this._meta.items, options || {});

		// support remote load only when there is place to inject data into
		if (this._meta.valueSource && this._meta.binding) {
			request(this._meta.valueSource).then((data: any) => this.setValue(data));
		}
	}

	/**
	 * Initialize children
	 */
	private initializeItems(items: Array<IMetaBaseComponent | IMetaCollectionComponent | IMetaContainerComponent | IMetaActionComponent>, options: any) {
		options || (options = {});

		for(let i=0, len=(items || []).length, e; i<len; i++) {
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

		if (meta.type === 'list') { return CollectionBase; }
		if (meta.dictionary) { return DictionaryBase; }
		if (meta.items) { return ContainerBase; }
		if (meta.binding) { return DataBase; }
		if (meta.action) { return ActionBase; }

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
		delete component._parent;

		this.items.splice(this.items.indexOf(component), 1);
		destroy && component.destroy();
	}

	/**
	 * Move component into new container
	 * @param component
	 */
	public move(component: ElementBase) {
		component._parent && component._parent.remove(component);
		this.add(component);
	}

	/**
	 * Validate component and return validation result
	 * @returns {{isValid: boolean, message: string}}
	 */
	public validate(): IValidationResult {
		let isValid = (this.items || []).reduce((res, x) => (x.validate && x.validate().isValid) && res, true);
		return {isValid: isValid, message: undefined};
	}
	//#endregion
}
