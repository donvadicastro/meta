///<reference path='IMetaDataComponent.ts'/>

module MetaApp.Contracts {
    /**
     * Meta single filter contract declaration.
     */
    export interface IMetaFilter {
        /**
         * Data property name to be used to get data from
         */
        by: string;

        /**
         * Comparator function to compare data
         */
        comparator: string;

        /**
         * Value to check with. Can be static or dynamic. Dynamic values goes with '@' symbol in the beginning.
         */
        val: string;
    }
}