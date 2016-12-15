import {ResourceManager} from "../../../app/managers/resourceManager";

describe('Managers: ResourceManager', function () {
	it('should support reading resource', function () {
		ResourceManager.set('key1', 'val1');
		expect('val1').toBe(ResourceManager.get('key1'));

		ResourceManager.set({key2: 'val2', key3: 'val3'});
		expect('val2').toBe(ResourceManager.get('key2'));
		expect('val3').toBe(ResourceManager.get('key3'));
	});
});