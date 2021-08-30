import {Action} from "../../models/components/action";

/**
 * Validate form action.
 * Context is reference to action initiated call.
 */
export async function formValidate(this: Action): Promise<boolean> {
    return this._form.validate().isValid;
}
