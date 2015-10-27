module MetaApp.Comparators {
    /**
     * "equal" comparator function implementation. Used to check two elements they are identical.
     * @param actual Current data value to check
     * @param declared Statically declared value to check
     * @returns {boolean}
     */
    export function eq(actual, declared) {
        return actual === declared;
    }
}