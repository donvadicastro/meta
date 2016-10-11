import {FilterCollection} from "../../../app/collections/filterCollection";

describe('Collection: FilterCollection', function () {
	it('should support "count"', function () {
		expect(new FilterCollection(null, []).count()).toBe(0);
		expect(new FilterCollection(null, [{by: 'id', val: 'a'}]).count()).toBe(1);
	});
});