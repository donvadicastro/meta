import {FormComponent} from "../container/formComponent";
import {ContainerComponent} from "../container/containerComponent";
import {SectionComponent} from "../container/sectionComponent";
import {TextBoxComponent} from "../data/textBoxComponent";
import {ClassType} from "react";
import {LabelComponent} from "../data/labelComponent";
import {DropdownComponent} from "../data/dropdownComponent";
import {ButtonComponent} from "../action/buttonComponent";
import {TableComponent} from "../data/tableComponent";
import {RendererType} from "@meta/core";

export default function factoryResolver (type: RendererType): ClassType<any, any, any> {
    switch (type) {
        case 'button':          return ButtonComponent;
        case 'textbox':         return TextBoxComponent;
        case 'dropdown':        return DropdownComponent;
        case 'form':            return FormComponent;
        case 'table':           return TableComponent;
        case 'section':         return SectionComponent;
        case 'container':       return ContainerComponent;

        default:                return LabelComponent;
    }
};
