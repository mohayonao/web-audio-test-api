import Immigration from "../../src/util/Immigration";

describe("Immigration", function() {
  describe("constructor", function() {
    it("()", function() {
      let immigration = new Immigration();

      assert(immigration instanceof Immigration);
    });
  });

  describe("workflow", function() {
    describe("apply -> check", function() {
      it("ok", function() {
        let immigration = new Immigration();

        let result = immigration.apply((admission) => {

          immigration.check(admission);

          return 1000;
        });

        assert(result === 1000);
      });
    });
    describe("apply1 -> check1 -> apply2 -> check2", function() {
      it("ok", function() {
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
    describe("apply1 -> apply2 -> check2 -> check1", function() {
      it("ok", function() {
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
    describe("apply -> check with an invalid admission", function() {
      it("call failed callback", function() {
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
    describe("apply -> NOT check", function() {
      it("failed", function() {
        let immigration = new Immigration();

        assert.throws(() => {
          immigration.apply((/* admission */) => {
            // immigration.check(admission);
          });
        }, Error);
      });
    });
    describe("apply -> check -> checl", function() {
      it("failed", function() {
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
