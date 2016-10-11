/// <reference path="../../../typings/underscore.d.ts" />
import _ = require('underscore');

/**
 * Resource manager class implementation. Responsible for localizing application through key-value hash table
 */
export class ResourceManager {
    /**
     * Resource hash list
     * @type {object}
     * @private
     */
    private static _resourcesHash = {
        'validators.requiredValidator.message': 'this field is required',
        'validators.minValidator.message.string': 'validators.minValidator.message.string',
        'validators.minValidator.message.number': 'validators.minValidator.message.number',
        'validators.maxValidator.message.string': 'validators.maxValidator.message.string',
        'validators.maxValidator.message.number': 'validators.maxValidator.message.number'
    };

    /**
     * Return resource value from key
     * @param key
     * @returns {string}
     */
    public static get(key: string): string {
        return this._resourcesHash[key];
    }

    /**
     * Set resource key-value pair(s)
     * @param key
     * @param value
     */
    public static set(key: string|any, value?: string): void {
        if(_.isString(key)) {
            this._resourcesHash[key] = value;
        } else {
            _.extend(this._resourcesHash, key);
        }
    }
}