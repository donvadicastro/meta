///<reference path='../../../Contracts/IMetaDataComponent.ts'/>
///<reference path='base/element.ts'/>

module MetaApp.Models.Components {
    /**
     * Base class to describe containers. All container-based components should inherit from this base.
     * Handle all child relations.
     */
    export class DataBase extends ElementBase implements Contracts.IMetaDataComponent {
        binding: string;
        value: any;

        constructor(meta: Contracts.IMetaDataComponent, options: any) {
            super(meta, options);

            this.binding = meta.binding;
            this.bind();
        }

        public setValue(value: any) {
            this.value = value;

            this.form && this.form.eventManager.trigger('data:' + this.binding, value);
            this.form && this.form.eventManager.trigger('data:*', this.binding, value);
        }

        public getValue() {
            return this.value;
        }

        public destroy() {
            this.unbind();
        }

        private bind() {
            this.form && this.form.eventManager.on('data:' + this.binding, this.onDataChange, this);
        }

        private unbind() {
            this.form && this.form.eventManager.off('data:' + this.binding, this.onDataChange, this);
        }

        private onDataChange(value) {
            if(value !== this.value)
                this.value = value;
        }
    }
}