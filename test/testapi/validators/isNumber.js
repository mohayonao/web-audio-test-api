import assert from "power-assert";
import isNumber from "../../../src/testapi/validators/isNumber";

describe("validators.isNumber", () => {
  describe(".typeName: string", () => {
    it("works", () => {
      assert(isNumber.typeName === "number");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isNumber.test(-1.5) === true);
      assert(isNumber.test(-1) === true);
      assert(isNumber.test(0) === true);
      assert(isNumber.test(1) === true);
      assert(isNumber.test(1.5) === true);
      assert(isNumber.test(true) === false);
      assert(isNumber.test(false) === false);
      assert(isNumber.test("0") === false);
      assert(isNumber.test(it) === false);
      assert(isNumber.test(NaN) === false);
      assert(isNumber.test(null) === false);
    });
  });
});
