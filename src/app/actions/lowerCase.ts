import _ = require('underscore');

/**
 * Convert string to lower case.
 * @param actual
 */
export function lowerCase(actual: any) {
    return _.isString(actual) ? actual.toLowerCase() : actual;
}
