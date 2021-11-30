import {Component} from "react";
import {FormComponent} from "./formComponent";
import {Form} from "@meta/core";

const YAML = require('yamljs');

type FormWrapperParams = { json?: any, yaml?: string, value?: any };

export class FormComponentWrapper extends Component<FormWrapperParams> {
    element: Form;

    constructor(props: FormWrapperParams) {
        super(props);

        this.element = new Form(FormComponentWrapper.getMeta(props));
        this.element.initialize();

        props.value && this.element.setValue(props.value);
    }

    shouldComponentUpdate(nextProps: Readonly<FormWrapperParams>, nextState: any) {
        return JSON.stringify(nextProps.json) !== JSON.stringify(this.props.json) ||
            nextProps.yaml !== this.props.yaml;
    }

    componentWillReceiveProps(nextProps: Readonly<FormWrapperParams>, nextContext:any) {
        this.element.destroy();
        this.element = new Form(FormComponentWrapper.getMeta(nextProps));
        this.element.initialize();

        nextProps.value && this.element.setValue(nextProps.value);
    }

    componentWillUnmount() {
        this.element.destroy();
    }

    render() {
        return <FormComponent
            key={new Date().getDate()}
            meta={FormComponentWrapper.getMeta(this.props)}
            elementRef={() => this.element} />
    }

    private static getMeta(props: FormWrapperParams): any {
        return props.yaml ? YAML.parse(props.yaml) : props.json;
    }
}
