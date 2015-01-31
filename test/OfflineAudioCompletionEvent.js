"use strict";

describe("OfflineAudioCompletionEvent", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var event = new WebAudioTestAPI.OfflineAudioCompletionEvent();

      assert(event instanceof global.OfflineAudioCompletionEvent);
      assert(event instanceof global.Event);

      assert.throws(function() {
        global.OfflineAudioCompletionEvent();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });
});
