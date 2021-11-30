import {DataComponentBase} from "../base/dataComponentBase";
import React from "react";
import {DataTable} from 'primereact/datatable';
import {Column} from "primereact/column";

import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css';
import 'primeicons/primeicons.css';
import {CollectionBase} from "@meta/core";

/**
 * Primary UI component for user interaction
 */
export class TableComponent extends DataComponentBase<CollectionBase> {
    render() {
        let element = this.props.elementRef();
        let paginator = element.getPropertyValue('ui.paginator');

        return (
            <div>
                <DataTable value={element.getValue()}
                           header={element.getPropertyValue('ui.label')}
                           selectionMode="single"
                           paginator={paginator !== undefined ? paginator : true}
                           rows={element.getPropertyValue('ui.rows') || 10}
                           rowsPerPageOptions={[10,25,50,100]}>
                    {this.props.meta.items.map((x: any) => <Column field={x.binding} header={x.ui?.label || x.name}/>)}
                </DataTable>
            </div>
        );
    }
}
