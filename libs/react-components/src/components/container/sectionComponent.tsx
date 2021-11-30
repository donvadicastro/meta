import {ComponentBase} from "../base/componentBase";
import React from "react";
import {TabPanel, TabView} from 'primereact/tabview';
import factoryResolver from "../factories/componentFactory";
import {ContainerBase} from "@meta/core";

export class SectionComponent<T extends ContainerBase> extends ComponentBase<T> {
    render() {
        return (
            <div>
                <h5>{this.props.meta.ui?.label}</h5>
                <TabView activeIndex={0}>
                    {this.props.elementRef().items
                        .filter(x => x._meta.renderer === 'container' || x._meta.renderer === 'table')
                        .map(x => <TabPanel header={x.getPropertyValue('ui.label')}>
                            {React.createElement(factoryResolver(x._meta.renderer), {
                                meta: x._meta, elementRef: () => x
                            })}
                        </TabPanel>
                    )}
                </TabView>
            </div>
        );
    }
}
