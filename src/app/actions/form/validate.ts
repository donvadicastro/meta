import {Action} from "../../models/components/action";

/**
 * Validate form action.
 * Context is reference to action initiated call.
 */
export function formValidate(this: Action) {
    this._form.validate();
}
