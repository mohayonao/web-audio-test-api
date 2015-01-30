"use strict";

describe("MediaStreamAudioSourceNode", function() {
  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.MediaStreamAudioSourceNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
