import Inspector from "../../src/util/Inspector";
import Formatter from "../../src/util/Formatter";

class Foo {
  constructor(a, b) { this._ = a + b; }
  m1(arg1) { return arg1; }
  m2(arg1, arg2 = 0) { return arg1 + arg2; }
}

describe("Inspector", function() {
  beforeEach(function() {
    this.foo = new Foo();
    this.passed = false;
  });

  describe("constructor", function() {
    it("(instance: object)", function() {
      let inspector = new Inspector(this.foo);

      assert(inspector instanceof Inspector);
    });
  });

  describe("#describe", function() {
    it("(methodName: string, callback: function): void", function() {
      let inspector = new Inspector(this.foo);

      inspector.describe("m1", ($assert) => {
        $assert(true);
        this.passed = true;
      });

      assert(this.passed === true);
    });
    it("(methodName: string, args: string[], callback: function): void", function() {
      let inspector = new Inspector(this.foo);

      inspector.describe("m2", [ "arg1", "arg2" ], ($assert) => {
        $assert(false, (fmt) => {
          assert(fmt instanceof Formatter);
          assert(fmt.instance === this.foo);
          assert(fmt.methodName === "m2");
          assert.deepEqual(fmt.args, [ "arg1", "arg2" ]);
          assert.throws(() => {
            $assert.throwReadOnlyTypeError();
          }, (e) => {
            return e instanceof TypeError && /readonly/.test(e.message);
          });
          this.passed = true;
        });
      });

      assert(this.passed === true);
    });
  });
});
