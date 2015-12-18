const assert = require("power-assert");
const sinon = require("sinon");
const auth = require("../../src/utils/auth");

describe("utils/auth", () => {
  describe("request -> grant", () => {
    it("ok", () => {
      const errorCallback = sinon.spy();
      const result = auth.request((token) => {
        auth.grant(token, errorCallback);

        return 1000;
      });

      assert(result === 1000);
      assert(errorCallback.callCount === 0);
    });
  });
  describe("request(1) -> grant(1) -> request(2) -> grant(2)", () => {
    it("ok", () => {
      const errorCallback = sinon.spy();
      const result = auth.request((token1) => {
        auth.grant(token1, errorCallback);

        const result2 = auth.request((token2) => {
          auth.grant(token2, errorCallback);

          return 1000;
        });

        return result2;
      });

      assert(result === 1000);
      assert(errorCallback.callCount === 0);
    });
  });
  describe("request(1) -> request(2) -> grant(2) -> grant(1)", () => {
    it("ok", () => {
      const errorCallback = sinon.spy();
      const result = auth.request((token1) => {
        const result2 = auth.request((token2) => {
          auth.grant(token2, errorCallback);

          return 1000;
        });

        auth.grant(token1, errorCallback);

        return result2;
      });

      assert(result === 1000);
      assert(errorCallback.callCount === 0);
    });
  });
  describe("request -> grant with an invalid token", () => {
    it("call failed callback", () => {
      const errorCallback = sinon.spy();

      assert.throws(() => {
        auth.request((token1) => {
          const result2 = auth.request(() => {
            auth.grant(token1, errorCallback);

            return 1000;
          });

          auth.grant(token1);

          return result2;
        });
      }, Error);

      assert(errorCallback.callCount === 1);
    });
  });
  describe("request -> NOT grant", () => {
    it("failed", () => {
      assert.throws(() => {
        auth.request(() => {
          // auth.grant(token);
        });
      }, Error);
    });
  });
  describe("request -> grant -> checl", () => {
    it("failed", () => {
      assert.throws(() => {
        auth.request((token) => {
          auth.grant(token);
          auth.grant(token);
        });
      }, Error);
    });
  });
});
