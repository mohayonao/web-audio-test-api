const assert = require("power-assert");
const isPositiveNumber = require("../../../src/testapi/validators/isPositiveNumber");

describe("validators.isPositiveNumber", () => {
  describe(".typeName: string", () => {
    it("works", () => {
      assert(isPositiveNumber.typeName === "number");
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
    });
  });
});
