import {DictionaryBase} from "./components/base/dictionary";
import {FilterCollection} from "../collections/filterCollection";
import axios, {AxiosResponse} from "axios";
import _ from "underscore";

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
    public async getList(): Promise<Array<any>> {
        const element = this._element,
            dictionaries = element._form.dictionaries || {},
            items = dictionaries[this._element.dictionary] || await this._loadRemoteList();

        return Promise.resolve(this._filters.filter(items));
    }

    private async _loadRemoteList(): Promise<Array<any>> {
        return axios.get(this._element.dictionary).then(
            (response: AxiosResponse) => response.data.map((x: any) => _.isString(x) ? {key: x, name: x} : x));
    }
}
