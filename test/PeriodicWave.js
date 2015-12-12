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
      var f128 = new Float32Array(128);
      var f256 = new Float32Array(256);
      var f8192 = new Float32Array(8192);

      assert(wave instanceof global.PeriodicWave);

      assert.throws(function() {
        audioContext.createPeriodicWave("INVALID", imag);
      }, TypeError);

      assert.throws(function() {
        audioContext.createPeriodicWave(real, "INVALID");
      }, TypeError);

      assert.throws(function() {
        audioContext.createPeriodicWave(f128, f256);
      }, TypeError);

      assert.throws(function() {
        audioContext.createPeriodicWave(f8192, f128);
      }, TypeError);

      assert.throws(function() {
        audioContext.createPeriodicWave(f128, f8192);
      }, TypeError);

      assert.throws(function() {
        return new global.PeriodicWave();
      }, TypeError);
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
