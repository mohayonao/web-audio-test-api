"use strict";

describe("OscillatorNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.OscillatorNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#type", function() {
    it("get/set: OscillatorType", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);

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
      }, function(e) {
        return e instanceof TypeError && /should be an enum/.test(e.message);
      });
    });
  });

  describe("#frequency", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);

      assert(node.frequency instanceof global.AudioParam);

      assert.throws(function() {
        node.frequency = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#detune", function() {
    it("get: AudioParam", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);

      assert(node.detune instanceof global.AudioParam);

      assert.throws(function() {
        node.detune = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#onended", function() {
    it("get/set: function", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);
      var fn1 = function() {};
      var fn2 = function() {};

      assert(node.onended === null);

      node.onended = fn1;
      assert(node.onended === fn1);

      node.onended = fn2;
      assert(node.onended === fn2);

      node.onended = null;
      assert(node.onended === null);

      assert.throws(function() {
        node.onended = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a function/.test(e.message);
      });
    });
    it("works", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);
      var onended = sinon.spy();

      node.onended = onended;

      node.connect(audioContext.destination);
      node.start(0.1);
      node.stop(0.15);

      audioContext.$processTo("00:00.000");
      assert(onended.callCount === 0, "00:00.000");

      audioContext.$processTo("00:00.149");
      assert(onended.callCount === 0, "00:00.149");

      audioContext.$processTo("00:00.150");
      assert(onended.callCount === 1, "00:00.150");
      assert(onended.calledOn(node), "00:00.150");

      audioContext.$processTo("00:00.200");
      assert(onended.callCount === 1, "00:00.200");

      var event = onended.args[0][0];

      assert(event instanceof global.Event);
      assert(event.type === "ended");
      assert(event.target === node);
    });
  });

  describe("#start", function() {
    it("(): void", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);

      node.start();

      assert.throws(function() {
        node.start();
      }, Error, "call twice");
    });
    it("(when: number): void", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);

      assert.throws(function() {
        node.start("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      node.start(0);

      assert.throws(function() {
        node.start(0);
      }, Error, "call twice");
    });
  });

  describe("#stop(when)", function() {
    it("(): void", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);

      assert.throws(function() {
        node.stop();
      }, Error, "not start yet");

      node.start();

      assert.throws(function() {
        node.stop("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      node.stop();

      assert.throws(function() {
        node.stop();
      }, Error, "call twice");

      assert.throws(function() {
        node.start();
      }, Error);
    });
    it("(when: number): void", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);

      assert.throws(function() {
        node.stop(0);
      }, Error, "not start yet");

      node.start(0);

      assert.throws(function() {
        node.stop("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

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
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);
      var periodicWave = new WebAudioTestAPI.PeriodicWave(
        audioContext, new Float32Array(128), new Float32Array(128)
      );

      node.setPeriodicWave(periodicWave);

      assert(node.type === "custom");
      assert(node.$custom === periodicWave);

      assert.throws(function() {
        node.setPeriodicWave("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a PeriodicWave/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);

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

  describe("$state", function() {
    it("get: string", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);

      assert(node.$state === "UNSCHEDULED");

      node.start(0.1);

      audioContext.$processTo("00:00.099");
      assert(node.$state === "SCHEDULED");

      audioContext.$processTo("00:00.100");
      assert(node.$state === "PLAYING");

      node.stop(0.2);

      audioContext.$processTo("00:00.199");
      assert(node.$state === "PLAYING");

      audioContext.$processTo("00:00.200");
      assert(node.$state === "FINISHED");
    });
  });

  describe("$stateAtTime", function() {
    it("(time: number|string): string", function() {
      var node = new WebAudioTestAPI.OscillatorNode(audioContext);

      assert(node.$stateAtTime("00:00.050") === "UNSCHEDULED");
      assert(node.$stateAtTime("00:00.150") === "UNSCHEDULED");
      assert(node.$stateAtTime("00:00.250") === "UNSCHEDULED");

      node.start(0.1);
      node.stop(0.2);

      assert(node.$stateAtTime("00:00.050") === "SCHEDULED");
      assert(node.$stateAtTime("00:00.150") === "PLAYING");
      assert(node.$stateAtTime("00:00.250") === "FINISHED");
    });
  });

});
