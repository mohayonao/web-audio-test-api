"use strict";

var formatter = require("../../src/utils/formatter");

describe("utils/formatter", function() {
  describe("methodForm", function() {
    it("(instance: any, methodName: string, argsInfo: object[]): string", function() {
      function Foo() {}
      function Bar() {}

      var msg;
      var foo = new Foo();
      var bar = new Bar();

      msg = formatter.methodForm(foo, "method", [
        { name: "a", type: "string" },
        { name: "b", type: "string" },
        { name: "c", type: "optional string" },
      ]);

      assert(msg === "Foo#method(a: string, b: string, c: optional string)");

      msg = formatter.methodForm(bar, null, [
        { name: "a", type: "string" },
        { name: "b", type: "string" },
        { name: "c", type: "optional string" },
      ]);

      assert(msg === "Bar(a: string, b: string, c: optional string)");

      msg = formatter.methodForm(null, "method", [
        { name: "a", type: "string" },
        { name: "b", type: "string" },
        { name: "c", type: "optional string" },
      ]);

      assert(msg === "method(a: string, b: string, c: optional string)");
    });
  });
  describe("shouldBeButGot", function() {
    it("(type: string, value: any): string", function() {
      var msg;

      msg = formatter.shouldBeButGot("string", 10);

      assert(msg === "should be a string, but got: 10");
    });
  });
});
