import inLaws from "../../src/utils/inLaws";

describe("inLaws", () => {
  it("(superClass: Class): Class", () => {
    class Foo {
      constructor() {
        throw new Error("Illegal constructor");
      }
    }

    class Bar1 extends Foo {}

    class Bar2 extends inLaws(Foo) {}

    assert.throws(() => {
      return new Bar1();
    }, (e) => {
      return e instanceof Error && e.message === "Illegal constructor";
    });

    assert.doesNotThrow(() => {
      return new Bar2();
    });
  });
});
