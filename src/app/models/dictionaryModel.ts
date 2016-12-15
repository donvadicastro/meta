import {DictionaryBase} from "./components/base/dictionary";
import {FilterCollection} from "../collections/filterCollection";

/**
 * Dictionary manager class implementation.
 * Is used to manage component dictionary content: filtering, sorting, etc
 */
export class DictionaryModel {
    /**
     * Dictionary component reference
     */
    private _element: DictionaryBase;

    /**
     * Collection of component filters
     */
    private _filters: FilterCollection;

    /**
     * Constructor
     * @param element
     */
    constructor(element: DictionaryBase) {
        this._element = element;
        this._filters = new FilterCollection(element);
    }

    /**
     * Return component dictionary content with applied component-specific filters and sorters
     * @returns {Array<any>}
     */
    public getList(): Array<any> {
        var element = this._element,
            items = element._form.dictionaries[this._element.dictionary] || [];

        return this._filters.filter(items);
    }
}