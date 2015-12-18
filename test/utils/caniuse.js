const assert = require("power-assert");
const caniuse = require("../../src/utils/caniuse");

describe("utils/caniuse(expected: object, actual: object): boolean", () => {
  it("works", () => {
    assert(caniuse({ a: "10-", b: "15-" }, { a: 10, b: 15 }) === true);
    assert(caniuse({ a: "10-", b: "15-" }, { a: 10, b: 14 }) === false);
    assert(caniuse({ a: "-15", b: "-20" }, { a: 15, b: 20 }) === true);
    assert(caniuse({ a: "-15", b: "-20" }, { a: 15, b: 21 }) === false);
    assert(caniuse({ a: "10-15", b: "15-20" }, { a: 10, b: 20 }) === true);
    assert(caniuse({ a: "10-15", b: "15-20" }, { a: 16, b: 20 }) === false);
    assert(caniuse({ a: "10-15", b: "15-20" }, { a: 10, b: 14 }) === false);
    assert(caniuse({ a: "none", b: "15-20" }, { a: 15, b: 15 }) === false);
    assert(caniuse({ a: "none", b: "15-20" }, { a: Infinity, b: 15 }) === true);
    assert(caniuse({ a: "-", b: "-" }, { a: 15, b: 15 }) === false);
  });
});
