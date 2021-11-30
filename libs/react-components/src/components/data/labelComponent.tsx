import React from 'react';
import {DataComponentBase} from "../base/dataComponentBase";
import {DataBase, MetaComponentType} from "@meta/core";

/**
 * Primary UI component for user interaction
 */
export class LabelComponent extends DataComponentBase<DataBase> {
    resolveType(type: MetaComponentType) {
        switch (type) {
            case 'bool': return 'checkbox';
            case 'number': return 'number';
            default: return 'string';
        }
    }

    render() {
        return this.props.elementRef().type === 'bool' ? (
            <div className={"form-check form-switch"} hidden={this.state['ui.hidden']}>
                <label className="form-check-label">{this.state['ui.label']}</label>
                <input className="form-check-input" disabled={true} checked={this.state.value} type="checkbox" />
            </div>
        ) : (
            <div hidden={this.state['ui.hidden']}>
                <label>{this.state['ui.label']}</label>
                <label className="form-control">{ this.state.value }</label>
            </div>
        );
    }
}
