import assert from "power-assert";
import _eum from "../../../src/decorators/props/enum";

describe("@props.enum(values: any[], [ defaultValue: any ])", () => {
  it("defines an enum property", () => {
    class Foo {
      constructor() {
        this._ = {};
      }

      @_eum([ "a", "b", "c" ])
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
