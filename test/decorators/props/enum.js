import assert from "power-assert";
import * as props from "../../../src/decorators/props";

describe("@props.enum(values: any[], [ defaultValue: any ])", () => {
  it("defines an enum property", () => {
    class Foo {
      constructor() {
        this._ = {};
      }

      @props.enum([ "a", "b", "c" ])
      bar() {}
    }

    const foo = new Foo();

    assert(foo.bar === "a");
    assert.doesNotThrow(() => {
      foo.bar = "c";
    });
    assert(foo.bar === "c");
    assert.throws(() => {
      foo.bar = "d";
    }, (e) => {
      return e instanceof TypeError && /should be an enum/.test(e.message);
    });
  });
});
