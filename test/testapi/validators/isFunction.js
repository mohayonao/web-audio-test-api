import assert from "power-assert";
import isFunction from "../../../src/testapi/validators/isFunction";

describe("validators.isFunction", () => {
  describe(".typeName: string", () => {
    it("works", () => {
      assert(isFunction.typeName === "function");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isFunction.test(-1.5) === false);
      assert(isFunction.test(-1) === false);
      assert(isFunction.test(0) === false);
      assert(isFunction.test(1) === false);
      assert(isFunction.test(1.5) === false);
      assert(isFunction.test(true) === false);
      assert(isFunction.test(false) === false);
      assert(isFunction.test("0") === false);
      assert(isFunction.test(it) === true);
      assert(isFunction.test(NaN) === false);
      assert(isFunction.test(null) === false);
    });
  });
});
