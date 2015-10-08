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
		type: string = 'field';

		//parent and form relations
		parent: ContainerBase;
		form: Form;

		constructor(meta: Contracts.IMetaBaseComponent, options: any) {
			options || (options = {});

			this.name = meta.name;
			this.parent = options.parent;
			this.form = options.form;
		}

		public validate(): boolean {
			return true;
		}

		public destroy(): void {

		}
	}
}