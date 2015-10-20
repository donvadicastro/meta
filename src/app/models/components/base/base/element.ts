///<reference path='../../../../contracts/IMetaBaseComponent.ts'/>
///<reference path='../container.ts'/>
///<reference path='../../form.ts'/>

module MetaApp.Models.Components {
	/**
	 * Base class to describe meta component. All custom components should inherit from this base class.
	 */
	export class ElementBase {
		//element metadata properties
		name: string;
		type: Enums.MetaComponentType;

		//_parent and _form relations
		_parent: ContainerBase;
		_form: Form;

		constructor(meta: Contracts.IMetaBaseComponent, options: any) {
			options || (options = {});

			this.name = meta.name;
			this._parent = options.parent;
			this._form = options.form;
		}

		public validate(): boolean {
			return true;
		}

		public destroy(): void {

		}
	}
}