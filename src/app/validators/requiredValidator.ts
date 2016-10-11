import {BaseValidator} from "./base/baseValidator";
import {IValidationResult} from "../contracts/IValidationResult";
import {ResourceManager} from "../managers/resourceManager";

/**
 * Required value validator class implementation. Used to check component value is set.
 */
export default class RequiredValidator extends BaseValidator {
    /**
     * Validates component and return validation result.
     * @returns {{isValid: boolean, message: string}}
     */
    public validate(): IValidationResult {
        var value = this._element.getValue();

        return {
            isValid: value !== undefined && value !== null && value !== '',
            message: ResourceManager.get('validators.requiredValidator.message')
        };
    }
}