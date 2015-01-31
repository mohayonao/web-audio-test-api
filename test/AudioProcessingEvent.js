"use strict";

describe("AudioProcessingEvent", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;

  describe("constructor", function() {
    it("()", function() {
      var event = new WebAudioTestAPI.AudioProcessingEvent();

      assert(event instanceof global.AudioProcessingEvent);
      assert(event instanceof global.Event);

      assert.throws(function() {
        global.AudioProcessingEvent();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
