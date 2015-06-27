import assert from "power-assert";
import Enumerator from "../../src/util/Enumerator";

describe("Enumerator", () => {
  describe("constructor", () => {
    it("([list: any[]])", () => {
      let enumerator = new Enumerator();

      assert(enumerator instanceof Enumerator);
    });
  });

  describe("#contains", () => {
    it("(value: any): boolean", () => {
      let enumerator = new Enumerator([ "foo", "bar", "baz" ]);

      assert(enumerator.contains("baz") === true);
      assert(enumerator.contains("qux") === false);
    });
  });

  describe("#toString", () => {
    it("(): string", () => {
      let enumerator = new Enumerator([ "foo", "bar", "baz" ]);

      assert(enumerator.toString() === "enum { foo, bar, baz }");
    });
  });
});
