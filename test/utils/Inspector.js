"use strict";

var Inspector = require("../../src/utils/Inspector");

describe("utils/Inspector", function() {

  function Foo() {}

  describe("constructor", function() {
    it("(instance: any, methodName: string|null, argsInfo: object[])", function() {
      var inspector = new Inspector(null, "bar", []);

      assert(inspector instanceof Inspector);
    });
  });

  describe("#form", function() {
    it("get: string", function() {
      var foo = new Foo();
      var inspector = new Inspector(foo, "bar", [
        { name: "baz", type: "number" },
        { name: "qux", type: "optional boolean" },
      ]);

      assert(inspector.form === "Foo#bar(baz: number, qux: optional boolean)");
    });
  });

  describe("#validateArguments", function() {
    it("(args: any[], callback: function): void", function() {
      var foo = new Foo();
      var callback = sinon.spy();
      var validate = sinon.spy(function(value, name) {
        if (!value) {
          return name + " should be a true";
        }
      });
      var inspector = new Inspector(foo, "bar", [
        { name: "baz", type: "number" },
        { name: "qux", type: "optional boolean", validate: validate },
      ]);

      inspector.validateArguments([ 10, true ], callback);
      assert(callback.callCount === 0);
      assert(validate.callCount === 1);
      assert(validate.calledOn(foo));
      callback.reset(); validate.reset();

      inspector.validateArguments([ 20, "true" ], callback);
      assert(callback.callCount === 1);
      assert(callback.calledOn(foo));
      assert(validate.callCount === 1);
      assert(validate.calledOn(foo));
      assert(callback.args[0][0] === "the 2nd argument should be a boolean, but got: 'true'");
      callback.reset(); validate.reset();

      inspector.validateArguments([ 20, false ], callback);
      assert(callback.callCount === 1);
      assert(callback.calledOn(foo));
      assert(validate.callCount === 1);
      assert(validate.calledOn(foo));
      assert(callback.args[0][0] === "qux should be a true");
      callback.reset(); validate.reset();
    });
  });

  describe("#assert", function() {
    it("(test: boolean, callback: function): void", function() {
      var foo = new Foo();
      var callback = sinon.spy();
      var inspector = new Inspector(foo, "bar", [
        { name: "baz", type: "number" },
        { name: "qux", type: "optional boolean" },
      ]);

      inspector.assert(true, callback);
      assert(callback.callCount === 0);
      callback.reset();

      inspector.assert(false, callback);
      assert(callback.callCount === 1);
      assert(callback.calledOn(foo));
      callback.reset();
    });
  });

});
