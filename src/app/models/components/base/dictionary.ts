import {DataBase} from "./data";
import {IMetaDictionaryComponent} from "../../../contracts/IMetaDictionaryComponent";
import {DictionaryModel} from "../../dictionaryModel";

/**
 * Dictionary-based component class implementation.
 * Main generic class to be inherited from for all components which uses dictionaries as set of allowed component values.
 */
export class DictionaryBase extends DataBase implements IMetaDictionaryComponent{
    /**
     * Dictionary manager reference
     */
    private _dictionaryModel: DictionaryModel;

    /**
     * Dictionary name to get data from
     */
    dictionary: string;

    /**
     * List of component filters
     */
    filters?: Array<any>;

    /**
     * Constructor
     * @param meta
     * @param options
     */
    constructor(meta: IMetaDictionaryComponent, options?: any) {
        super(meta, options);

        this.dictionary = meta.dictionary;
        this.filters = meta.filters;

        this._dictionaryModel = new DictionaryModel(this);
    }

    /**
     * Returns component dictionary content which passed through dictionary manager pipeline
     * @returns {Promise<Array<any>>}
     */
    public async getList(): Promise<Array<any>> {
        return this._dictionaryModel.getList();
    }
}
