import React, {Component} from "react";
import {DataBase} from "@meta/core";

export interface DataComponentPropsBase<T extends DataBase> {
    meta: any;
    elementRef: () => T;
}

type StateProperties = { value: any, 'ui.label': string, 'ui.hidden': boolean, 'ui.disabled': boolean };

export class DataComponentBase<T extends DataBase> extends Component<DataComponentPropsBase<T>, StateProperties> {

    constructor(props: DataComponentPropsBase<T>) {
        super(props);

        this.state = this.getState(this.props.elementRef());
        this.props.elementRef().bindModelChange(this.onModelChange.bind(this));
    }

    componentWillReceiveProps(nextProps: Readonly<DataComponentPropsBase<T>>, nextContext:any) {
        this.props.elementRef().unbindModelChange(this.onModelChange.bind(this));
        nextProps.elementRef().bindModelChange(this.onModelChange.bind(this));

        this.setState(this.getState(nextProps.elementRef()));
    }

    onModelChange(value: any) {
        console.log('model change', this.props.elementRef().name, value);
        this.setState({value: value});
    }

    onChange(e: React.ChangeEvent<HTMLInputElement>) {
        console.log('control change', e.currentTarget.value, this.props.elementRef());
        this.props.elementRef().setValue(e.currentTarget.value);
    }

    protected getState(element: DataBase): StateProperties {
        return {
            value: element.getValue(),

            'ui.label': element.getPropertyValue('ui.label'),
            'ui.hidden': element.getPropertyValue('ui.hidden'),
            'ui.disabled': element.getPropertyValue('ui.disabled'),
        };
    }
}
