import {DataBase} from "../../models/components/base/data";
import {IValidationResult} from "../../contracts/IValidationResult";

/**
 * Base validator class implementation. Class to be inherited from to create any other validators.
 */
export class BaseValidator {
    /**
     * Component reference to be validated
     */
    protected _element: DataBase;

    /**
     * Constructor
     * @param element
     */
    constructor(element: DataBase) {
        this._element = element;
    }

    /**
     * Validates component and returns validation result
     * @returns {{isValid: boolean, message: string}}
     */
    public validate(): IValidationResult {
        return {isValid: true, message: undefined};
    }
}