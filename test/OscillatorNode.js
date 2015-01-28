"use strict";

describe("OscillatorNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.OscillatorNode();
      }, TypeError);
    });
  });

  describe("#type", function() {
    it("get/set: enum[sine,square,sawtooth,triangle]", function() {
      var node = audioContext.createOscillator();

      assert(typeof node.type === "string");

      node.type = "sine";
      assert(node.type === "sine");

      node.type = "square";
      assert(node.type === "square");

      node.type = "sawtooth";
      assert(node.type === "sawtooth");

      node.type = "triangle";
      assert(node.type === "triangle");

      assert.throws(function() {
        node.type = "custom";
      }, TypeError);
    });
  });

  describe("#frequency", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createOscillator();

      assert(node.frequency instanceof global.AudioParam);

      assert.throws(function() {
        node.frequency = 0;
      }, Error);
    });
  });

  describe("#detune", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createOscillator();

      assert(node.detune instanceof global.AudioParam);

      assert.throws(function() {
        node.detune = 0;
      }, Error);
    });
  });

  describe("#onended", function() {
    it("get/set: function", function() {
      var node = audioContext.createOscillator();
      var fn1 = function() {};
      var fn2 = function() {};

      assert(node.onended === null);

      node.onended = fn1;
      assert(node.onended === fn1);

      node.onended = fn2;
      assert(node.onended === fn2);

      node.onended = null;

      assert.throws(function() {
        node.onended = "INVALID";
      });
    });
    it("works", function() {
      var node = audioContext.createOscillator();
      var spy = sinon.spy();

      node.onended = spy;

      node.connect(audioContext.destination);
      node.start(0.1);
      node.stop(0.15);

      assert(spy.callCount === 0, "00:00.000");

      node.context.$processTo("00:00.149");
      assert(spy.callCount === 0, "00:00.149");

      // TODO: FIX
      node.context.$processTo("00:00.151");
      assert(spy.callCount === 1, "00:00.151");

      node.context.$processTo("00:00.200");
      assert(spy.callCount === 1, "00:00.200");
    });
  });

  describe("#start", function() {
    it("(): void", function() {
      var node = audioContext.createOscillator();

      node.start();

      assert.throws(function() {
        node.start();
      }, Error, "call twice");
    });
    it("(when: number): void", function() {
      var node = audioContext.createOscillator();

      assert.throws(function() {
        node.start("INVALID");
      }, TypeError);

      node.start(0);

      assert.throws(function() {
        node.start(0);
      }, Error, "call twice");
    });
  });

  describe("#stop(when)", function() {
    it("(): void", function() {
      var node = audioContext.createOscillator();

      assert.throws(function() {
        node.stop();
      }, Error, "not start yet");

      node.start();

      assert.throws(function() {
        node.stop("INVALID");
      }, TypeError);

      node.stop();

      assert.throws(function() {
        node.stop();
      }, Error, "call twice");

      assert.throws(function() {
        node.start();
      }, Error);
    });
    it("(when: number): void", function() {
      var node = audioContext.createOscillator();

      assert.throws(function() {
        node.stop(0);
      }, Error, "not start yet");

      node.start(0);

      assert.throws(function() {
        node.stop("INVALID");
      }, TypeError);

      node.stop(0);

      assert.throws(function() {
        node.stop(0);
      }, Error, "call twice");

      assert.throws(function() {
        node.start(0);
      }, Error);
    });
  });

  describe("#setPeriodicWave", function() {
    it("(periodicWave: PeriodicWave): void", function() {
      var node = audioContext.createOscillator();
      var periodicWave = audioContext.createPeriodicWave(
        new Float32Array(128), new Float32Array(128)
      );

      node.setPeriodicWave(periodicWave);

      assert(node.type === "custom");
      assert(node.$custom === periodicWave);

      assert.throws(function() {
        node.setPeriodicWave("INVALID");
      }, TypeError);
    });
  });

  describe("$state", function() {
    it("get: string", function() {
      var node = audioContext.createOscillator();

      assert(node.$state === "UNSCHEDULED");

      node.start(0.1);
      assert(node.$state === "SCHEDULED");

      audioContext.$process(0.1);
      assert(node.$state === "PLAYING");

      node.stop(0.2);
      assert(node.$state === "PLAYING");

      audioContext.$process(0.1);
      assert(node.$state === "FINISHED");
    });
  });

  describe("$stateAtTime", function() {
    it("(time: number): string", function() {
      var node = audioContext.createOscillator();

      assert(node.$stateAtTime(0.05) === "UNSCHEDULED");
      assert(node.$stateAtTime(0.15) === "UNSCHEDULED");
      assert(node.$stateAtTime(0.25) === "UNSCHEDULED");

      node.start(0.1);
      node.stop(0.2);

      assert(node.$stateAtTime(0.05) === "SCHEDULED");
      assert(node.$stateAtTime(0.15) === "PLAYING");
      assert(node.$stateAtTime(0.25) === "FINISHED");
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createOscillator();

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
