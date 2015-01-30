"use strict";

var pp = require("../../src/utils/pp");

describe("utils/pp", function() {
  it("(value: any): string", function() {
    var f32 = new Float32Array(100);
    var i16 = new Int16Array(100);
    var Obj = function() {};

    assert(pp(null) === "null");
    assert(pp(undefined) === "undefined");
    assert(pp(true) === "true");
    assert(pp(false) === "false");
    assert(pp(10000) === "10000");
    assert(pp(100.5) === "100.5");
    assert(pp("abc") === "'abc'");
    assert(pp([ 1, [ 2, 3 ] ]) === "[ 1, [ 2, 3 ] ]");
    assert(pp({ a: 1, b: { c: [ 2, 3 ] } }), "{ a: 1, b: { c: [ 2, 3 ] } }");
    assert(pp(f32) === "a Float32Array");
    assert(pp(i16) === "an Int16Array");
    assert(pp(new Obj()) === "an Object");
  });
});
