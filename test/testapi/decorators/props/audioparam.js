import assert from "power-assert";
import AudioParam from "../../../../src/AudioParam";
import * as props from "../../../../src/testapi/decorators/props";

describe("@props.audioparam(defaultValue: number)", () => {
  it("defines an AudioParam property", () => {
    class Foo {
      constructor() {
        this._ = {};
      }

      @props.audioparam(100)
      bar() {}
    }

    const foo = new Foo();

    assert(foo.bar instanceof AudioParam);
    assert(foo.bar.defaultValue === 100);
    assert.throws(() => { foo.bar = 0; }, TypeError);
  });
});
