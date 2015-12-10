import assert from "power-assert";
import isNullOrInstanceOf from "../../src/validators/isNullOrInstanceOf";

describe("validators.isNullOrInstanceOf(klass: function): object", () => {
  describe(".name: string", () => {
    it("works", () => {
      assert(isNullOrInstanceOf(Float32Array).name === "Float32Array");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isNullOrInstanceOf(Float32Array).test(null) === true);
      assert(isNullOrInstanceOf(Float32Array).test(new Float32Array()) === true);
      assert(isNullOrInstanceOf(Float32Array).test(new Uint8Array()) === false);
      assert(isNullOrInstanceOf(Float32Array).test(undefined) === false);
    });
  });
});
