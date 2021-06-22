/**
 * Return value from complex data object by its path
 * @param path
 * @param obj
 * @returns {any|*}
 */
import _ from "underscore";

export function getByPath(path: string, obj: any): any {
    return obj && _.reduce<any, any>(path.split('.'), (memo: any, i: string) => { return memo = memo && memo[i]; }, obj);
}

/**
 *
 * @param data Container to insert data in
 * @param path Path to insert to
 * @param value Data to insert
 */
export function setByPath(data: any, path: string, value: any) {
    var bindingParts = path.split('.');

    for (var i = 0, len = bindingParts.length - 1, b; i < len; i++) {
        b = bindingParts[i];

        data[b] || (data[b] = {});
        data = data[b];
    }

    data[bindingParts[bindingParts.length-1]] = value;
}
