///<reference path='../../managers/eventManager.ts'/>
///<reference path='base/container.ts'/>

module MetaApp.Models.Components {
    /**
     * Form is the main logical container for some set of components which bound to some single data model.
     * Form handle all communications inside this logical container and is fully isolated.
     */
    export class Form extends ContainerBase {
        private _dataByBinding: any;
        private _componentByName: any;

        public eventManager: Managers.EventManager;
        public data: Object;
        public dictionaries: Object;
        private invalidElements: Object;

        constructor(meta: Contracts.IMetaContainerComponent, options: any) {
            this.eventManager = new Managers.EventManager();

            this.data = {};
            this.invalidElements = {};

            this._dataByBinding = {};
            this._componentByName = {};

            super(meta, {form: this});

            this.eventManager.on('data:*', this.onDataChange, this);
            this.eventManager.on('valid:*', this.onValid, this);
            this.eventManager.on('invalid:*', this.onInvalid, this);

            this.dictionaries = meta.dictionaries;
        }

        public registerComponent(element: ElementBase): void {
            this._form._componentByName[element.name] = element;
        }

        public destroy() {
        }

        private onDataChange(binding: string, value): void {
            this._dataByBinding[binding] = value;
            this.setByPath(binding, value);
        }

        private onValid(name: string) {
            delete this.invalidElements[name];
        }

        private onInvalid(name: string, message: string) {
            this.invalidElements[name] = message;
        }

        private setByPath(binding: string, value): void {
            var bindingParts = binding.split('.'),
                data = this.data;

            for(var i=0, len=bindingParts.length-1, b; i<len; i++) {
                b = bindingParts[i];

                data[b] || (data[b] = {});
                data = data[b];
            }

            data[bindingParts[bindingParts.length-1]] = value;
        }

        //private getByPath(binding: string): any {
        //    var bindingParts = binding.split('.'),
        //        data = this.data;
        //
        //    for(var i=0, len=bindingParts.length, b; i<len; i++) {
        //        b = bindingParts[i];
        //        data && data[b] && (data = data[b]);
        //    }
        //
        //    return data;
        //}
    }
}