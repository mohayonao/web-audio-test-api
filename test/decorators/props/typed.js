import assert from "power-assert";
import typed from "../../../src/decorators/props/typed";

describe("@typed(defaultValue: any, validator: function, typeName: string)", () => {
  it("defines a callback property", () => {
    class Foo {
      constructor() {
        this._ = {};
      }

      @typed(0, _ => typeof _ === "number", "number")
      bar() {}
    }

    const foo = new Foo();

    assert(foo.bar === 0);
    assert.doesNotThrow(() => {
      foo.bar = 10;
    });
    assert(foo.bar === 10);
    assert.throws(() => {
      foo.bar = "not a number";
    }, (e) => {
      return e instanceof TypeError && /should be a number/.test(e.message);
    });
  });
});
