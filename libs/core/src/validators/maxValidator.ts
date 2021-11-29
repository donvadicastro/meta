import {BaseValidator} from "./base/baseValidator";
import {IValidationResult} from "../contracts/IValidationResult";
import {ResourceManager} from "../managers/resourceManager";
import * as _ from "underscore";

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
        const value = this._element.getValue();

        //call base when value is not set
        if(_.isUndefined(value)) { return super.validate(); }

        const valValue = this.getValidatorValue(),
            validator = this.resolveValidator(value);

        return {
            isValid: validator(value, valValue),
            message: this.getErrorMessage(typeof value)
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
    protected resolveValidator(actual: any): (actual: any, compare: any) => boolean {
        if(_.isString(actual)) { return this.stringValidate; }
        if(_.isNumber(actual)) { return this.numberValidate; }

        throw new Error(`Validator not exists for type ${typeof actual}`);
    }
}
