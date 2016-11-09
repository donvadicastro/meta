/// <reference path="../../../typings/globals/jasmine/index.d.ts" />
"use strict";
function toEqualData(util, customEqualityTesters) {
    return {
        compare: function (actual, expected) {
            return {
                pass: JSON.stringify(actual) === JSON.stringify(expected),
                message: 'Objects are not equal'
            };
        }
    };
}
exports.__esModule = true;
exports["default"] = toEqualData;
//# sourceMappingURL=toEqualData.js.map