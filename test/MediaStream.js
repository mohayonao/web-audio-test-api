"use strict";

describe("MediaStream", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor", function() {
    it("()", function() {
      var stream = new WebAudioTestAPI.MediaStream();

      assert(stream instanceof global.MediaStream);
      assert(stream instanceof global.EventTarget);

      assert.throws(function() {
        global.MediaStream();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

});
