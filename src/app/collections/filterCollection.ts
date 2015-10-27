///<reference path='../contracts/IMetaFilter.ts'/>
///<reference path='../models/components/base/dictionary.ts'/>
///<reference path='../comparators/eq.ts'/>
///<reference path='../utils/object.ts'/>

module MetaApp.Collections {
    import DictionaryBase = MetaApp.Models.Components.DictionaryBase;

    /**
     * Collection to store and work with component filters. Can support filters recalculation.
     */
    export class FilterCollection {
        /**
         * Dictionary component with applied filters
         */
        private _element: DictionaryBase;

        /**
         * Component filters collection
         * @type {Array}
         * @private
         */
        private _items: Array<any> = [];

        /**
         * Constructor
         * @param element
         */
        constructor(element: DictionaryBase) {
            this._element = element;
            this._items = element.filters;
        }

        /**
         * Returns collection elements count
         * @returns {number}
         */
        public count(): number {
            return this._items.length;
        }

        /**
         * Returns dictionary content filtered by applied filters
         * @param dictionaryItems
         * @returns {T[]|Array<any>}
         */
        public filter(dictionaryItems: Array<any>): Array<any> {
            return this._items ? _.filter(dictionaryItems, i => this.filterItem(i)) : dictionaryItems;
        }

        /**
         * Returns filter result per element
         * @param item
         * @returns {boolean}
         */
        private filterItem(item): boolean {
            return _.all(this._items, i => MetaApp.Comparators[i.comparator](Utils.Object.getByPath(i.by, item), i.val));
        }
    }
}