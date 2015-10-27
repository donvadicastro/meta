///<reference path='../collections/filterCollection.ts'/>
///<reference path='../models/components/base/dictionary.ts'/>

module MetaApp.Models {
    import DictionaryBase = MetaApp.Models.Components.DictionaryBase;
    import FilterCollection = MetaApp.Collections.FilterCollection;

    export class DictionaryModel {
        private _element: DictionaryBase;
        private _filters: FilterCollection;

        constructor(element: DictionaryBase) {
            this._element = element;
            this._filters = new FilterCollection(element);
        }

        public getList(): Array<any> {
            var element = this._element,
                items = element._form.dictionaries[this._element.dictionary] || [];

            return this._filters.filter(items);
        }
    }
}