///<reference path='../../../Contracts/IMetaDictionaryComponent.ts'/>
///<reference path='base/element.ts'/>

module MetaApp.Models.Components {
    export class DictionaryBase extends DataBase implements Contracts.IMetaDictionaryComponent{
        dictionary: string;

        constructor(meta: Contracts.IMetaDictionaryComponent, options: any) {
            super(meta, options);

            this.dictionary = meta.dictionary;
        }

        public getList() {
            return this._form.dictionaries[this.dictionary] || [];
        }
    }
}