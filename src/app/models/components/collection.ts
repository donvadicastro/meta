///<reference path='../../Contracts/IMetaCollectionComponent.ts'/>
///<reference path='../../Collections/FilterCollection.ts'/>

///<reference path='base/data.ts'/>

module MetaApp.Models.Components {
    import FilterCollection = MetaApp.Collections.FilterCollection;
    import List = _.List;

    /**
     * Base class to describe collections. All collection-based components should inherit from this base.
     * Handle all child relations.
     */
    export class CollectionBase extends DataBase implements Contracts.IMetaDataComponent {
        /**
         * Filter collection
         */
        private _filters: FilterCollection;

        /**
         * Collection container reference
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
        constructor(meta: Contracts.IMetaCollectionComponent, options: any) {
            super(meta, options);

            //create container
            this._collectionContainer = new ContainerBase(meta, _.extend(options || {}, {container: this}));

            //create children
            //ContainerBase.prototype.initializeItems.call(this, meta.items);

            //create filter collection
            this._filters = new FilterCollection(this, this.onFilterChange);
        }

        /**
         * Set new component value
         * @param value
         */
        public setValue(value: any) {
            super.setValue(value);

            this.value = this._filters.filter(value);
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
            var value = (this.getValue() || []).filter(i => i.id === id);

            if(value.length) {
                this.data = value[0];
            }
        }

        /**
         * Add data to collection
         * @param data
         */
        public addItem(data: any): void {
            var value = this.getValue();
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
            var data = this.getValue() || [],
                value = _.without(data, _.findWhere(data, {id: id}));

            this.setValue(value);
        }

        /**
         * Filter changed event handler
         */
        private onFilterChange() {
            this.setValue(this._form.getDataByPath(this.binding));
        }
    }
}