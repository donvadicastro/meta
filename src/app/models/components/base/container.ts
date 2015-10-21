///<reference path='../../../Contracts/IMetaBaseComponent.ts'/>
///<reference path='../../../Contracts/IMetaContainerComponent.ts'/>
///<reference path='base/element.ts'/>
///<reference path='data.ts'/>

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
				e = new (this.getComponentConstructor(meta.items[i]))(meta.items[i], {parent: this, form: this.form});

				this.items.push(e);
				this.form && (this.form.componentByName[e.name] = e);
			}
		}

		destroy() {
			this.items.length = 0;
		}

		private getComponentConstructor(meta: any) {
			if(meta.binding) { return DataBase; }

			return ElementBase;
		}

		//#region "Container CRUD"
		public add(component: ElementBase, position?: number) {
			component.parent = this;
			this.items.splice(position >= 0 ? position : -1, 0, component);
		}

		public remove(component: ElementBase, destroy?: boolean) {
			delete component.parent;

			this.items.splice(this.items.indexOf(component), 1);
			destroy && component.destroy();
		}

		public move(component: ElementBase) {
			component.parent.remove(component);
			this.add(component);
		}
		//#endregion
	}
}