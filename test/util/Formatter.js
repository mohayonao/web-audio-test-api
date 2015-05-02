import Formatter from "../../src/util/Formatter";

class Foo {
  constructor(a, b) { this._ = a + b; }
  m1(arg1) { return arg1; }
  m2(arg1, arg2 = 0) { return arg1 + arg2; }
}

describe("Formatter", function() {
  beforeEach(function() {
    this.foo = new Foo();
  });

  describe("constructor", function() {
    it("(instance, methodName, args)", function() {
      let fmt = new Formatter(this.foo, "m1");

      assert(fmt instanceof Formatter);
    });
  });

  describe("#form", function() {
    it("getter: string", function() {
      let fmt1 = new Formatter(this.foo, "m1");

      assert(fmt1.form === "Foo#m1(arg1)");

      let fmt2 = new Formatter(this.foo, "m2", [ "arg1", "arg2" ]);
      assert(fmt2.form === "Foo#m2(arg1, arg2)");

      let fmt3 = new Formatter(this.foo, "value");
      assert(fmt3.form === "Foo");

      let fmt4 = new Formatter(this.foo, "constructor");
      assert(fmt4.form === "new Foo(a, b)");

      let fmt5 = new Formatter(this.foo, "constructor", []);
      assert(fmt5.form === "new Foo()");
    });
  });

  describe("#plain", function() {
    it("(strings, ...values): string", function() {
      let fmt = new Formatter(this.foo, "m1");

      assert(fmt.plain `
        1
        ${2}
        3 ${4}
        5
      ` === "1 2 3 4 5");
    });
  });

  describe("#butGot", function() {
    it("(value: any, name: string, type: string): string", function() {
      let fmt = new Formatter(this.foo, "m1");

      assert(fmt.butGot(10, "value", "boolean") === '"value" should be a boolean, but got: 10');
    });
  });
});
