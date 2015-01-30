"use strict";

var name = require("../../src/utils/name");

describe("utils/name", function() {
  it("(obj: object): string", function() {
    assert(name({ $name: "name" }) === "name");
    assert(name({ $name: "name", $id: "id" }) === "name#id");
  });
});
