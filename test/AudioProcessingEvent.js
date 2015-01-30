"use strict";

describe("AudioProcessingEvent", function() {
  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.AudioProcessingEvent();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
