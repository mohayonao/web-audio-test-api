import * as util from "../../src/util/";

describe("util", function() {
  let pkg = require("../../package.json");
  let bower = require("../../bower.json");

  describe("article", function() {
    it("(str: string): string", function() {
      assert(util.article("Apple") === "an");
      assert(util.article("IceCream") === "an");
      assert(util.article("Ugli") === "an");
      assert(util.article("Elderberry") === "an");
      assert(util.article("Orange") === "an");
      assert(util.article("Banana") === "a");
      assert(util.article("Ringo") === "a");
    });
  });

  describe("defaults", function() {
    it("(value: any, defaultValue: any): any", function() {
      assert(util.defaults(0, 1) === 0);
      assert(util.defaults(1, 2) === 1);
      assert(util.defaults(undefined, 0) === 0);
      assert(util.defaults(undefined, 1) === 1);
    });
  });

  describe("getAPIVersion", function() {
    it("(): string", function() {
      assert(util.getAPIVersion() === pkg.version);
      assert(util.getAPIVersion() === bower.version);
    });
  });

  describe("isBoolean", function() {
    it("(value: any): boolean", function() {
      assert(util.isBoolean(-1.5) === false);
      assert(util.isBoolean(-1) === false);
      assert(util.isBoolean(0) === false);
      assert(util.isBoolean(1) === false);
      assert(util.isBoolean(1.5) === false);
      assert(util.isBoolean(true) === true);
      assert(util.isBoolean(false) === true);
      assert(util.isBoolean("0") === false);
      assert(util.isBoolean(it) === false);
      assert(util.isBoolean(NaN) === false);
      assert(util.isBoolean(null) === false);
      assert(util.isBoolean(undefined) === false);
    });
  });

  describe("isFunction", function() {
    it("(value: any): boolean", function() {
      assert(util.isFunction(-1.5) === false);
      assert(util.isFunction(-1) === false);
      assert(util.isFunction(0) === false);
      assert(util.isFunction(1) === false);
      assert(util.isFunction(1.5) === false);
      assert(util.isFunction(true) === false);
      assert(util.isFunction(false) === false);
      assert(util.isFunction("0") === false);
      assert(util.isFunction(it) === true);
      assert(util.isFunction(NaN) === false);
      assert(util.isFunction(null) === false);
      assert(util.isFunction(undefined) === false);
    });
  });

  describe("isInstanceOf", function() {
    it("(value: any, klass: function): boolean", function() {
      function A() {}
      function B() {}

      assert(util.isInstanceOf(new A(), A) === true);
      assert(util.isInstanceOf(new B(), A) === false);
      assert(util.isInstanceOf(null, A) === false);
    });
  });

  describe("isInteger", function() {
    it("(value: any): boolean", function() {
      assert(util.isInteger(-1.5) === false);
      assert(util.isInteger(-1) === true);
      assert(util.isInteger(0) === true);
      assert(util.isInteger(1) === true);
      assert(util.isInteger(1.5) === false);
      assert(util.isInteger(true) === false);
      assert(util.isInteger(false) === false);
      assert(util.isInteger("0") === false);
      assert(util.isInteger(it) === false);
      assert(util.isInteger(NaN) === false);
      assert(util.isInteger(null) === false);
      assert(util.isInteger(undefined) === false);
    });
  });

  describe("isNullOrFunction", function() {
    it("(value: any): boolean", function() {
      assert(util.isNullOrFunction(-1.5) === false);
      assert(util.isNullOrFunction(-1) === false);
      assert(util.isNullOrFunction(0) === false);
      assert(util.isNullOrFunction(1) === false);
      assert(util.isNullOrFunction(1.5) === false);
      assert(util.isNullOrFunction(true) === false);
      assert(util.isNullOrFunction(false) === false);
      assert(util.isNullOrFunction("0") === false);
      assert(util.isNullOrFunction(it) === true);
      assert(util.isNullOrFunction(NaN) === false);
      assert(util.isNullOrFunction(null) === true);
      assert(util.isNullOrFunction(undefined) === false);
    });
  });

  describe("isNullOrInstanceOf", function() {
    it("(value: any, klass: function): boolean", function() {
      function A() {}
      function B() {}

      assert(util.isNullOrInstanceOf(new A(), A) === true);
      assert(util.isNullOrInstanceOf(new B(), A) === false);
      assert(util.isNullOrInstanceOf(null, A) === true);
    });
  });

  describe("isNumber", function() {
    it("(value: any): boolean", function() {
      assert(util.isNumber(-1.5) === true);
      assert(util.isNumber(-1) === true);
      assert(util.isNumber(0) === true);
      assert(util.isNumber(1) === true);
      assert(util.isNumber(1.5) === true);
      assert(util.isNumber(true) === false);
      assert(util.isNumber(false) === false);
      assert(util.isNumber("0") === false);
      assert(util.isNumber(it) === false);
      assert(util.isNumber(NaN) === false);
      assert(util.isNumber(null) === false);
      assert(util.isNumber(undefined) === false);
    });
  });

  describe("isPositiveInteger", function() {
    it("(value: any): boolean", function() {
      assert(util.isPositiveInteger(-1.5) === false);
      assert(util.isPositiveInteger(-1) === false);
      assert(util.isPositiveInteger(0) === true);
      assert(util.isPositiveInteger(1) === true);
      assert(util.isPositiveInteger(1.5) === false);
      assert(util.isPositiveInteger(true) === false);
      assert(util.isPositiveInteger(false) === false);
      assert(util.isPositiveInteger("0") === false);
      assert(util.isPositiveInteger(it) === false);
      assert(util.isPositiveInteger(NaN) === false);
      assert(util.isPositiveInteger(null) === false);
      assert(util.isPositiveInteger(undefined) === false);
    });
  });

  describe("isPositiveNumber", function() {
    it("(value: any): boolean", function() {
      assert(util.isPositiveNumber(-1.5) === false);
      assert(util.isPositiveNumber(-1) === false);
      assert(util.isPositiveNumber(0) === true);
      assert(util.isPositiveNumber(1) === true);
      assert(util.isPositiveNumber(1.5) === true);
      assert(util.isPositiveNumber(true) === false);
      assert(util.isPositiveNumber(false) === false);
      assert(util.isPositiveNumber("0") === false);
      assert(util.isPositiveNumber(it) === false);
      assert(util.isPositiveNumber(NaN) === false);
      assert(util.isPositiveNumber(null) === false);
      assert(util.isPositiveNumber(undefined) === false);
    });
  });

  describe("isString", function() {
    it("(value: any): boolean", function() {
      assert(util.isString(-1.5) === false);
      assert(util.isString(-1) === false);
      assert(util.isString(0) === false);
      assert(util.isString(1) === false);
      assert(util.isString(1.5) === false);
      assert(util.isString(true) === false);
      assert(util.isString(false) === false);
      assert(util.isString("0") === true);
      assert(util.isString(it) === false);
      assert(util.isString(NaN) === false);
      assert(util.isString(null) === false);
      assert(util.isString(undefined) === false);
    });
  });

  describe("name", function() {
    it("(obj: object): string", function() {
      assert(util.name({ $name: "name" }) === "name");
      assert(util.name({ $name: "name", $id: "id" }) === "name#id");
    });
  });

  describe("pp", function() {
    it("(value: any): string", function() {
      var f32 = new Float32Array(100);
      var i16 = new Int16Array(100);

      assert(util.pp(null) === "null");
      assert(util.pp(undefined) === "undefined");
      assert(util.pp(true) === "true");
      assert(util.pp(false) === "false");
      assert(util.pp(10000) === "10000");
      assert(util.pp(100.5) === "100.5");
      assert(util.pp("abc") === "'abc'");
      assert(util.pp([ 1, [ 2, 3 ] ]) === "[ 1, [ 2, 3 ] ]");
      assert(util.pp({ a: 1, b: { c: [ 2, 3 ] } }), "{ a: 1, b: { c: [ 2, 3 ] } }");
      assert(util.pp(f32) === "a Float32Array");
      assert(util.pp(i16) === "an Int16Array");
    });
  });

  describe("toMicroseconds", function() {
    it("(time: number|string): number", function() {
      assert(util.toMicroseconds(1.5) === 1500000);
      assert(util.toMicroseconds(NaN) === 0);
      assert(util.toMicroseconds("00:00.250") === 250000);
      assert(util.toMicroseconds("00:01.250") === 1250000);
      assert(util.toMicroseconds("01:01.250") === 61250000);
      assert(util.toMicroseconds(null) === 0);
    });
  });

  describe("toSeconds", function() {
    it("(time: number|string): number", function() {
      assert(util.toSeconds(1.500) === 1.500);
      assert(util.toSeconds(NaN) === 0);
      assert(util.toSeconds("00:00.250") === 0.250);
      assert(util.toSeconds("00:01.250") === 1.250);
      assert(util.toSeconds("01:01.250") === 61.250);
      assert(util.toSeconds(null) === 0);
    });
  });
});
