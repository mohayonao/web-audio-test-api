import assert from "power-assert";
import typedvalue from "../../src/decorators/typedvalue";

describe("@typedvalue(defaultValue: any, validator: function, typeName: string)", () => {
  it("defines a callback property", () => {
    class Foo {
      constructor() {
        this._ = {};
      }

      @typedvalue(0, _ => typeof _ === "number", "number")
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
