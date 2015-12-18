const assert = require("power-assert");
const getAPIVersion = require("../../src/utils/getAPIVersion");

describe("utils/getAPIVersion(): string", () => {
  it("works", () => {
    const pkg = require("../../package.json");

    assert(getAPIVersion() === pkg.version);
  });
});
