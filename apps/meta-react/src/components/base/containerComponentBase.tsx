import React from "react";
import factoryResolver from "../factories/componentFactory";
import {ComponentBase} from "./componentBase";
import {ContainerBase} from "@meta/core";

export class ContainerComponentBase<T extends ContainerBase> extends ComponentBase<T> {
    render() {
        return (
            <div>
                {this.props.elementRef().items
                    .filter(x => x._meta.renderer)
                    .map(x => React.createElement(factoryResolver(x._meta.renderer), {
                        meta: x._meta, elementRef: () => x
                }))}
            </div>
        );
    }
}
