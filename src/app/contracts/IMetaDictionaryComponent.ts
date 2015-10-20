///<reference path='IMetaDataComponent.ts'/>

module MetaApp.Contracts {
    export interface IMetaDictionaryComponent extends IMetaDataComponent {
        dictionary: string;
    }
}