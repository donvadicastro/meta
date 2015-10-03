///<reference path='element.ts'/>

module MetaApp.Models.Components {
	export class ContainerBase extends ElementBase {
		private items: Array<ElementBase>;
		
		constructor(meta: any) {
			super(meta);
			
			//parse all childs and instantiate child list
			for(var i=0, len=(meta.items || []).length; i<len; i++) {
				this.items.push(new ElementBase(meta.items[i]));
			}
		}
	}
}