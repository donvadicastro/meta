module MetaApp.Comparators {
    /**
     * "greater" comparator function implementation. Used to check first value is greater than second.
     * @param actual Current data value to check
     * @param declared Statically declared value to check
     * @returns {boolean}
     */
    export function greater(actual, declared) {
        return actual > declared;
    }
}