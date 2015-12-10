import assert from "power-assert";
import audioparam from "../../../src/decorators/props/audioparam";
import AudioParam from "../../../src/AudioParam";

describe("@audioparam(defaultValue: number)", () => {
  it("defines an AudioParam property", () => {
    class Foo {
      constructor() {
        this._ = {};
      }

      @audioparam(100)
      bar() {}
    }

    const foo = new Foo();

    assert(foo.bar instanceof AudioParam);
    assert(foo.bar.defaultValue === 100);

    assert.throws(() => {
      foo.bar = 0;
    }, (e) => {
      return e instanceof TypeError && /readonly property/.test(e.message);
    });
  });
});
