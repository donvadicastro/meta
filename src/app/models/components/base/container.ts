///<reference path='../../../Enums/MetaComponentType.ts'/>
///<reference path='../../../Contracts/IMetaBaseComponent.ts'/>
///<reference path='../../../Contracts/IMetaContainerComponent.ts'/>
///<reference path='base/element.ts'/>
///<reference path='data.ts'/>
///<reference path='dictionary.ts'/>

module MetaApp.Models.Components {
	/**
	 * Base class to describe containers. All container-based components should inherit from this base.
	 * Handle all child relations.
	 */
	export class ContainerBase extends ElementBase implements Contracts.IMetaContainerComponent {
		name: string;
		items: Array<Contracts.IMetaBaseComponent> = [];
		
		constructor(meta: Contracts.IMetaContainerComponent, options: any) {
			super(meta, options);

			//parse all childs and instantiate child list
			for(var i=0, len=(meta.items || []).length, e; i<len; i++) {
				e = meta.items[i];

				if(_.isString(e.type)) {
					e.type = Enums.MetaComponentType[e.type.charAt(0).toUpperCase() + e.type.slice(1).toLowerCase()];
				}

				this.items.push(new (this.getComponentConstructor(e))(e, {parent: this, form: this._form}));
			}
		}

		destroy() {
			this.items.length = 0;
		}

		private getComponentConstructor(meta: any) {
			if(meta.dictionary) { return DictionaryBase; }
			if(meta.binding) { return DataBase; }

			return ElementBase;
		}

		//#region "Container CRUD"
		public add(component: ElementBase, position?: number) {
			component._parent = this;
			this.items.splice(position >= 0 ? position : -1, 0, component);
		}

		public remove(component: ElementBase, destroy?: boolean) {
			delete component._parent;

			this.items.splice(this.items.indexOf(component), 1);
			destroy && component.destroy();
		}

		public move(component: ElementBase) {
			component._parent.remove(component);
			this.add(component);
		}
		//#endregion
	}
}