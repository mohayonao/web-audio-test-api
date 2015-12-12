import assert from "power-assert";
import isInteger from "../../src/validators/isInteger";

describe("validators.isInteger", () => {
  describe(".name: string", () => {
    it("works", () => {
      assert(isInteger.name === "integer");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isInteger.test(-1.5) === false);
      assert(isInteger.test(-1) === true);
      assert(isInteger.test(0) === true);
      assert(isInteger.test(1) === true);
      assert(isInteger.test(1.5) === false);
      assert(isInteger.test(true) === false);
      assert(isInteger.test(false) === false);
      assert(isInteger.test("0") === false);
      assert(isInteger.test(it) === false);
      assert(isInteger.test(NaN) === false);
      assert(isInteger.test(null) === false);
    });
  });
});
