import {IMetaBaseComponent} from "./IMetaBaseComponent";
import {IMetaAction} from "./IMetaAction";

/**
 * Base meta data component contract declaration. Inherits from IMetaBaseComponent.
 */
export interface IMetaActionComponent extends IMetaBaseComponent {
	/**
	 * Action declaration
	 */
	action: IMetaAction;
}
