import {IMetaDataComponent} from "./IMetaDataComponent";

/**
 * Base meta dictionary component contract declaration. Inherits from IMetaDataComponent
 */
export interface IMetaDictionaryComponent extends IMetaDataComponent {
    /**
     * Component dictionary reference
     */
    dictionary: string;
}