"use strict";

describe("MediaStreamAudioDestinationNode", function() {
  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.MediaStreamAudioDestinationNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
