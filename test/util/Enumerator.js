import Enumerator from "../../src/util/Enumerator";

describe("Enumerator", function() {
  describe("constructor", function() {
    it("([list: any[]])", function() {
      let enumerator = new Enumerator();

      assert(enumerator instanceof Enumerator);
    });
  });

  describe("#contains", function() {
    it("(value: any): boolean", function() {
      let enumerator = new Enumerator([ "foo", "bar", "baz" ]);

      assert(enumerator.contains("baz") === true);
      assert(enumerator.contains("qux") === false);
    });
  });

  describe("#toString", function() {
    it("(): string", function() {
      let enumerator = new Enumerator([ "foo", "bar", "baz" ]);

      assert(enumerator.toString() === "enum { foo, bar, baz }");
    });
  });
});
