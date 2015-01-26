"use strict";

describe("OscillatorNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createOscillator();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.OscillatorNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("#type", function() {
    it("should be exist", function() {
      assert(typeof node.type === "string");
    });
    it("should be an enum", function() {
      assert.doesNotThrow(function() {
        node.type = "sawtooth";
      });
      assert.throws(function() {
        node.type = "INVALID";
      }, TypeError);
    });
  });

  describe("#frequency", function() {
    it("should be exist", function() {
      assert(node.frequency instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.frequency = 0;
      }, Error, "readonly");
    });
  });

  describe("#detune", function() {
    it("should be exist", function() {
      assert(node.detune instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.detune = 0;
      }, Error, "readonly");
    });
  });

  describe("#onended", function() {
    it("should be exist", function() {
      assert(node.onended === null);
    });
    it("should be a function", function() {
      assert.doesNotThrow(function() {
        node.onended = it;
        assert(node.onended === it);
      });
      assert.doesNotThrow(function() {
        node.onended = it;
        node.onended = null;
        assert(node.onended === null);
      }, "nullable");
      assert.throws(function() {
        node.onended = "INVALID";
      }, TypeError);
    });
    it("works", function() {
      var passed = 0;

      node.onended = function() {
        passed += 1;
      };

      node.connect(node.context.destination);
      node.start(0);
      node.stop(0.15);

      assert(passed === 0, "00:00.000");

      node.context.$processTo("00:00.100");
      assert(passed === 0, "00:00.100");

      node.context.$processTo("00:00.200");
      assert(passed === 1, "00:00.200");

      node.context.$processTo("00:00.300");
      assert(passed === 1, "00:00.300");
    });
  });

  describe("#$state", function() {
    it("return #$stateAtTime(currentTime)", function() {
      assert(node.$state === "UNSCHEDULED");

      node.start(0.1);
      assert(node.$state === "SCHEDULED");

      node.context.$processTo("00:00.100");
      assert(node.$state === "PLAYING");

      node.stop(0.2);
      assert(node.$state === "PLAYING");

      node.context.$processTo("00:00.200");
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

  describe("#start(when)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        node.start();
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        node.start("INVALID");
      }, TypeError, "OscillatorNode#start(when)");
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
      }, TypeError, "OscillatorNode#stop(when)");
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

  describe("#setPeriodicWave(periodicWave)", function() {
    it("should work", function() {
      var periodicWave = ctx.createPeriodicWave(new Float32Array(128), new Float32Array(128));
      assert.doesNotThrow(function() {
        node.setPeriodicWave(periodicWave);
      });
      assert(node.type === "custom");
      assert(node.$custom === periodicWave);
    });
    it("throw error", function() {
      assert.throws(function() {
        node.setPeriodicWave("INVALID");
      }, TypeError, "OscillatorNode#setPeriodicWave(periodicWave)");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
        name: "OscillatorNode",
        type: "sine",
        frequency: {
          value: 440,
          inputs: []
        },
        detune: {
          value: 0,
          inputs: []
        },
        inputs: []
      });
    });
  });

});
