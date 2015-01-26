"use strict";

describe("AudioBuffer", function() {
  var ctx = null;
  var buf = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    buf = ctx.createBuffer(1, 16, 44100);
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.AudioBuffer();
      }, TypeError, "Illegal constructor");
    });
  });

  describe("#sampleRate", function() {
    it("should be exist", function() {
      assert(buf.sampleRate === 44100);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        buf.sampleRate = 0;
      }, Error, "readonly");
    });
  });

  describe("#length", function() {
    it("should be exist", function() {
      assert(buf.length === 16);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        buf.length = 0;
      }, Error, "readonly");
    });
  });

  describe("#duration", function() {
    it("should be exist", function() {
      assert(buf.duration === 0.00036281179138321996);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        buf.duration = 0;
      }, Error, "readonly");
    });
  });

  describe("#numberOfChannels", function() {
    it("should be exist", function() {
      assert(buf.numberOfChannels === 1);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        buf.numberOfChannels = 0;
      }, Error, "readonly");
    });
  });

  describe("#getChannelData(channel)", function() {
    it("should work", function() {
      assert(buf.getChannelData(0) instanceof Float32Array);
    });
    it("throw error", function() {
      assert.throws(function() {
        buf.getChannelData(2);
      }, Error, "channel index (2) exceeds number of channels (1)");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(buf.toJSON(), {
        name: "AudioBuffer",
        sampleRate: 44100,
        length: 16,
        duration: 0.00036281179138321996,
        numberOfChannels: 1
      });
    });
    it("return verbose json", function() {
      ctx.VERBOSE_JSON = true;

      buf.getChannelData(0).set(new Float32Array([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
      ]));

      assert.deepEqual(buf.toJSON(), {
        name: "AudioBuffer",
        sampleRate: 44100,
        length: 16,
        duration: 0.00036281179138321996,
        numberOfChannels: 1,
        data: [
          [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ]
        ]
      });
    });
  });

});
