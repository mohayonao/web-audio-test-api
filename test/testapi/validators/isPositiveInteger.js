import assert from "power-assert";
import isPositiveInteger from "../../../src/testapi/validators/isPositiveInteger";

describe("validators.isPositiveInteger", () => {
  describe(".typeName: string", () => {
    it("works", () => {
      assert(isPositiveInteger.typeName === "number");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isPositiveInteger.test(-1.5) === false);
      assert(isPositiveInteger.test(-1) === false);
      assert(isPositiveInteger.test(0) === true);
      assert(isPositiveInteger.test(1) === true);
      assert(isPositiveInteger.test(1.5) === false);
      assert(isPositiveInteger.test(true) === false);
      assert(isPositiveInteger.test(false) === false);
      assert(isPositiveInteger.test("0") === false);
      assert(isPositiveInteger.test(it) === false);
      assert(isPositiveInteger.test(NaN) === false);
      assert(isPositiveInteger.test(null) === false);
    });
  });
});
