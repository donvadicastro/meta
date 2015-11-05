module MetaApp.Comparators {
    /**
     * "less" comparator function implementation. Used to check first value is less than second.
     * @param actual Current data value to check
     * @param declared Statically declared value to check
     * @returns {boolean}
     */
    export function less(actual, declared) {
        return actual < declared;
    }
}