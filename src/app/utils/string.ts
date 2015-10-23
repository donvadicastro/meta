module MetaApp.Utils {
    export class String {
        public static toUpperCaseFirstLetter(input: string): string {
            return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
        }
    }
}