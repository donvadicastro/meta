///<reference path='IMetaDataComponent.ts'/>
///<reference path='../Collections/FilterCollection.ts'/>
///<reference path='../Models/DictionaryModel.ts'/>

module MetaApp.Contracts {
    import DictionaryModel = MetaApp.Models.DictionaryModel;

    /**
     * Base meta dictionary component contract declaration. Inherits from IMetaDataComponent
     */
    export interface IMetaDictionaryComponent extends IMetaDataComponent {
        /**
         * Component dictionary reference
         */
        dictionary: string;
    }
}