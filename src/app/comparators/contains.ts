/// <reference path="../../../typings/underscore.d.ts" />
import _ = require('underscore');

/**
 * "contains" comparator function implementation. Used to check one value is included in second.
 * @param actual Current data value to check
 * @param declared Statically declared value to check
 * @returns {boolean}
 */
export function contains(actual, declared) {
    if((_.isArray(actual) || _.isString(actual)) && actual.indexOf(declared) !== -1) {
        return true;
    }

    if ((_.isArray(declared) || _.isString(declared)) && declared.indexOf(actual) !== -1) {
        return true;
    }

    return false;
}
