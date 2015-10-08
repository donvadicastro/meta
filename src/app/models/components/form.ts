///<reference path='../../managers/eventManager.ts'/>
///<reference path='base/container.ts'/>

module MetaApp.Models.Components {
    /**
     * Form is the main logical container for some set of components which bound to some single data model.
     * Form handle all communications inside this logical container and is fully isolated.
     */
    export class Form extends ContainerBase {
        eventManager: Managers.EventManager;

        data: any;
        dataByBinding: any;

        constructor(meta: Contracts.IMetaContainerComponent, options: any) {
            this.eventManager = new Managers.EventManager();

            this.data = {};
            this.dataByBinding = {};

            super(meta, {form: this});
            this.eventManager.on('data:*', this.onDataChange, this);
        }

        public validate(): boolean {
            return true;
        }

        public destroy() {
        }

        private onDataChange(binding: string, value): void {
            this.dataByBinding[binding] = value;
            this.setByPath(binding, value);
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

        private getByPath(binding: string): any {
            var bindingParts = binding.split('.'),
                data = this.data;

            for(var i=0, len=bindingParts.length, b; i<len; i++) {
                b = bindingParts[i];
                data && data[b] && (data = data[b]);
            }

            return data;
        }
    }
}