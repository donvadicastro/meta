///<reference path='maxValidator.ts'/>
///<reference path='../managers/resourceManager.ts'/>

module MetaApp.Validators {
    export class MinValidator extends MaxValidator {
        protected getValidatorValue() {
            return this._element.validation.min;
        }

        protected getErrorMessage(type: string): string {
            return MetaApp.Managers.ResourceManager.get('validators.minValidator.message.' + type);
        }

        protected stringValidate(actual: string, compare: number): boolean {
            return actual.length >= compare;
        }

        protected numberValidate(actual: number, compare: number): boolean {
            return actual >= compare;
        }
    }
}