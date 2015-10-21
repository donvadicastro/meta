///<reference path='IMetaBaseComponent.ts'/>

module MetaApp.Contracts {
	export interface IMetaDataComponent extends IMetaBaseComponent {
		binding: string;
		value: any;
<<<<<<< HEAD
		type?: string;

		validation?: any;
=======
		type?: Enums.MetaComponentType;
>>>>>>> 5ac5ad719ad8bf9e933b5f8f701c421ed7aa4346
	}
}