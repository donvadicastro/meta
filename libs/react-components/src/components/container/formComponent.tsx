import React from "react";
import {ContainerComponent} from "./containerComponent";
import {Form} from "@meta/core";

export class FormComponent extends ContainerComponent<Form> {
    render() {
        console.log('rendering form', this.props.meta);
        return <form key={this.props.key} name={this.props.meta.name}>{super.render()}</form>;
    }
}
