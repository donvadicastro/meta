module MetaApp.Utils {
    export class Object {
        public static getByPath(path: string, obj: any): any {
            return obj && _.reduce(path.split('.'), (memo, i) => { return memo = memo && memo[i]; }, obj);
        }
    }
}