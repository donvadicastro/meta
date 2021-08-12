import _ = require('underscore');

/**
 * Convert string to upper case.
 * @param actual
 */
export function upperCase(actual: any) {
    return _.isString(actual) ? actual.toUpperCase() : actual;
}
