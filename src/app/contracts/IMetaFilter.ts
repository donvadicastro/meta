///<reference path='IMetaDataComponent.ts'/>
///<reference path='IMetaComparator.ts'/>

module MetaApp.Contracts {
    export interface IMetaFilter {
        by: string;
        comparator: IMetaComparator;
        val: string;
    }
}