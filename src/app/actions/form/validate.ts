import {ActionBase} from "../../models/components/base/action";

/**
 * Validate form action.
 * Context is reference to action initiated call.
 */
export async function formValidate(this: ActionBase): Promise<boolean> {
    return this._form.validate().isValid;
}
