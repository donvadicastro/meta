///<reference path='../../../Contracts/IMetaDictionaryComponent.ts'/>
///<reference path='../../../Collections/FilterCollection.ts'/>
///<reference path='../../dictionaryModel.ts'/>
///<reference path='base/element.ts'/>

module MetaApp.Models.Components {
    export class DictionaryBase extends DataBase implements Contracts.IMetaDictionaryComponent{
        private _dictionaryModel: DictionaryModel;

        dictionary: string;
        filters: Array<any>;

        constructor(meta: Contracts.IMetaDictionaryComponent, options: any) {
            super(meta, options);

            this.dictionary = meta.dictionary;
            this.filters = meta.filters;

            this._dictionaryModel = new DictionaryModel(this);
        }

        public getList() {
            return this._dictionaryModel.getList();
        }
    }
}