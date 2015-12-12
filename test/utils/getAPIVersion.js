import assert from "power-assert";
import getAPIVersion from "../../src/utils/getAPIVersion";

describe("utils/getAPIVersion(): string", () => {
  it("works", () => {
    const pkg = require("../../package.json");

    assert(getAPIVersion() === pkg.version);
  });
});
