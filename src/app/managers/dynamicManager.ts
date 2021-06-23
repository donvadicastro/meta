import {IMetaDynamicWhen} from "../contracts/IMetaDynamicWhen";
import {ElementBase} from "../models/components/base/base/element";
import _ from "underscore";
import * as Comparators from "../comparators";

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
     * Bind element dynamic to form data pocessing
     */
    bind(): void {
        let element = this._element,
            form = element._form,
            when = element.dynamic && element.dynamic.when;

        form && when && when.forEach((i: IMetaDynamicWhen) => {
            i.binding && form.eventManager.on('data:' + i.binding, this.onDataChange, { context: this, when: i });
            i.val && i.val.indexOf('@')+1 && form.eventManager.on('data:' + i.val.slice(1), this.onDataChange, { context: this, when: i });
        });
    }

    /**
     * Unbind element dynamic from form data processing
     */
    unbind(): void {
        let element = this._element,
            form = element._form,
            when = element.dynamic && element.dynamic.when;

        form && when && when.forEach((i: IMetaDynamicWhen) => {
            i.binding && form.eventManager.off('data:' + i.binding, this.onDataChange, { context: this, when: i });
        });
    }

    /**
     * Data change event handler
     * @param model
     * @param value
     */
    private onDataChange(val: any, options: any): void {
        options || (options = {});

        // this is possible to have ANY as function is called thgough `call` and `apply` semantic.
        const self: any = this;

        const context = self.context,
            element = context._element,
            dynamic = element.dynamic,
            when = self.when,
            res: any = {};

        //comparator can be specified with negation (!eq, !contains), check this first
        var hasNegation = when.fn.charAt(0) === '!',

            //@ts-ignore
            compare = Comparators[hasNegation ? when.fn.substr(1) : when.fn](element._form.getDataByPath(when.binding), when.val.indexOf('@')+1 ?
                element._form.getDataByPath(when.val.slice(1)) : when.val);

        //store evaluation result into local object
        when._evaluationResult = hasNegation ? !compare : compare;

        if(!options.silent) {
            //set dynamic
            res[dynamic.prop] = context.evaluateDynamic() ? dynamic.val : undefined;

            //notify listeners that dynamic was changed
            context._dynamicEvaluations[dynamic.prop] = res[dynamic.prop];
            element._form.eventManager.trigger('prop:' + element.name, dynamic.prop, res[dynamic.prop]);
        }
    }

    /**
     * Evaluate full dynamic
     */
    private evaluateDynamic(): boolean {
        return (this._element.dynamic.operator || 'and').toLowerCase() === 'and' ?
            this._element.dynamic.when.reduce((memo: boolean, i: IMetaDynamicWhen) => this.evaluateWhen(i) && memo, true):
            this._element.dynamic.when.reduce((memo: boolean, i: IMetaDynamicWhen) => this.evaluateWhen(i) || memo, false);
    }

    /**
     * Evaluate expression
     * @param when
     */
    private evaluateWhen(when: any): boolean {
        _.isBoolean(when._evaluationResult) || this.onDataChange.call({context: this, when: when}, this._element._form.getDataByPath(when.binding), {silent: true});
        return when._evaluationResult;
    }
}
