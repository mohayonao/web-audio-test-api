"use strict";

describe("MediaElementAudioSourceNode", function() {
  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.MediaElementAudioSourceNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
