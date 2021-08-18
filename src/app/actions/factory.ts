import * as formValidate from './form/validate';

export class ActionFactory {
    private static _actions: {[key: string]: () => Promise<boolean>} = {
        'formValidate': formValidate.formValidate
    };

    /**
     * Returns action by key
     * @param key
     */
    public static get(key: string): () => Promise<boolean> {
        return this._actions[key];
    }

    /**
     * Add new action.
     * @param key
     * @param action
     */
    public static put(key: string, action: () => Promise<boolean>) {
        this._actions[key] = action;
    }
}
