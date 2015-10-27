///<reference path='../../../typings/underscore.d.ts'/>

module MetaApp.Utils {
    /**
     * Object utility manager
     */
    export class Object {
        /**
         * Return value from complex data object by its path
         * @param path
         * @param obj
         * @returns {any|*}
         */
        public static getByPath(path: string, obj: any): any {
            return obj && _.reduce<any, any>(path.split('.'), (memo, i) => { return memo = memo && memo[i]; }, obj);
        }
    }
}