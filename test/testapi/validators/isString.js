import assert from "power-assert";
import isString from "../../../src/testapi/validators/isString";

describe("validators.isString", () => {
  describe(".typeName: string", () => {
    it("works", () => {
      assert(isString.typeName === "string");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isString.test(-1.5) === false);
      assert(isString.test(-1) === false);
      assert(isString.test(0) === false);
      assert(isString.test(1) === false);
      assert(isString.test(1.5) === false);
      assert(isString.test(true) === false);
      assert(isString.test(false) === false);
      assert(isString.test("0") === true);
      assert(isString.test(it) === false);
      assert(isString.test(NaN) === false);
      assert(isString.test(null) === false);
    });
  });
});
