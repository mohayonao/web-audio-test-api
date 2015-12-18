import assert from "power-assert";
import isNullOrInstanceOf from "../../../src/testapi/validators/isNullOrInstanceOf";

describe("validators.isNullOrInstanceOf(klass: function): object", () => {
  describe(".typeName: string", () => {
    it("works", () => {
      assert(isNullOrInstanceOf(Float32Array).typeName === "Float32Array|null");
    });
  });
  describe(".test(value: any): boolean", () => {
    it("works", () => {
      assert(isNullOrInstanceOf(Float32Array).test(null) === true);
      assert(isNullOrInstanceOf(Float32Array).test(new Float32Array()) === true);
      assert(isNullOrInstanceOf(Float32Array).test(new Uint8Array()) === false);
    });
  });
});
