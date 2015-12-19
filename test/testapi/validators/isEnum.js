const assert = require("power-assert");
const isEnum = require("../../../src/testapi/validators/isEnum");

describe("validators.isEnum(values: any): object", () => {
  describe(".typeName: string", () => {
    it("works", () => {
      assert(isEnum([ 1, 2, 3 ]).typeName === "any[]");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isEnum([ 1, 2, 3 ]).test(1) === true);
      assert(isEnum([ 1, 2, 3 ]).test(4) === false);
    });
  });
});
