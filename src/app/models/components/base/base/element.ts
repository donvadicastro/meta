///<reference path='../../../../contracts/IMetaBaseComponent.ts'/>
///<reference path='../../../../contracts/IValidationResult.ts'/>

///<reference path='../container.ts'/>
///<reference path='../../form.ts'/>

module MetaApp.Models.Components {
	import DynamicManager = MetaApp.Managers.DynamicManager;

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

		/**
		 * Component dynamic settings
		 */
		dynamic: any;

		/**
		 * Component UI settings
		 */
		ui: any;

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
		 * Manager to handle component dynamic actions
		 */
		private _dynamicManager: DynamicManager;

		/**
		 * Constructor
		 * @param meta
		 * @param options
		 */
		constructor(meta: Contracts.IMetaBaseComponent, options: any) {
			options || (options = {});

			this.name = meta.name;
			this.dynamic = meta.dynamic;
			this.ui = meta.ui;

			this._parent = options.parent;
			this._form = options.form;
			this._dynamicManager = new DynamicManager(this);

			this.bindDynamic();
		}

		/**
		 * Validate component and returns validation result
		 * @returns {{isValid: boolean, message: string}}
		 */
		public validate(): Contracts.IValidationResult {
			return {isValid: true, message: undefined};
		}

		/**
		 * Returns element property value
		 */
		public getPropertyValue(property: string) {
			return this._dynamicManager.getPropertyValue(property) || MetaApp.Utils.Object.getByPath(property, this);
		}

		/**
		 * Destroy
		 */
		public destroy(): void {
			this.unbindDynamic();
		}

		/**
		 * Bind component to form data processing
		 */
		private bindDynamic(): void {
			this._dynamicManager.bind();
		}

		/**
		 * Unbind component from form processing
		 */
		private unbindDynamic(): void {
			this._dynamicManager.unbind();
		}
	}
}