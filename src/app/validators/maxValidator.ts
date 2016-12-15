/// <reference path="../../../typings/underscore.d.ts" />

import _ = require('underscore');

import {BaseValidator} from "./base/baseValidator";
import {IValidationResult} from "../contracts/IValidationResult";
import {ResourceManager} from "../managers/resourceManager";

/**
 * Max value component validator. Used to check that input value is less then allowed.
 * This check includes string length max criteria checking, number max criteria checking or date max value checking.
 */
export class MaxValidator extends BaseValidator {
    /**
     * Validates component and returns validation result
     * @returns {any}
     */
    public validate(): IValidationResult {
        var value = this._element.getValue(),
            valValue = this.getValidatorValue(),
            type = this.getTypeName(value);

        //call base when value is not set
        if(_.isUndefined(value)) { return super.validate(); }

        return {
            isValid: this[type + 'Validate'](value, valValue),
            message: this.getErrorMessage(type)
        };
    }

    /**
     * Gets max validation value to be used as right boundary
     * @returns {number} validation to check with
     */
    protected getValidatorValue() {
        return this._element.validation.max;
    }

    /**
     * Gets validation message
     * @param type
     * @returns {string}
     */
    protected getErrorMessage(type: string): string {
        return ResourceManager.get('validators.maxValidator.message.' + type);
    }

    /**
     * String validator comparison
     * @param actual
     * @param compare
     * @returns {boolean}
     */
    protected stringValidate(actual: string, compare: number): boolean {
        return actual.length <= compare;
    }


    /**
     * Number validator comparison
     * @param actual
     * @param compare
     * @returns {boolean}
     */
    protected numberValidate(actual: number, compare: number): boolean {
        return actual <= compare;
    }

    /**
     * Gets input value type to select right validator
     * @param actual
     * @returns {any}
     */
    protected getTypeName(actual: any): string {
        if(_.isString(actual)) { return 'string'; }
        if(_.isNumber(actual)) { return 'number'; }

        return 'object';
    }
}