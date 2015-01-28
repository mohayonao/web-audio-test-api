"use strict";

var inherits = require("../../src/utils/inherits");

describe("utils/inherits", function() {
  it("(ctor: function, superCtor: function): void", function() {
    function A() {}
    function B() {}
    inherits(B, A);

    var a = new A();
    var b = new B();

    assert(a instanceof A);
    assert(b instanceof A);
  });
});
