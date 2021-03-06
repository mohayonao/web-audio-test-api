import assert from "power-assert";
import Immigration from "../../src/utils/Immigration";

describe("Immigration", () => {
  describe("constructor()", () => {
    it("works", () => {
      let immigration = new Immigration();

      assert(immigration instanceof Immigration);
    });
  });
  describe(".getInstance(): Immigration", () => {
    it("works", () => {
      let immigration1 = Immigration.getInstance();
      let immigration2 = Immigration.getInstance();

      assert(immigration1 instanceof Immigration);
      assert(immigration2 instanceof Immigration);
      assert(immigration1 === immigration2);
    });
  });
  describe("workflow", () => {
    describe("apply -> check", () => {
      it("ok", () => {
        let immigration = new Immigration();

        let result = immigration.apply((admission) => {
          immigration.check(admission);

          return 1000;
        });

        assert(result === 1000);
      });
    });
    describe("apply1 -> check1 -> apply2 -> check2", () => {
      it("ok", () => {
        let immigration = new Immigration();

        let result = immigration.apply((admission1) => {
          immigration.check(admission1);

          let result2 = immigration.apply((admission2) => {
            immigration.check(admission2);

            return 1000;
          });

          return result2;
        });

        assert(result === 1000);
      });
    });
    describe("apply1 -> apply2 -> check2 -> check1", () => {
      it("ok", () => {
        let immigration = new Immigration();

        let result = immigration.apply((admission1) => {
          let result2 = immigration.apply((admission2) => {
            immigration.check(admission2);

            return 1000;
          });

          immigration.check(admission1);

          return result2;
        });

        assert(result === 1000);
      });
    });
    describe("apply -> check with an invalid admission", () => {
      it("call failed callback", () => {
        let passed = false;
        let immigration = new Immigration();

        assert.throws(() => {
          immigration.apply((admission1) => {
            let result2 = immigration.apply(() => {
              immigration.check(admission1, () => {
                passed = true;
              });

              return 1000;
            });

            immigration.check(admission1);

            return result2;
          });
        }, Error);

        assert(passed);
      });
    });
    describe("apply -> NOT check", () => {
      it("failed", () => {
        let immigration = new Immigration();

        assert.throws(() => {
          /* admission */
          immigration.apply(() => {
            // immigration.check(admission);
          });
        }, Error);
      });
    });
    describe("apply -> check -> checl", () => {
      it("failed", () => {
        let immigration = new Immigration();

        assert.throws(() => {
          immigration.apply((admission) => {
            immigration.check(admission);
            immigration.check(admission);
          });
        }, Error);
      });
    });
  });
});
