///<reference path='../../../typings/underscore.d.ts'/>

module MetaApp.Managers {
    export class ResourceManager {
        private static _resourcesHash = {
            'validators.requiredValidator.message': 'this field is required',
            'validators.minValidator.message.string': 'validators.minValidator.message.string',
            'validators.minValidator.message.number': 'validators.minValidator.message.number',
            'validators.maxValidator.message.string': 'validators.maxValidator.message.string',
            'validators.maxValidator.message.number': 'validators.maxValidator.message.number'
        };

        public static get(key: string): string {
            return this._resourcesHash[key];
        }

        public static set(key: string|any, value?: string): void {
            if(_.isString(key)) {
                this._resourcesHash[key] = value;
            } else {
                _.extend(this._resourcesHash, key);
            }
        }
    }
}