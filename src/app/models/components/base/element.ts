module MetaApp.Models.Components {
	export class ElementBase {
		private name: string;
		private type: string = 'field';
		
		constructor(meta: any) {
			
		}
		
		public validate(): boolean {
			return true;
		}
	}
}