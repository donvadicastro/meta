/// <reference path="../../../../typings/globals/jasmine/index.d.ts" />

import {FilterCollection} from "../../../app/collections/filterCollection";
import {DictionaryBase} from "../../../app/models/components/base/dictionary";

describe('Collection: FilterCollection', function () {
	it('should support "count"', function () {
		var element1 = new DictionaryBase({
			name: 'e1', binding: '', dictionary: 'dic1', value: null, filters: []
		}, {});

		var element2 = new DictionaryBase({
			name: 'e2', binding: '', dictionary: 'dic1', value: null, filters: [{by: 'id', val: 'a'}]
		}, {});

		expect((new FilterCollection(element1)).count()).toBe(0);
		expect((new FilterCollection(element2)).count()).toBe(1);
	});
});