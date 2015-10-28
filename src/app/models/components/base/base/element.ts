///<reference path='../../../../contracts/IMetaBaseComponent.ts'/>
///<reference path='../../../../contracts/IValidationResult.ts'/>

///<reference path='../container.ts'/>
///<reference path='../../form.ts'/>

module MetaApp.Models.Components {
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
		type: Enums.MetaComponentType;

		//_parent and _form relations
		/**
		 * Parent container reference
		 */
		_parent: ContainerBase;

		/**
		 * Root form reference
		 */
		_form: Form;

		/**
		 * Constructor
		 * @param meta
		 * @param options
		 */
		constructor(meta: Contracts.IMetaBaseComponent, options: any) {
			options || (options = {});

			this.name = meta.name;
			this._parent = options.parent;
			this._form = options.form;
		}

		/**
		 * Validate component and returns validation result
		 * @returns {{isValid: boolean, message: string}}
		 */
		public validate(): Contracts.IValidationResult {
			return {isValid: true, message: undefined};
		}

		/**
		 * Destroy
		 */
		public destroy(): void {

		}
	}
}