import assert from "power-assert";
import utils from "../../src/utils/";

/* eslint no-undefined: 0 */

describe("utils", () => {
  let pkg = require("../../package.json");

  describe("appendIfNotExists", () => {
    it("(list: any[], value: any): void", () => {
      let list = [];

      utils.appendIfNotExists(list, 1);
      utils.appendIfNotExists(list, 2);
      utils.appendIfNotExists(list, 1);
      utils.appendIfNotExists(list, 2);
      utils.appendIfNotExists(list, 3);

      assert.deepEqual(list, [ 1, 2, 3 ]);
    });
  });

  describe("article", () => {
    it("(str: string): string", () => {
      assert(utils.article("AprettyPrintle") === "an");
      assert(utils.article("IceCream") === "an");
      assert(utils.article("Ugli") === "an");
      assert(utils.article("Elderberry") === "an");
      assert(utils.article("Orange") === "an");
      assert(utils.article("Banana") === "a");
      assert(utils.article("Ringo") === "a");
    });
  });

  describe("countArguments", () => {
    it("(args: any[]): number", () => {
      assert(utils.countArguments([ 0, 1, 2 ]) === 3);
      assert(utils.countArguments([ 0, 1, undefined ]) === 2);
      assert(utils.countArguments([ 0, undefined, undefined ]) === 1);
      assert(utils.countArguments([ undefined, undefined, undefined ]) === 0);
      assert(utils.countArguments([ 0, undefined, 2 ]) === 3);
      assert(utils.countArguments([ undefined, 1, 2 ]) === 3);
      assert(utils.countArguments([ undefined, 1, undefined ]) === 2);
      assert(utils.countArguments([ undefined, undefined, 2 ]) === 3);
    });
  });

  describe("defaults", () => {
    it("(value: any, defaultValue: any): any", () => {
      assert(utils.defaults(0, 1) === 0);
      assert(utils.defaults(1, 2) === 1);
      assert(utils.defaults(undefined, 0) === 0);
      assert(utils.defaults(undefined, 1) === 1);
    });
  });

  describe("fill", () => {
    it("(list: any[], value: any): any[]", () => {
      let list = new Array(4);
      let result;

      assert.deepEqual(utils.fill(list, 1), [ 1, 1, 1, 1 ]);
      assert.deepEqual(utils.fill(list, i => i * 2), [ 0, 2, 4, 6 ]);

      result = utils.fill(list, () => []);

      assert.deepEqual(result, [ [], [], [], [] ]);
      assert(list === result);
      assert(result[0] !== result[1]);
      assert(result[1] !== result[2]);
      assert(result[2] !== result[3]);
    });
  });

  describe("getAPIVersion", () => {
    it("(): string", () => {
      assert(utils.getAPIVersion() === pkg.version);
    });
  });

  describe("removeIfExists", () => {
    it("(list: any[], value: any): any[]", () => {
      let list = [ 1, 2, 3, 4, 5 ];

      let result1 = utils.removeIfExists(list, 3);
      let result2 = utils.removeIfExists(list, 0);

      assert.deepEqual(list, [ 1, 2, 4, 5 ]);
      assert(result1 === 3);
      assert(result2 === null);
    });
  });

  describe("toNodeName", () => {
    it("(obj: object): string", () => {
      assert(utils.toNodeName({ $name: "name" }) === "name");
      assert(utils.toNodeName({ $name: "name", $id: "id" }) === "name#id");
    });
  });

  describe("prettyPrint", () => {
    it("(value: any): string", () => {
      let f32 = new Float32Array(100);
      let i16 = new Int16Array(100);

      assert(utils.prettyPrint(null) === "null");
      assert(utils.prettyPrint(undefined) === "undefined");
      assert(utils.prettyPrint(true) === "true");
      assert(utils.prettyPrint(false) === "false");
      assert(utils.prettyPrint(10000) === "10000");
      assert(utils.prettyPrint(100.5) === "100.5");
      assert(utils.prettyPrint("abc") === "'abc'");
      assert(utils.prettyPrint([ 1, [ 2, 3 ] ]) === "[ 1, [ 2, 3 ] ]");
      assert(utils.prettyPrint({ a: 1, b: { c: [ 2, 3 ] } }), "{ a: 1, b: { c: [ 2, 3 ] } }");
      assert(utils.prettyPrint(f32) === "a Float32Array");
      assert(utils.prettyPrint(i16) === "an Int16Array");
      assert(utils.prettyPrint({ constructor: { name: "" } }) === "an Object");
    });
  });

  describe("toMicroseconds", () => {
    it("(time: number|string): number", () => {
      assert(utils.toMicroseconds(1.5) === 1500000);
      assert(utils.toMicroseconds(NaN) === 0);
      assert(utils.toMicroseconds("00:00.250") === 250000);
      assert(utils.toMicroseconds("00:01.250") === 1250000);
      assert(utils.toMicroseconds("01:01.250") === 61250000);
      assert(utils.toMicroseconds(null) === 0);
    });
  });

  describe("toSeconds", () => {
    it("(time: number|string): number", () => {
      assert(utils.toSeconds(1.500) === 1.500);
      assert(utils.toSeconds(NaN) === 0);
      assert(utils.toSeconds("00:00.250") === 0.250);
      assert(utils.toSeconds("00:01.250") === 1.250);
      assert(utils.toSeconds("01:01.250") === 61.250);
      assert(utils.toSeconds(null) === 0);
    });
  });
});
