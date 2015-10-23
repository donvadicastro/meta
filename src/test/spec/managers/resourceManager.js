describe('Managers: ResourceManager', function () {
	it('should support reading resource', function () {
		var mng = MetaApp.Managers.ResourceManager;

		mng.set('key1', 'val1');
		expect('val1').toBe(mng.get('key1'));

		mng.set({key2: 'val2', key3: 'val3'});
		expect('val2').toBe(mng.get('key2'));
		expect('val3').toBe(mng.get('key3'));
	});
});