"use strict";

describe("AudioBufferSourceNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createBufferSource();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.AudioBufferSourceNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("#buffer", function() {
    it("should be exist", function() {
      assert(node.buffer === null);
    });
  });

  describe("#playbackRate", function() {
    it("should be exist", function() {
      assert(node.playbackRate instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.playbackRate = 0;
      }, Error, "readonly");
    });
  });

  describe("#loop", function() {
    it("should be exist", function() {
      assert(typeof node.loop === "boolean");
    });
    it("should be a boolean", function() {
      assert.doesNotThrow(function() {
        node.loop = true;
      });
      assert.throws(function() {
        node.loop = "INVALID";
      }, TypeError);
    });
  });

  describe("#loopStart", function() {
    it("should be exist", function() {
      assert(typeof node.loopStart === "number");
    });
    it("should be a number", function() {
      assert.doesNotThrow(function() {
        node.loopStart = 0;
      });
      assert.throws(function() {
        node.loopStart = "INVALID";
      }, TypeError);
    });
  });

  describe("#loopEnd", function() {
    it("should be exist", function() {
      assert(typeof node.loopEnd === "number");
    });
    it("should be a number", function() {
      assert.doesNotThrow(function() {
        node.loopEnd = 0;
      });
      assert.throws(function() {
        node.loopEnd = "INVALID";
      }, TypeError);
    });
  });

  describe("#onended", function() {
    it("should be exist", function() {
      assert(node.onended === null);
    });
    it("should be a function", function() {
      assert.doesNotThrow(function() {
        node.onended = it;
      });
      assert(node.onended === it);
      assert.doesNotThrow(function() {
        node.onended = null;
      });
      assert(node.onended === null);
      assert.throws(function() {
        node.onended = "INVALID";
      }, TypeError);
    });
    it("works", function() {
      var passed = 0;

      node.onended = function() {
        passed = node.context.currentTime;
      };

      node.buffer = node.context.createBuffer(
        1, node.context.sampleRate * 0.25, node.context.sampleRate
      );

      node.connect(node.context.destination);
      node.start(0.1);
      node.stop(0.15);

      assert(passed === 0, "00:00.000");

      node.context.$processTo("00:00.050");
      assert(passed === 0, "00:00.050");

      node.context.$processTo("00:00.100");
      assert(passed === 0, "00:00.100");

      node.context.$processTo("00:00.200");
      assert(closeTo(passed, 0.15, 1e-2), "00:00.200");

      node.context.$processTo("00:00.300");
      assert(closeTo(passed, 0.15, 1e-2), "00:00.300");

      node.context.$processTo("00:00.400");
      assert(closeTo(passed, 0.15, 1e-2), "00:00.400");

      node.context.$processTo("00:00.500");
      assert(closeTo(passed, 0.15, 1e-2), "00:00.500");
    });
    it("works auto stop", function() {
      var passed = 0;

      node.onended = function() {
        passed = node.context.currentTime;
      };

      node.buffer = node.context.createBuffer(
        1, node.context.sampleRate * 0.25, node.context.sampleRate
      );

      node.connect(node.context.destination);
      node.start(0.1);

      assert(passed === 0, "00:00.000");

      node.context.$processTo("00:00.050");
      assert(passed === 0, "00:00.050");

      node.context.$processTo("00:00.100");
      assert(passed === 0, "00:00.100");

      node.context.$processTo("00:00.200");
      assert(passed === 0, "00:00.200");

      node.context.$processTo("00:00.300");
      assert(passed === 0, "00:00.300");

      node.context.$processTo("00:00.400");
      assert(closeTo(passed, 0.35, 1e-2), "00:00.400");

      node.context.$processTo("00:00.500");
      assert(closeTo(passed, 0.35, 1e-2), "00:00.500");
    });
  });

  describe("#$state", function() {
    it("return #$stateAtTime(currentTime)", function() {
      assert(node.$state === "UNSCHEDULED");

      node.start(0.1);
      assert(node.$state === "SCHEDULED");

      ctx.$process(0.1);
      assert(node.$state === "PLAYING");

      node.stop(0.2);
      assert(node.$state === "PLAYING");

      ctx.$process(0.1);
      assert(node.$state === "FINISHED");
    });
  });

  describe("#$stateAtTime(t)", function() {
    it("return the state at the specified time", function() {

      node.start(0.1);
      node.stop(0.2);

      assert(node.$stateAtTime(0.05) === "SCHEDULED");
      assert(node.$stateAtTime(0.15) === "PLAYING");
      assert(node.$stateAtTime(0.25) === "FINISHED");
    });
  });

  describe("#start(when, offset, duration)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        node.start();
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        node.start("INVALID");
      }, TypeError, "AudioBufferSourceNode#start(when, offset, duration)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.start(0, "INVALID");
      }, TypeError, "AudioBufferSourceNode#start(when, offset, duration)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.start(0, 0, "INVALID");
      }, TypeError, "AudioBufferSourceNode#start(when, offset, duration)");
    });
    it("throw error if called more than once", function() {
      node.start(0);
      assert.throws(function() {
        node.start(0);
      }, Error);
    });
  });

  describe("#stop(when)", function() {
    it("should work", function() {
      node.start();
      assert.doesNotThrow(function() {
        node.stop();
      });
    });
    it("throw error", function() {
      node.start();
      assert.throws(function() {
        node.stop("INVALID");
      }, TypeError, "AudioBufferSourceNode#stop(when)");
    });
    it("throw error if called without calling start first", function() {
      assert.throws(function() {
        node.stop();
      }, Error);
    });
    it("throw error if called more than once", function() {
      node.start();
      node.stop();
      assert.throws(function() {
        node.stop();
      }, Error);
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
        name: "AudioBufferSourceNode",
        buffer: null,
        playbackRate: {
          value: 1,
          inputs: []
        },
        loop: false,
        loopStart: 0,
        loopEnd: 0,
        inputs: []
      });
    });
  });

});
