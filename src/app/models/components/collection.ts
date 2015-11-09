///<reference path='../../Contracts/IMetaDataComponent.ts'/>
///<reference path='base/data.ts'/>

module MetaApp.Models.Components {
    /**
     * Base class to describe containers. All container-based components should inherit from this base.
     * Handle all child relations.
     */
    export class CollectionBase extends DataBase implements Contracts.IMetaDataComponent {
        /**
         * List of component filters
         */
        filters: Array<any>;

        /**
         * Constructor
         * @param meta
         * @param options
         */
        constructor(meta: Contracts.IMetaDataComponent, options: any) {
            this.filters = meta.filters;

            super(meta, options);
        }

        /**
         * Set new component value
         * @param value
         */
        public setValue(value: any) {
            super.setValue(value);
        }
    }
}