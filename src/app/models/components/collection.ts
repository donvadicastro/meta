///<reference path='../../Contracts/IMetaDataComponent.ts'/>
///<reference path='../../Collections/FilterCollection.ts'/>

///<reference path='base/data.ts'/>

module MetaApp.Models.Components {
    import FilterCollection = MetaApp.Collections.FilterCollection;

    /**
     * Base class to describe containers. All container-based components should inherit from this base.
     * Handle all child relations.
     */
    export class CollectionBase extends DataBase implements Contracts.IMetaDataComponent {
        /**
         * Filter collection
         */
        private _filters: FilterCollection;

        /**
         * Constructor
         * @param meta
         * @param options
         */
        constructor(meta: Contracts.IMetaDataComponent, options: any) {
            super(meta, options);

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

        private onFilterChange() {
            this.setValue(this._form.getDataByPath(this.binding));
        }
    }
}