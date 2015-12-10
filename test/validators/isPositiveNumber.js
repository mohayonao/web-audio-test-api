import assert from "power-assert";
import isPositiveNumber from "../../src/validators/isPositiveNumber";

describe("validators.isPositiveNumber", () => {
  describe(".name: string", () => {
    it("works", () => {
      assert(isPositiveNumber.name === "positive number");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isPositiveNumber.test(-1.5) === false);
      assert(isPositiveNumber.test(-1) === false);
      assert(isPositiveNumber.test(0) === true);
      assert(isPositiveNumber.test(1) === true);
      assert(isPositiveNumber.test(1.5) === true);
      assert(isPositiveNumber.test(true) === false);
      assert(isPositiveNumber.test(false) === false);
      assert(isPositiveNumber.test("0") === false);
      assert(isPositiveNumber.test(it) === false);
      assert(isPositiveNumber.test(NaN) === false);
      assert(isPositiveNumber.test(null) === false);
      assert(isPositiveNumber.test(undefined) === false);
    });
  });
});
