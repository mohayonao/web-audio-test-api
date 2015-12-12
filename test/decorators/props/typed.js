import assert from "power-assert";
import * as props from "../../../src/decorators/props";

describe("@props.typed(validator: object, defaultValue: any)", () => {
  it("defines a callback property", () => {
    const isNumber = { typeName: "number", test: value => typeof value === "number" };

    class Foo {
      constructor() {
        this._ = {};
      }

      @props.typed(isNumber, 0)
      bar() {}
    }

    const foo = new Foo();

    assert(foo.bar === 0);
    assert.doesNotThrow(() => { foo.bar = 10; });
    assert(foo.bar === 10);
    assert.throws(() => { foo.bar = "not a number"; }, TypeError);
  });
});
