import * as formValidate from './form/validate';

export class ActionFactory {
    private static _actions: {[key: string]: Function} = {
        'formValidate': formValidate.formValidate
    };

    /**
     * Returns action by key
     * @param key
     */
    public static get(key: string): Function {
        return this._actions[key];
    }

    /**
     * Add new action.
     * @param key
     * @param action
     */
    public static put(key: string, action: Function) {
        this._actions[key] = action;
    }
}
