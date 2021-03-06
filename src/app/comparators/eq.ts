/// <reference path="../../../typings/underscore.d.ts" />
import _ = require('underscore');

/**
 * "equal" comparator function implementation. Used to check two values are identical.
 * @param actual Current data value to check
 * @param declared Statically declared value to check
 * @returns {boolean}
 */
export function eq(actual, declared) {
    return (_.isString(actual) ? actual : JSON.stringify(actual)) === (_.isString(declared) ? declared : JSON.stringify(declared));
}
