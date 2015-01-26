"use strict";

describe("AnalyserNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createAnalyser();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.AnalyserNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("#fftSize", function() {
    it("should be exist", function() {
      assert(typeof node.fftSize === "number");
    });
    it("should be number", function() {
      assert.doesNotThrow(function() {
        node.fftSize = 512;
      });
      assert.throws(function() {
        node.fftSize = "INVALID";
      }, TypeError);
    });
  });

  describe("#frequencyBinCount", function() {
    it("should be exist", function() {
      assert(typeof node.frequencyBinCount === "number");
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.frequencyBinCount = 0;
      }, Error, "readonly");
    });
  });

  describe("#minDecibels", function() {
    it("should be exist", function() {
      assert(typeof node.minDecibels === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
        node.minDecibels = 0;
      });
      assert.throws(function() {
        node.minDecibels = "INVALID";
      }, TypeError);
    });
  });

  describe("#maxDecibels", function() {
    it("should be exist", function() {
      assert(typeof node.maxDecibels === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
        node.maxDecibels = 0;
      });
      assert.throws(function() {
        node.maxDecibels = "INVALID";
      }, TypeError);
    });
  });

  describe("#smoothingTimeConstant", function() {
    it("should be exist", function() {
      assert(typeof node.smoothingTimeConstant === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
        node.maxDecibels = 0;
      });
      assert.throws(function() {
        node.maxDecibels = "INVALID";
      }, TypeError);
    });
  });

  describe("#getFloatFrequencyData(array)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        node.getFloatFrequencyData(new Float32Array(128));
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        node.getFloatFrequencyData("INVALID");
      }, TypeError, "AnalyserNode#getFloatFrequencyData(array)");
    });
  });

  describe("#getByteFrequencyData(array)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        node.getByteFrequencyData(new Uint8Array(128));
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        node.getByteFrequencyData("INVALID");
      }, TypeError, "AnalyserNode#getByteFrequencyData(array)");
    });
  });

  describe("#getByteTimeDomainData(array)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        node.getByteTimeDomainData(new Uint8Array(128));
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        node.getByteTimeDomainData("INVALID");
      }, TypeError, "AnalyserNode#getByteTimeDomainData(array)");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
        name: "AnalyserNode",
        fftSize: 2048,
        minDecibels: -100,
        maxDecibels: 30,
        smoothingTimeConstant: 0.8,
        inputs: []
      });
    });
  });

});
