const assert = require("power-assert");
const toS = require("../../src/utils/toS");

describe("utils/toS(value: any): string", () => {
  it("works", () => {
    let f32 = new Float32Array(100);
    let i16 = new Int16Array(100);

    assert(toS(null) === "null");
    assert(toS(undefined) === "undefined");
    assert(toS(true) === "true");
    assert(toS(false) === "false");
    assert(toS(10000) === "10000");
    assert(toS(100.5) === "100.5");
    assert(toS("abc") === "'abc'");
    assert(toS([ 1, [ 2, 3 ] ]) === "[ 1, [ 2, 3 ] ]");
    assert(toS({ a: 1, b: { c: [ 2, 3 ] } }), "{ a: 1, b: { c: [ 2, 3 ] } }");
    assert(toS(f32) === "a Float32Array");
    assert(toS(i16) === "a Int16Array");
    assert(toS({ constructor: { name: "" } }) === "a Object");
  });
});
