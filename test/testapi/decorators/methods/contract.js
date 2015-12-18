const assert = require("power-assert");
const methods = require("../../../../src/testapi/decorators/methods");

describe("@methods.contract({ precondition, postcondition })", () => {
  it("defines precondition/postcondition", () => {
    class Foo {
      @methods.contract({
        precondition(x) {
          if (x === 0) {
            throw new TypeError("x is 0");
          }
        },
        postcondition(y) {
          if (y % 2 === 1) {
            throw new TypeError("y is odd");
          }
        }
      })
      bar(x) {
        return x;
      }
    }

    const foo = new Foo();

    assert.doesNotThrow(() => { foo.bar(10); });
    assert.throws(() => { foo.bar(0); }, TypeError);
    assert.throws(() => { foo.bar(5); }, TypeError);
  });
});
