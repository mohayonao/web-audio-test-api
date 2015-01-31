"use strict";

var defineAttribute = require("../../src/utils/defineAttribute");

describe("utils/defineAttribute", function() {

  function Foo() {}

  describe("(instance: any, name: string, type: string, value: any, callback: function): void", function() {
    it("value: number", function() {
      var foo = new Foo();
      var callback = sinon.spy();

      defineAttribute(foo, "value", "number", 100, callback);

      assert(foo.value === 100);
      assert(callback.callCount === 0);
      callback.reset();

      foo.value = 50;
      assert(foo.value === 50);
      assert(callback.callCount === 0);
      callback.reset();

      foo.value = "25";
      assert(foo.value === 50);
      assert(callback.callCount === 1);
      assert(callback.calledOn(foo));
      assert(callback.args[0][0] === "value should be a number, but got: '25'");
      callback.reset();
    });
    it("value: readonly", function() {
      var foo = new Foo();
      var callback = sinon.spy();

      defineAttribute(foo, "value", "readonly", 100, callback);

      assert(foo.value === 100);
      assert(callback.callCount === 0);
      callback.reset();

      foo.value = 50;
      assert(foo.value === 100);
      assert(callback.callCount === 1);
      assert(callback.calledOn(foo));
      assert(callback.args[0][0] === "value is readonly");
      callback.reset();
    });
    it("value(function): number", function() {
      var foo = new Foo();
      var callback = sinon.spy();

      defineAttribute(foo, "value", "number", function() {
        return 100;
      }, callback);

      assert(foo.value === 100);
      assert(callback.callCount === 0);
      callback.reset();

      foo.value = 50;
      assert(foo.value === 100);
      assert(callback.callCount === 1);
      assert(callback.calledOn(foo));
      assert(callback.args[0][0] === "value is readonly");
      callback.reset();
    });
  });
});
