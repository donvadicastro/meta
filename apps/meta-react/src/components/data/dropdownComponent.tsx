import React from 'react';
import AsyncSelect from 'react-select/async';
import {DataComponentBase} from "../base/dataComponentBase";
import {DictionaryBase} from "@meta/core";

const objectPath = require("object-path");

/**
 * Primary UI component for user interaction
 */
export class DropdownComponent extends DataComponentBase<DictionaryBase> {
    onChange(e: any) {
        this.props.elementRef().setValue(e);
    }

    render() {
        const loadOptions = (inputValue: string, callback: (data: any[]) => void) => {
            this.props.elementRef().getList()
                .then((data: any[]) => callback(data
                    .map(x => typeof x === 'string' ? {name: x} : x)
                    .map(x => ({...x, label: objectPath.get(x, this.props.meta.ui.displayField || 'name')}))));
        };

        return (
            <div hidden={this.state['ui.hidden']}>
                <label className="form-label">{this.state['ui.label']}</label>
                <AsyncSelect
                    cacheOptions defaultOptions
                    disabled     = { this.state['ui.disabled'] }
                    onChange     = { (e: any) => this.onChange(e) }
                    loadOptions  = { loadOptions }
                    value        = { this.getDisplayValue()} />
            </div>
        );
    }

    private getDisplayValue() {
        return this.state.value && {
            label: objectPath.get(this.state.value,
                this.props.elementRef().getPropertyValue('ui.displayField') || 'name'),

            value: objectPath.get(this.state.value,
                this.props.elementRef().getPropertyValue('ui.keyField') || 'key')
        };
    }
}
