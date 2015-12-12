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
      }, TypeError);

      assert.throws(function() {
        audioContext.createBuffer(2, 16.5, 44100);
      }, TypeError);

      assert.throws(function() {
        audioContext.createBuffer(2, 128, 44100.5);
      }, TypeError);

      assert.throws(function() {
        return new global.AudioBuffer();
      }, TypeError);
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
      }, TypeError);
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
      }, TypeError);
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
      }, TypeError);
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
      }, TypeError);
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
      }, TypeError);
      assert.throws(function() {
        buf2.getChannelData(2);
      }, TypeError);
      assert.throws(function() {
        buf1.getChannelData(2.5);
      }, TypeError);

      assert(buf1.getChannelData === global.AudioBuffer.prototype.getChannelData);
    });
  });

  describe("#copyFromChannel", function() {
    it("(destination: Float32Array, channelNumber: number, startInChannel: number = 0): void", function() {
      var buf1 = audioContext.createBuffer(2, 10, 44100);
      var dest = new Float32Array(4);

      buf1.getChannelData(0).set([ 10, 11, 12, 13, 14, 15, 16, 17, 18, 19 ]);
      buf1.getChannelData(1).set([ 20, 21, 22, 23, 24, 25, 26, 27, 28, 29 ]);

      assert.throws(function() {
        buf1.copyFromChannel(dest, 0, 0);
      }, TypeError);

      WebAudioTestAPI.setState("AudioBuffer#copyFromChannel", "enabled");

      buf1.copyFromChannel(dest, 0);
      assert.deepEqual(dest, new Float32Array([ 10, 11, 12, 13 ]));

      buf1.copyFromChannel(dest, 0, 2);
      assert.deepEqual(dest, new Float32Array([ 12, 13, 14, 15 ]));

      buf1.copyFromChannel(dest, 1, 4);
      assert.deepEqual(dest, new Float32Array([ 24, 25, 26, 27 ]));

      buf1.copyFromChannel(dest, 1, 8);
      assert.deepEqual(dest, new Float32Array([ 28, 29, 26, 27 ]));

      assert.throws(function() {
        buf1.copyFromChannel("INVALID", 0, 0);
      }, TypeError);

      assert.throws(function() {
        buf1.copyFromChannel(dest, "INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        buf1.copyFromChannel(dest, 0, "INVALID");
      }, TypeError);

      assert.throws(function() {
        buf1.copyFromChannel(dest, 10, 0);
      }, TypeError);

      assert.throws(function() {
        buf1.copyFromChannel(dest, 0, 10);
      }, TypeError);

      assert.throws(function() {
        buf1.copyFromChannel(dest, 0, undefined);
      }, TypeError);

      WebAudioTestAPI.setState("AudioBuffer#copyFromChannel", "disabled");

      assert(buf1.copyFromChannel === global.AudioBuffer.prototype.copyFromChannel);
    });
  });

  describe("#copyToChannel", function() {
    it("(source: Float32Array, channelNumber: number, startInChannel: number = 0): void", function() {
      var buf1 = audioContext.createBuffer(2, 10, 44100);
      var source = new Float32Array([ 10, 11, 12, 13 ]);

      assert.throws(function() {
        buf1.copyToChannel(source, 0, 0);
      }, TypeError);

      WebAudioTestAPI.setState("AudioBuffer#copyToChannel", "enabled");

      buf1.copyToChannel(source, 0);
      assert.deepEqual(buf1.getChannelData(0), new Float32Array([ 10, 11, 12, 13, 0, 0, 0, 0, 0, 0 ]));

      buf1.copyToChannel(source, 0, 2);
      assert.deepEqual(buf1.getChannelData(0), new Float32Array([ 10, 11, 10, 11, 12, 13, 0, 0, 0, 0 ]));

      buf1.copyToChannel(source, 1, 4);
      assert.deepEqual(buf1.getChannelData(1), new Float32Array([ 0, 0, 0, 0, 10, 11, 12, 13, 0, 0 ]));

      buf1.copyToChannel(source, 1, 8);
      assert.deepEqual(buf1.getChannelData(1), new Float32Array([ 0, 0, 0, 0, 10, 11, 12, 13, 10, 11 ]));

      assert.throws(function() {
        buf1.copyToChannel("INVALID", 0, 0);
      }, TypeError);

      assert.throws(function() {
        buf1.copyToChannel(source, "INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        buf1.copyToChannel(source, 0, "INVALID");
      }, TypeError);

      assert.throws(function() {
        buf1.copyToChannel(source, 10, 0);
      }, TypeError);

      assert.throws(function() {
        buf1.copyToChannel(source, 0, 10);
      }, TypeError);

      assert.throws(function() {
        buf1.copyToChannel(source, 0, undefined);
      }, TypeError);

      WebAudioTestAPI.setState("AudioBuffer#copyToChannel", "disabled");

      assert(buf1.copyToChannel === global.AudioBuffer.prototype.copyToChannel);
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
        numberOfChannels: buf1.numberOfChannels
      });
      assert.deepEqual(buf2.toJSON(), {
        name: "AudioBuffer",
        sampleRate: buf2.sampleRate,
        length: buf2.length,
        duration: buf2.duration,
        numberOfChannels: buf2.numberOfChannels
      });

      audioContext.VERBOSE_JSON = true;

      assert.deepEqual(buf1.toJSON(), {
        name: "AudioBuffer",
        sampleRate: buf1.sampleRate,
        length: buf1.length,
        duration: buf1.duration,
        numberOfChannels: buf1.numberOfChannels,
        data: [ dat1 ]
      });
      assert.deepEqual(buf2.toJSON(), {
        name: "AudioBuffer",
        sampleRate: buf2.sampleRate,
        length: buf2.length,
        duration: buf2.duration,
        numberOfChannels: buf2.numberOfChannels,
        data: [ dat2, dat2 ]
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
