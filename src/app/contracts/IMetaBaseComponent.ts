///<reference path="../enums/metaComponentType.ts"/>
///<reference path="../enums/metaComponentRenderer.ts"/>

module MetaApp.Contracts {
	export interface IMetaBaseComponent {
		name: string;
		renderer?: Enums.MetaComponentRenderer;
	}
}