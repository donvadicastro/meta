import axios from "axios";
import {Form} from "../../models/components/form";

/**
 * Submit form action.
 * Context is reference to action initiated call.
 */
export async function formSubmit(this: Form): Promise<boolean> {
    const method: 'put' | 'post' | 'delete' = this.getPropertyValue('action.method');
    const url = this.getPropertyValue('action.url');

    return await axios[method || 'post'](url);
}
