import {FilterCollection} from "../../../app/collections/filterCollection";
import {DictionaryBase} from "../../../app/models/components/base/dictionary";
import {expect} from "chai";

describe('Collection: FilterCollection', function () {
	it('should support "count"', function () {
		const element1 = new DictionaryBase({
			name: 'e1', binding: '', dictionary: 'dic1', value: null, filters: []
		}, {});

		const element2 = new DictionaryBase({
			name: 'e2', binding: '', dictionary: 'dic1', value: null, filters: [{by: 'id', comparator: 'eq', val: 'a'}]
		}, {});

		expect((new FilterCollection(element1)).count()).to.equal(0);
		expect((new FilterCollection(element2)).count()).to.equal(1);
	});
});
