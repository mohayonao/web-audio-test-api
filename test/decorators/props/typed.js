import assert from "power-assert";
import typed from "../../../src/decorators/props/typed";

describe("@typed(validator: object, defaultValue: any)", () => {
  it("defines a callback property", () => {
    const isNumber = {
      name: "number",
      test: value => typeof value === "number"
    };

    class Foo {
      constructor() {
        this._ = {};
      }

      @typed(isNumber, 0)
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
