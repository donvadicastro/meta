///<reference path='../models/components/base/base/element.ts'/>

module MetaApp.Managers {
    import ElementBase = MetaApp.Models.Components.ElementBase;
    import Comparators = MetaApp.Comparators;

    /**
     * Dynamic manager class to handle element dynamic actions
     */
    export class DynamicManager {
        /**
         * Form element to bind to
         */
        private _element: ElementBase;

        /**
         * Dynamic evaluation results
         * @type {object}
         * @private
         */
        private _dynamicEvaluations: any = {};

        /**
         * Class constructor
         */
        constructor(element: ElementBase) {
            this._element = element;
        }

        /**
         * Get dynamic property value
         */
        getPropertyValue(property: string) {
            return this._dynamicEvaluations[property];
        }

        /**
         * Bind element dynamic to form data processing
         */
        bind(): void {
            let element = this._element,
                form = element._form,
                when = element.dynamic && element.dynamic.when;

            if(form && when && when[0].binding) {
                form.eventManager.on('data:' + when[0].binding, this.onDataChange, this);
            }
        }

        /**
         * Unbind element dynamic from form data processing
         */
        unbind(): void {
            let element = this._element,
                form = element._form,
                when = element.dynamic && element.dynamic.when;

            if(form && when && when[0].binding) {
                form.eventManager.off('data:' + when[0].binding, this.onDataChange, this);
            }
        }

        /**
         * Data change event handler
         * @param model
         * @param value
         */
        private onDataChange(val): void {
            let dynamic = this._element.dynamic,
                when = dynamic.when[0],
                res = {};

            if(Comparators[when.fn](val, when.val)) {
                res[dynamic.prop] = dynamic.val;

                this._dynamicEvaluations[dynamic.prop] = dynamic.val;
                this._element._form.eventManager.trigger('prop:' + this._element.name, res);
            }
        }
    }
}