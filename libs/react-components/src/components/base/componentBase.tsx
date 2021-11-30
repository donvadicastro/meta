import {Component} from "react";
import {ElementBase} from "@meta/core";

export interface ComponentPropsBase<T> {
    key?: number;
    meta: any;
    elementRef: () => T;
}

type StateProperties = { 'ui.label': string, 'ui.hidden': boolean, 'ui.disabled': boolean };

export class ComponentBase<T extends ElementBase> extends Component<ComponentPropsBase<T>, StateProperties> {
    constructor(props: ComponentPropsBase<T>) {
        super(props);

        this.state = this.getState(this.props.elementRef());
        this.props.elementRef().bindDynamicChange(this.onDynamicChange.bind(this));
    }

    componentWillReceiveProps(nextProps: Readonly<ComponentPropsBase<T>>, nextContext:any) {
        this.setState(this.getState(nextProps.elementRef()));
    }

    onDynamicChange(prop: 'ui.label') {
        this.setState({[prop]: this.props.elementRef().getPropertyValue(prop)});
    }

    protected getState(element: ElementBase): StateProperties {
        return {
            'ui.label': element.getPropertyValue('ui.label'),
            'ui.hidden': element.getPropertyValue('ui.hidden'),
            'ui.disabled': element.getPropertyValue('ui.disabled'),
        };
    }
}
