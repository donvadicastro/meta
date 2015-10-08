///<reference path='IMetaBaseComponent.ts'/>

module MetaApp.Contracts {
	export interface IMetaContainerComponent extends IMetaBaseComponent {
		items: Array<IMetaBaseComponent>;
	}
}