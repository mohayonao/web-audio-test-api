describe("PeriodicWave", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext, real, imag;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
    real = new Float32Array(1024);
    imag = new Float32Array(1024);
  });

  describe("constructor", function() {
    it("()", function() {
      var wave = audioContext.createPeriodicWave(real, imag);

      assert(wave instanceof global.PeriodicWave);

      assert.throws(function() {
        audioContext.createPeriodicWave("INVALID", imag);
      }, function(e) {
        return e instanceof TypeError && /should be a Float32Array/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createPeriodicWave(real, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a Float32Array/.test(e.message);
      });

      var f128 = new Float32Array(128);
      var f256 = new Float32Array(256);

      assert.throws(function() {
        audioContext.createPeriodicWave(f128, f256);
      }, function(e) {
        return e instanceof TypeError && /must match/.test(e.message);
      });

      var f8192 = new Float32Array(8192);

      assert.throws(function() {
        audioContext.createPeriodicWave(f8192, f128);
      }, function(e) {
        return e instanceof TypeError && /exceeds allow maximum of 4096/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createPeriodicWave(f128, f8192);
      }, function(e) {
        return e instanceof TypeError && /exceeds allow maximum of 4096/.test(e.message);
      });

      assert.throws(function() {
        return new global.PeriodicWave();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var wave = audioContext.createPeriodicWave(real, imag);

      assert(wave.$name === "PeriodicWave");
    });
  });

  describe("#$context", function() {
    it("get: string", function() {
      var wave = audioContext.createPeriodicWave(real, imag);

      assert(wave.$context === audioContext);
    });
  });

  describe("#$real", function() {
    it("get: string", function() {
      var wave = audioContext.createPeriodicWave(real, imag);

      assert(wave.$real === real);
    });
  });

  describe("#$imag", function() {
    it("get: string", function() {
      var wave = audioContext.createPeriodicWave(real, imag);

      assert(wave.$imag === imag);
    });
  });

});
