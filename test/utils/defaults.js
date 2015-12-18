const assert = require("power-assert");
const defaults = require("../../src/utils/defaults");

describe("utils/defaults(value: any, defaultValue: any): any", () => {
  it("works", () => {
    assert(defaults(0, 1) === 0);
    assert(defaults(1, 2) === 1);
    assert(defaults(undefined, 0) === 0);
    assert(defaults(undefined, 1) === 1);
  });
});
