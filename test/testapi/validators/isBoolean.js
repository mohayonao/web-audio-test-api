import assert from "power-assert";
import isBoolean from "../../../src/testapi/validators/isBoolean";

describe("validators.isBoolean", () => {
  describe(".typeName: string", () => {
    it("works", () => {
      assert(isBoolean.typeName === "boolean");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isBoolean.test(-1.5) === false);
      assert(isBoolean.test(-1) === false);
      assert(isBoolean.test(0) === false);
      assert(isBoolean.test(1) === false);
      assert(isBoolean.test(1.5) === false);
      assert(isBoolean.test(true) === true);
      assert(isBoolean.test(false) === true);
      assert(isBoolean.test("0") === false);
      assert(isBoolean.test(it) === false);
      assert(isBoolean.test(NaN) === false);
      assert(isBoolean.test(null) === false);
    });
  });
});
