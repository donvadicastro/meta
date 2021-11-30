import {ContainerComponentBase} from "../base/containerComponentBase";
import React from "react";
import {ContainerBase} from "@meta/core";

export class ContainerComponent<T extends ContainerBase> extends ContainerComponentBase<T> {
    render() {
        let isSection = this.props.elementRef()._parent?._meta.renderer === 'section';

        return (
            <div>
                {isSection || <h5>{this.props.meta.ui?.label}</h5>}
                <div className={isSection ? "" : "container border mb-2 pb-2"}>
                    { super.render() }
                </div>
            </div>
        );
    }
}
