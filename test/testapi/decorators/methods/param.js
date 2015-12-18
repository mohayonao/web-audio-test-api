import assert from "power-assert";
import * as methods from "../../../../src/testapi/decorators/methods";

describe("@methods.param(name: string, validator: object)", () => {
  it("defines function parameters", () => {
    const isNumber = { typeName: "number", test: value => typeof value === "number" };
    const isString = { typeName: "string", test: value => typeof value === "string" };

    class Foo {
      constructor() {
        this._ = {};
      }

      @methods.param("x", isNumber)
      @methods.param("y", isNumber)
      @methods.param("[ z ]", isString)
      bar() {}
    }

    const foo = new Foo();

    assert.doesNotThrow(() => { foo.bar(10, 20, "30"); });
    assert.doesNotThrow(() => { foo.bar(10, 20); });
    assert.throws(() => { foo.bar(10); }, TypeError);
    assert.throws(() => { foo.bar(10, "20"); }, TypeError);
    assert.throws(() => { foo.bar(10, 20, 30); }, TypeError);
  });
});
