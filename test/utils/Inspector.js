import assert from "power-assert";
import Inspector from "../../src/utils/Inspector";
import Formatter from "../../src/utils/Formatter";

class Foo {
  constructor(a, b) {
    this._ = a + b;
  }

  m1(arg1) {
    return arg1;
  }

  m2(arg1, arg2 = 0) {
    return arg1 + arg2;
  }
}

describe("Inspector", () => {
  let foo, passed;

  beforeEach(() => {
    foo = new Foo();
    passed = false;
  });

  describe("constructor", () => {
    it("(instance: object)", () => {
      let inspector = new Inspector(foo);

      assert(inspector instanceof Inspector);
    });
  });

  describe("#describe", () => {
    it("(methodName: string, callback: function): void", () => {
      let inspector = new Inspector(foo);

      inspector.describe("m1", ($assert) => {
        $assert(true);
        passed = true;
      });

      assert(passed === true);
    });
    it("(methodName: string, args: string[], callback: function): void", () => {
      let inspector = new Inspector(foo);

      inspector.describe("m2", [ "arg1", "arg2" ], ($assert) => {
        $assert(false, (fmt) => {
          assert(fmt instanceof Formatter);
          assert(fmt.instance === foo);
          assert(fmt.methodName === "m2");
          assert.deepEqual(fmt.args, [ "arg1", "arg2" ]);
          assert.throws(() => {
            $assert.throwReadOnlyTypeError();
          }, (e) => {
            return e instanceof TypeError && /readonly/.test(e.message);
          });
          passed = true;
        });
      });

      assert(passed === true);
    });
  });
});
