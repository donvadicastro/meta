import {DictionaryBase} from "../models/components/base/dictionary";
import {CollectionBase} from "../models/components/collection";
import {getByPath} from '../utils/object';
import * as Comparators from "../comparators";

import {IMetaFilter} from "../contracts/IMetaFilter";
import * as _ from "underscore";

/**
 * Collection to store and work with component filters. Can support filters recalculation.
 */
export class FilterCollection {
    /**
     * Dictionary component with applied filters
     */
    private _element: DictionaryBase | CollectionBase;

    /**
     * Component filters collection
     * @type {Array}
     * @private
     */
    private _items: Array<IMetaFilter> = [];

    /**
     * Event notifier when filters was changed
     */
    private _onChange?: Function;

    /**
     * Constructor
     * @param element
     * @param onChange change event handler
     */
    constructor(element: DictionaryBase | CollectionBase, onChange?: Function) {
        this._element = element;
        this._items = element.filters || [];
        this._onChange = onChange;

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
     * @returns {Array<any>}
     */
    public filter(dictionaryItems: Array<any>): Array<any> {
        return this._items ? _.filter(dictionaryItems, (i: any) => this.filterItem(i)) : dictionaryItems;
    }

    /**
     * Returns filter result per element
     * @param item
     * @returns {boolean}
     */
    private filterItem(item: any): boolean {
        return _.all(this._items, (i: IMetaFilter) => {
            //comparator can be specified with negation (!eq, !contains), check this first
            const hasNegation = i.comparator.charAt(0) === '!',
                compare = this.resolveComparator(i)(getByPath(i.by, item), i.val);

            return hasNegation ? !compare : compare;
        });
    }

    /**
     * Resolve comparator
     * @param metaFilter filter info
     * @returns comparator function
     * @private
     */
    private resolveComparator(metaFilter: IMetaFilter): (actual: any, declared?: any) => boolean {
        const hasNegation = metaFilter.comparator.charAt(0) === '!',
            comparatorName = hasNegation ? metaFilter.comparator.substr(1) : metaFilter.comparator;

        //@ts-ignore
        return Comparators[comparatorName];
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
    private bindFilter(filter: IMetaFilter): void {
        var path = filter.val.substr(1),
            form = this._element._form;

        form.eventManager.on('data:' + path, this.onDataChange, {filter: filter, parent: this});
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
    private onDataChange(value: any): void {
        //@ts-ignore: possible when context is specified by `call` and `apply`
        const filter: any = this.filter, parent = this.parent;

        filter.val = value;
        parent._onChange && parent._onChange.apply(parent._element);
    }
}
