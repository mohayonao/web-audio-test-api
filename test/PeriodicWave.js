"use strict";

describe("PeriodicWave", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var wave = new WebAudioTestAPI.PeriodicWave();

      assert(wave instanceof global.PeriodicWave);

      assert.throws(function() {
        return new global.PeriodicWave();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

});
