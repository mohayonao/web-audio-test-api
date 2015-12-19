const assert = require("power-assert");
const testapi = require("../../src/testapi");

describe("testapi/version: string", () => {
  it("works", () => {
    const pkg = require("../../package.json");

    assert(testapi.version === pkg.version);
  });
});
