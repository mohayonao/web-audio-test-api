import assert from "power-assert";
import isPositiveInteger from "../../src/validators/isPositiveInteger";

describe("validators.isPositiveInteger", () => {
  describe(".name: string", () => {
    it("works", () => {
      assert(isPositiveInteger.name === "positive integer");
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
