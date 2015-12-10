import assert from "power-assert";
import on from "../../../src/decorators/props/on";

describe("@on()", () => {
  it("defines a callback property", () => {
    class Foo {
      constructor() {
        this._ = {};
      }

      @on("end")
      onend() {}
    }

    const foo = new Foo();

    assert(foo.onend === null);
    assert.doesNotThrow(() => {
      foo.onend = it;
    });
    assert(foo.onend === it);
    assert.throws(() => {
      foo.onend = "not a function";
    }, (e) => {
      return e instanceof TypeError && /should be a function/.test(e.message);
    });
  });
});
