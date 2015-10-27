///<reference path='IMetaDataComponent.ts'/>
///<reference path='../Collections/FilterCollection.ts'/>
///<reference path='../Models/DictionaryModel.ts'/>

module MetaApp.Contracts {
    import DictionaryModel = MetaApp.Models.DictionaryModel;

    export interface IMetaDictionaryComponent extends IMetaDataComponent {
        dictionary: string;
        filters?: Array<any>;
    }
}