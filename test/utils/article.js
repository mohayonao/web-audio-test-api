"use strict";

var article = require("../../src/utils/article");

describe("utils/article", function() {
  it("(str: string): string", function() {
    assert(article("Apple") === "an");
    assert(article("IceCream") === "an");
    assert(article("Ugli") === "an");
    assert(article("Elderberry") === "an");
    assert(article("Orange") === "an");
    assert(article("Banana") === "a");
    assert(article("Ringo") === "a");
  });
});
