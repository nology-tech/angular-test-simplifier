"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var index_1 = require("../index");
describe('Initial Test', function () {
    beforeEach(function () { return testing_1.TestBed.configureTestingModule({}); });
    it('should greet', function () {
        expect(index_1.greet('World')).toBe('Hello World');
    });
});
