describe("AudioBuffer", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var buf = audioContext.createBuffer(1, 16, 44100);

      assert(buf instanceof global.AudioBuffer);

      assert.throws(function() {
        audioContext.createBuffer(1.5, 128, 44100);
      }, function(e) {
        return e instanceof TypeError && /should be a positive integer/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createBuffer(2, 16.5, 44100);
      }, function(e) {
        return e instanceof TypeError && /should be a positive integer/.test(e.message);
      });

      assert.throws(function() {
        audioContext.createBuffer(2, 128, 44100.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive integer/.test(e.message);
      });

      assert.throws(function() {
        return new global.AudioBuffer();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#sampleRate", function() {
    it("get: number", function() {
      var buf1 = audioContext.createBuffer(1, 16, 44100);
      var buf2 = audioContext.createBuffer(2, 32, 48000);

      assert(typeof buf1.sampleRate === "number");
      assert(typeof buf2.sampleRate === "number");
      assert(buf1.sampleRate === 44100);
      assert(buf2.sampleRate === 48000);

      assert.throws(function() {
        buf1.sampleRate = 48000;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#length", function() {
    it("get: number", function() {
      var buf1 = audioContext.createBuffer(1, 16, 44100);
      var buf2 = audioContext.createBuffer(2, 32, 48000);

      assert(typeof buf1.length === "number");
      assert(typeof buf2.length === "number");
      assert(buf1.length === 16);
      assert(buf2.length === 32);

      assert.throws(function() {
        buf1.length = 32;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#duration", function() {
    it("get: number", function() {
      var buf1 = audioContext.createBuffer(1, 16, 44100);
      var buf2 = audioContext.createBuffer(2, 32, 48000);

      assert(typeof buf1.duration === "number");
      assert(typeof buf2.duration === "number");
      assert(buf1.duration === 16 / 44100);
      assert(buf2.duration === 32 / 48000);

      assert.throws(function() {
        buf1.duration = 32 / 48000;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#numberOfChannels", function() {
    it("get: number", function() {
      var buf1 = audioContext.createBuffer(1, 16, 44100);
      var buf2 = audioContext.createBuffer(2, 32, 48000);

      assert(typeof buf1.numberOfChannels === "number");
      assert(typeof buf2.numberOfChannels === "number");
      assert(buf1.numberOfChannels === 1);
      assert(buf2.numberOfChannels === 2);

      assert.throws(function() {
        buf1.numberOfChannels = 2;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#getChannelData", function() {
    it("(channel: number): Float32Array", function() {
      var buf1 = audioContext.createBuffer(1, 16, 44100);
      var buf2 = audioContext.createBuffer(2, 32, 48000);

      var dat1 = buf1.getChannelData(0);
      var dat2 = buf2.getChannelData(1);

      assert(dat1 instanceof Float32Array);
      assert(dat2 instanceof Float32Array);
      assert(dat1 === buf1.getChannelData(0));
      assert(dat1 !== buf2.getChannelData(1));
      assert(dat2 !== buf2.getChannelData(0));
      assert(dat2 === buf2.getChannelData(1));
      assert(dat1.length === 16);
      assert(dat2.length === 32);

      assert.throws(function() {
        buf1.getChannelData(1);
      }, function(e) {
        return e instanceof TypeError && /exceeds number of channels/.test(e.message);
      });
      assert.throws(function() {
        buf2.getChannelData(2);
      }, function(e) {
        return e instanceof TypeError && /exceeds number of channels/.test(e.message);
      });
      assert.throws(function() {
        buf1.getChannelData(2.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive integer/.test(e.message);
      });

      assert(buf1.getChannelData === global.AudioBuffer.prototype.getChannelData);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var buf1 = audioContext.createBuffer(1, 16, 44100);
      var buf2 = audioContext.createBuffer(2, 32, 48000);
      var dat1 = _.toArray(new Float32Array(_.range(16).map(Math.random)));
      var dat2 = _.toArray(new Float32Array(_.range(32).map(Math.random)));

      buf1.getChannelData(0).set(dat1);
      buf2.getChannelData(0).set(dat2);
      buf2.getChannelData(1).set(dat2);

      assert.deepEqual(buf1.toJSON(), {
        name: "AudioBuffer",
        sampleRate: buf1.sampleRate,
        length: buf1.length,
        duration: buf1.duration,
        numberOfChannels: buf1.numberOfChannels,
      });
      assert.deepEqual(buf2.toJSON(), {
        name: "AudioBuffer",
        sampleRate: buf2.sampleRate,
        length: buf2.length,
        duration: buf2.duration,
        numberOfChannels: buf2.numberOfChannels,
      });

      audioContext.VERBOSE_JSON = true;

      assert.deepEqual(buf1.toJSON(), {
        name: "AudioBuffer",
        sampleRate: buf1.sampleRate,
        length: buf1.length,
        duration: buf1.duration,
        numberOfChannels: buf1.numberOfChannels,
        data: [ dat1 ],
      });
      assert.deepEqual(buf2.toJSON(), {
        name: "AudioBuffer",
        sampleRate: buf2.sampleRate,
        length: buf2.length,
        duration: buf2.duration,
        numberOfChannels: buf2.numberOfChannels,
        data: [ dat2, dat2 ],
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var buf = audioContext.createBuffer(1, 16, 44100);

      assert(buf.$name === "AudioBuffer");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var buf = audioContext.createBuffer(1, 16, 44100);

      assert(buf.$context === audioContext);
    });
  });
});
