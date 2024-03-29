import {ElementBase} from "./base/element";
import {IMetaAction} from "../../../contracts/IMetaAction";
import {IMetaActionComponent} from "../../../contracts/IMetaActionComponent";
import {ActionFactory} from '../../../actions/factory';
import * as _ from "underscore";

/**
 * Action is an form trigger or processing unit. Behaves as a button clicked or submitted action.
 * Advantages of using actions - it can be invisible and react to data model events.
 */
export class ActionBase extends ElementBase implements IMetaActionComponent {
    /**
     * Action declaration
     * @private
     */
    action: IMetaAction | IMetaAction[];

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
     * Element initialization
     * @param options
     */
    public initialize(options?: any): void {
        super.initialize(options);
        this._bindDynamicChange();
    }

    /**
     * Destroy
     */
    public destroy(): void {
        super.destroy();
        this._unbindDynamicChange();
    }

    /**
     * Execute action
     */
    async execute(): Promise<boolean> {
        const sequence = _.isArray(this.action) ? this.action : [this.action];

        for (let i = 0; i < sequence.length; i++) {
            if (!await ActionFactory.get(sequence[i].name)?.call(this)) return false;
        }

        return true;
    }

    /**
     * Bind to dynamic change for action trigger event.
     */
    private _bindDynamicChange() {
        this._form && this._form.eventManager.on(`prop:${this.name}`, this._onActionTrigger.bind(this));
    }

    /**
     * Unbind to dynamic change for action trigger event.
     */
    private _unbindDynamicChange() {
        this._form && this._form.eventManager.off(`prop:${this.name}`, this._onActionTrigger.bind(this));
    }

    private _onActionTrigger(prop: string, value: any) {
        if (prop === 'action.execute' && value) this.execute();
    }
}
