import React from 'react';
import {DataComponentBase} from "../base/dataComponentBase";
import {DataBase} from "@meta/core";

/**
 * Primary UI component for user interaction
 */
export class TextBoxComponent extends DataComponentBase<DataBase> {
    resolveType(element: DataBase) {
        switch (element.getPropertyValue('ui.type')) {
            case 'password': return 'password';
        }

        switch (element.type) {
            case 'bool': return 'checkbox';
            case 'number': return 'number';
            default: return 'string';
        }
    }

    render() {
        console.log('rendering textbox', this.props.meta);
        return this.props.elementRef().type === 'bool' ? (
            <div className={"form-check form-switch"} hidden={this.state['ui.hidden']}>
                <input className    = "form-check-input"
                       disabled     = { this.state['ui.disabled'] }
                       onChange     = { e => this.onChange(e) }
                       value        = { this.state.value }
                       type         = "checkbox" />
                <label className="form-check-label">{this.state['ui.label']}</label>
            </div>
        ) : (
            <div hidden={this.state['ui.hidden']}>
                <label className="form-label">{this.state['ui.label']}</label>
                <input className    = "form-control"
                       disabled     = { this.state['ui.disabled'] }
                       onChange     = { e => this.onChange(e) }
                       value        = { this.state.value }
                       type         = { this.resolveType(this.props.elementRef()) } />
            </div>
        );
    }
}
