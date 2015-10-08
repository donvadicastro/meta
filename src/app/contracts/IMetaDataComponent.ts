///<reference path='IMetaBaseComponent.ts'/>

module MetaApp.Contracts {
	export interface IMetaDataComponent extends IMetaBaseComponent {
		binding: string;
		value: any;
	}
}