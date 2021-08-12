import {ElementBase} from "./base/base/element";
import {IMetaAction} from "../../contracts/IMetaAction";
import {IMetaActionComponent} from "../../contracts/IMetaActionComponent";
import * as Actions from '../../actions';

/**
 * Action is an form trigger or processing unit. Behaves as a button clicked or submitted action.
 * Advantages of using actions - it can be invisible and react to data model events.
 */
export class Action extends ElementBase implements IMetaActionComponent {
    /**
     * Action declaration
     * @private
     */
    action: IMetaAction;

    /**
     * Element constructor
     * @param meta
     * @param options
     */
    constructor(meta: IMetaActionComponent, options?: any) {
        super(meta, options);
        this.action = meta.action;
    }

    /**
     * Execute action
     */
    execute() {
        //@ts-ignore
        const actionFn = Actions[this.action.name];
        actionFn && actionFn.call(this);
    }
}
