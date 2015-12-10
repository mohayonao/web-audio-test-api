import assert from "power-assert";
import readonly from "../../src/decorators/readonly";

describe("@readonly()", () => {
  it("defines a readonly property", () => {
    class Foo {
      constructor() {
        this._ = {};
      }

      @readonly()
      bar() {
        return "bar";
      }
    }

    const foo = new Foo();

    assert(foo.bar === "bar");
    assert.throws(() => {
      foo.bar = "baz";
    }, (e) => {
      return e instanceof TypeError && /readonly property/.test(e.message);
    });
  });
});
