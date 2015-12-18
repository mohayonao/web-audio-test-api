const assert = require("power-assert");
const versions = require("../../../src/testapi/decorators/versions");

describe("@versions(spec: object)", () => {
  let saved;

  beforeEach(() => {
    saved = versions.targetVersions;
  });
  afterEach(() => {
    versions.targetVersions = saved;
  });
  it("defines version checker", () => {
    class Foo {
      @versions({ chrome: "37-", firefox: "30-", safari: "none" })
      bar() {}
    }

    const foo = new Foo();

    versions.targetVersions = { chrome: 40, firefox: 42, safari: Infinity };
    assert.doesNotThrow(() => { foo.bar(); });

    versions.targetVersions = { chrome: 35, firefox: 42, safari: Infinity };
    assert.throws(() => { foo.bar(); });

    versions.targetVersions = { chrome: 35, firefox: 42 };
    assert.throws(() => { foo.bar(); });
  });
});
