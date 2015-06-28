import assert from "power-assert";
import Formatter from "../../src/utils/Formatter";

class Foo {
  constructor(a, b) {
    this._ = a + b;
  }

  m1(arg1) {
    return arg1;
  }

  m2(arg1, arg2 = 0) {
    return arg1 + arg2;
  }
}

describe("Formatter", () => {
  let foo;

  beforeEach(() => {
    foo = new Foo();
  });

  describe("constructor", () => {
    it("(instance, methodName, args)", () => {
      let fmt = new Formatter(foo, "m1");

      assert(fmt instanceof Formatter);
    });
  });

  describe("#form", () => {
    it("getter: string", () => {
      let fmt0 = new Formatter(foo);

      assert(fmt0.form === "Foo");

      let fmt1 = new Formatter(foo, "m1");

      assert(fmt1.form === "Foo#m1(arg1)");

      let fmt2 = new Formatter(foo, "m2", [ "arg1", "arg2" ]);

      assert(fmt2.form === "Foo#m2(arg1, arg2)");

      let fmt3 = new Formatter(foo, "value");

      assert(fmt3.form === "Foo");

      let fmt4 = new Formatter(foo, "constructor");

      assert(fmt4.form === "new Foo(a, b)");

      let fmt5 = new Formatter(foo, "constructor", []);

      assert(fmt5.form === "new Foo()");
    });
  });

  describe("#plain", () => {
    it("(strings, ...values): string", () => {
      let fmt = new Formatter(foo, "m1");

      assert(fmt.plain `
        1
        ${2}
        3 ${4}
        5
      ` === "1 2 3 4 5");
    });
  });

  describe("#butGot", () => {
    it("(value: any, name: string, type: string): string", () => {
      let fmt = new Formatter(foo, "m1");

      assert(fmt.butGot(10, "value", "boolean") === '"value" should be a boolean, but got: 10');
    });
  });
});
