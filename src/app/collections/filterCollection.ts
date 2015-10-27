///<reference path='../contracts/IMetaFilter.ts'/>
///<reference path='../models/components/base/dictionary.ts'/>
///<reference path='../comparators/eq.ts'/>
///<reference path='../utils/object.ts'/>

module MetaApp.Collections {
    import DictionaryBase = MetaApp.Models.Components.DictionaryBase;

    export class FilterCollection {
        private _element: DictionaryBase;
        private _items: Array<any> = [];

        constructor(element: DictionaryBase) {
            this._element = element;
            this._items = element.filters;
        }

        public count(): number {
            return this._items.length;
        }

        public filter(dictionaryItems: Array<any>): Array<any> {
            return this._items ? _.filter(dictionaryItems, i => this.filterItem(i)) : dictionaryItems;
        }

        private filterItem(item): boolean {
            return _.all(this._items, i => MetaApp.Comparators[i.comparator](Utils.Object.getByPath(i.by, item), i.val));
        }
    }
}