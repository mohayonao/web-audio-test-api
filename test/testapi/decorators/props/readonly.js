import assert from "power-assert";
import * as props from "../../../../src/testapi/decorators/props";

describe("@props.readonly()", () => {
  it("defines a readonly property", () => {
    class Foo {
      constructor() {
        this._ = {};
      }

      @props.readonly()
      bar() {
        return "bar";
      }
    }

    const foo = new Foo();

    assert(foo.bar === "bar");
    assert.throws(() => { foo.bar = "baz"; }, TypeError);
  });
});
