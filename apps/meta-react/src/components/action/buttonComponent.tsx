import React from "react";
import {ComponentBase} from "../base/componentBase";
import {ActionBase} from "@meta/core";

/**
 * Primary UI component for action
 */
export class ButtonComponent extends ComponentBase<ActionBase> {
    onClick() {
        const confirmation = this.props.elementRef().getPropertyValue('action.confirmation');
        const canExecute = confirmation ? window.confirm(confirmation) : true;

        canExecute && this.props.elementRef().execute();
    }

    render() {
        return (
            <button type="button" className="btn btn-primary" hidden={this.state['ui.hidden']} disabled={this.state['ui.disabled']}
                onClick={() => this.onClick()}>{this.props.elementRef().getPropertyValue('ui.label')}</button>
        );
    }
}
