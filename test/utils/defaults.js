"use strict";

var defaults = require("../../src/utils/defaults");

describe("utils/defaults", function() {
  it("(value: any, defaultValue: any): any", function() {
    assert(defaults(0, 1) === 0);
    assert(defaults(1, 2) === 1);
    assert(defaults(undefined, 0) === 0);
    assert(defaults(undefined, 1) === 1);
  });
});
