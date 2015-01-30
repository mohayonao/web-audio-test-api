"use strict";

describe("PeriodicWave", function() {
  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.PeriodicWave();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

});
