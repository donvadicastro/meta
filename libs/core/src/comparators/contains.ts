/**
 * "contains" comparator function implementation. Used to check one value is included in second.
 * @param actual Current data value to check
 * @param declared Statically declared value to check
 * @returns {boolean}
 */
import * as _ from "underscore";

export function contains(actual: any, declared: any) {
    if((_.isArray(actual) || _.isString(actual)) && actual.indexOf(declared) !== -1) {
        return true;
    }

    return (_.isArray(declared) || _.isString(declared)) && declared.indexOf(actual) !== -1;
}
