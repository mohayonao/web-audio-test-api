import assert from "power-assert";
import isInstanceOf from "../../src/validators/isInstanceOf";

describe("validators.isInstanceOf(klass: function): object", () => {
  describe(".typeName: string", () => {
    it("works", () => {
      assert(isInstanceOf(Float32Array).typeName === "Float32Array");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isInstanceOf(Float32Array).test(null) === false);
      assert(isInstanceOf(Float32Array).test(new Float32Array()) === true);
      assert(isInstanceOf(Float32Array).test(new Uint8Array()) === false);
    });
  });
});
