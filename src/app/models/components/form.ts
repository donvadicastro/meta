///<reference path='../../managers/eventManager.ts'/>
///<reference path='base/container.ts'/>

module MetaApp.Models.Components {
    /**
     * Form is the main logical container for some set of components which bound to some single data model.
     * Form handles all communications inside this logical container and is fully isolated.
     */
    export class Form extends ContainerBase {
        /**
         * Data hash as set of key-value pairs where key is the binding
         */
        private _dataByBinding: any;

        /**
         * Component hash as set of key-value pairs where key is the component name
         */
        private _componentByName: any;

        /**
         * Event mediator reference
         */
        public eventManager: Managers.EventManager;

        /**
         * Form data reference
         */
        public data: Object;

        /**
         * Form-specific dictionaries
         */
        public dictionaries: Object;

        /**
         * Hash list of invalid elements
         */
        private invalidElements: Object;

        /**
         * Constructor
         * @param meta
         * @param options
         */
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

        /**
         * Component registration inside form
         * @param element
         */
        public registerComponent(element: ElementBase): void {
            this._form._componentByName[element.name] = element;
        }

        /**
         * Form destroy
         */
        public destroy() {
        }

        /**
         * Data changes event listener
         * @param binding
         * @param value
         */
        private onDataChange(binding: string, value): void {
            this._dataByBinding[binding] = value;
            this.setByPath(binding, value);
        }

        /**
         * Component is valid event listener
         * @param name
         */
        private onValid(name: string) {
            delete this.invalidElements[name];
        }

        private onInvalid(name: string, message: string) {
            this.invalidElements[name] = message;
        }

        /**
         * Component is invalid event listener
         * @param binding
         * @param value
         */
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