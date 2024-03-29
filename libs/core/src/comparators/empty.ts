import * as _ from "underscore";

/**
 * "empty" comparator function implementation. Used to check value is empty.
 * @param actual Current data value to check
 * @returns {boolean}
 */
export function empty(actual?: any) {
    if(_.isNumber(actual)) return false;
    if(_.isBoolean(actual)) return false;
    if(_.isString(actual) && actual.length) return false;

    return !(_.isObject(actual) && ['[]', '{}'].indexOf(JSON.stringify(actual)) === -1);
}
