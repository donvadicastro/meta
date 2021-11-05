import {DataBase} from "./base/data";
import {FilterCollection} from "../../collections/filterCollection";
import {IMetaDataComponent} from "../../contracts/IMetaDataComponent";
import {ContainerBase} from "./base/container";
import {IMetaCollectionComponent} from "../../contracts/IMetaCollectionComponent";
import _ from "underscore";

/**
 * Base class to describe collections. All collection-based components should inherit from this base.
 * Handle all child relations.
 */
export class CollectionBase extends DataBase implements IMetaDataComponent {
    /**
     * Filter collection
     * @private
     */
    private _filters: FilterCollection;

    /**
     * Default sort order
     * @private
     */
    private _ascending: boolean = true;

    /**
     * Collection container reference
     * @private
     */
    private _collectionContainer: ContainerBase;

    /**
     * Data model that container can operate with
     */
    data: any = {};

    /**
     * Constructor
     * @param meta
     * @param options
     */
    constructor(meta: IMetaCollectionComponent, options?: any) {
        super(meta, options);

        //create container
        const o = _.extend(options || {}, {container: this});
        this._collectionContainer = new ContainerBase(meta, o);
        this._collectionContainer.initialize(o);

        //create children
        //ContainerBase.prototype.initializeItems.call(this, meta.items);

        //create filter collection
        this._filters = new FilterCollection(this, this.onFilterChange);

        // define default sort order
        this._ascending = !meta.sort || meta.sort === 'ASC';
    }

    /**
     * Set new component value
     * @param value
     */
    public setValue(value: any) {
        super.setValue(value);

        this.value = this._filters.filter(value);

        // reverse collection when DESC sort order specified
        if(!this._ascending && _.isArray(value)) {
            this.value = this.value.reverse();
        }

        return this;
    }

    /**
     * Gets container reference
     * @returns {ContainerBase}
     */
    public getContainer(): ContainerBase {
        return this._collectionContainer;
    }

    /**
     * Gets data currently selected or new edits if no selection
     */
    public getSelected(): any {
        return this.data;
    }

    /**
     * Select collection item
     * @param id
     */
    public setSelected(id: number) {
        const value = (this.getValue() || []).filter((i: any) => i.id === id);

        if(value.length) {
            this.data = value[0];
        }
    }

    /**
     * Add data to collection
     * @param data
     */
    public addItem(data: any): void {
        let value = this.getValue();
        (value || (value = [])).push(data);

        this.setValue(value);
    }

    /**
     * Select data for editor
     * @param data
     */
    public editItem(data: any): void {
        this.data = data;
    }

    /**
     * Remote item from collection
     * @param id
     */
    public removeItem(id: number): void {
        const data = this.getValue() || [],
            value = _.without(data, _.findWhere(data, {id: id}));

        this.setValue(value);
    }

    /**
     * Filter changed event handler
     */
    private onFilterChange() {
        this.binding && this.setValue(this._form.getDataByPath(this.binding));
    }
}
