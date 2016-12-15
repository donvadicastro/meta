/// <reference path="../../../typings/globals/jasmine/index.d.ts" />

export default function toEqualData(util: jasmine.MatchersUtil, customEqualityTesters: Array<jasmine.CustomEqualityTester>): jasmine.CustomMatcher {
    return {
        compare: function (actual: any, expected: any): jasmine.CustomMatcherResult {
            return {
                pass: JSON.stringify(actual) === JSON.stringify(expected),
                message: 'Objects are not equal'
            };
        }
    };
}