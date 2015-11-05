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

            this.bind();
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
            return _.all(this._items, i => {
                //comparator can be specified with negation (!eq, !contains), check this first
                var hasNegation = i.comparator.charAt(0) === '!',
                    compare = MetaApp.Comparators[hasNegation ? i.comparator.substr(1) : i.comparator](Utils.Object.getByPath(i.by, item), i.val);

                return hasNegation ? !compare : compare;
            });
        }

        /**
         * Bind dynamic filters
         */
        private bind(): void {
            this._items && this._items.forEach(i => this.isDynamicValue(i.val || '') && this.bindFilter(i));
        }

        /**
         * Bind particular dynamic filter to data model
         * @param filter
         */
        private bindFilter(filter): void {
            var path = filter.val.substr(1),
                form = this._element._form;

            form.eventManager.on('data:' + path, this.onDataChange, filter)
            filter.val = form.getDataByPath(path);
        }

        /**
         * Check if filter value is dynamic value
         * @param filter
         */
        private isDynamicValue(filter: string): boolean {
            return filter.charAt(0) === '@';
        }

        /**
         * Dynamic value was changed event handler
         * @param value
         */
        private onDataChange(value): void {
            var context: any = this;
            context.val = value;
        }
    }
}