///<reference path='../../../Enums/MetaComponentType.ts'/>
///<reference path='../../../Contracts/IMetaBaseComponent.ts'/>
///<reference path='../../../Contracts/IMetaContainerComponent.ts'/>
///<reference path='base/element.ts'/>
///<reference path='data.ts'/>
///<reference path='dictionary.ts'/>
///<reference path='../collection.ts'/>
///<reference path='../../../utils/string.ts'/>

module MetaApp.Models.Components {
	/**
	 * Base class to describe containers. All container-based components should inherit from this base.
	 * Handle all child relations.
	 */
	export class ContainerBase extends ElementBase implements Contracts.IMetaContainerComponent {
		/**
		 * Component children list
		 * @type {Array}
		 */
		items: Array<Contracts.IMetaBaseComponent> = [];

		/**
		 * Constructor
		 * @param meta
		 * @param options
		 */
		constructor(meta: Contracts.IMetaContainerComponent, options: any) {
			super(meta, options);

			//parse all childs and instantiate child list
			for(var i=0, len=(meta.items || []).length, e; i<len; i++) {
				e = meta.items[i];

				if(_.isString(e.type)) {
					e.type = Enums.MetaComponentType[MetaApp.Utils.String.toUpperCaseFirstLetter(e.type)];
				}

				e = new (this.getComponentConstructor(e))(e, {parent: this, form: this._form});

				this.items.push(e);
				this._form && this._form.registerComponent(e);
			}
		}

		/**
		 * Destroy
		 */
		destroy() {
			this.items.length = 0;
		}

		/**
		 * Returns child component constructor class
		 * @param meta
		 * @returns {any}
		 */
		private getComponentConstructor(meta: any) {
			if(meta.type === MetaApp.Enums.MetaComponentType.List) { return CollectionBase; }

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
		public validate(): Contracts.IValidationResult {
			var isValid = true;

			for(var i=0, len=(this.items || []).length, e; i<len; i++) {
				e = this.items[i];
				e.validate && !e.validate().isValid && (isValid = false);
			}

			return {isValid: isValid, message: undefined};
		}
		//#endregion
	}
}