"use strict";

describe("OfflineAudioCompletionEvent", function() {
  describe("constructor", function() {
    it("() throw TypeError", function() {
      assert.throws(function() {
        global.OfflineAudioCompletionEvent();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
