describe("OscillatorNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createOscillator();

      assert(node instanceof global.OscillatorNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.OscillatorNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#type", function() {
    it("get/set: OscillatorType", function() {
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
      }, function(e) {
        return e instanceof TypeError && /should be an enum/.test(e.message);
      });
    });
  });

  describe("#frequency", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createOscillator();

      assert(node.frequency instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.frequency = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#detune", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createOscillator();

      assert(node.detune instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.detune = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#onended", function() {
    it("get/set: function", function() {
      var node = audioContext.createOscillator();

      function fn1() {}
      function fn2() {}

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
  });

  describe("#start", function() {
    it("(): void", function() {
      var node = audioContext.createOscillator();

      node.start();

      assert.throws(function() {
        node.start();
      }, Error, "call twice");

      assert(node.start === global.OscillatorNode.prototype.start);
    });
    it("(when: number): void", function() {
      var node = audioContext.createOscillator();

      assert.throws(function() {
        node.start(-0.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });

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
        node.stop(-0.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });

      node.stop();

      assert.throws(function() {
        node.stop();
      }, Error, "call twice");

      assert.throws(function() {
        node.start();
      }, Error);

      assert(node.stop === global.OscillatorNode.prototype.stop);
    });
    it("(when: number): void", function() {
      var node = audioContext.createOscillator();

      assert.throws(function() {
        node.stop(0);
      }, Error, "not start yet");

      node.start(0);

      assert.throws(function() {
        node.stop(-0.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
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
      var node = audioContext.createOscillator();
      var periodicWave = audioContext.createPeriodicWave(
        new Float32Array(128), new Float32Array(128)
      );

      node.setPeriodicWave(periodicWave);

      assert(node.type === "custom");
      assert(node.$custom === periodicWave);

      assert.throws(function() {
        node.setPeriodicWave("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a PeriodicWave/.test(e.message);
      });

      assert(node.setPeriodicWave === global.OscillatorNode.prototype.setPeriodicWave);
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
          inputs: [],
        },
        detune: {
          value: 0,
          inputs: [],
        },
        inputs: [],
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createOscillator();

      assert(node.$name === "OscillatorNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createOscillator();

      assert(node.$context === audioContext);
    });
  });

  describe("$state", function() {
    it("get: string", function() {
      var node = audioContext.createOscillator();

      assert(node.$state === "UNSCHEDULED");

      node.start(0);

      assert(node.$state === "PLAYING");
    });
  });

  describe("$stateAtTime", function() {
    it("(time: number|string): string", function() {
      var node = audioContext.createOscillator();

      assert(node.$stateAtTime("00:00.000") === "UNSCHEDULED");

      node.start(0);

      assert(node.$stateAtTime("00:00.000") === "PLAYING");
    });
  });

  describe("$startTime", function() {
    it("get: number", function() {
      var node = audioContext.createOscillator();

      assert(node.$startTime === Infinity);

      node.start(2);

      assert(node.$startTime === 2);
    });
  });

  describe("$stopTime", function() {
    it("get: number", function() {
      var node = audioContext.createOscillator();

      assert(node.$stopTime === Infinity);

      node.start(2);
      node.stop(3);

      assert(node.$stopTime === 3);
    });
  });

  describe("works", function() {
    it("onended", function() {
      var node = audioContext.createOscillator();
      var onended = sinon.spy();
      var event;

      node.onended = onended;

      node.connect(audioContext.destination);

      assert(node.$state === "UNSCHEDULED");

      node.start(0.100);
      node.stop(0.150);

      audioContext.$processTo("00:00.000");
      assert(node.$state === "SCHEDULED", "00:00.000");
      assert(onended.callCount === 0, "00:00.000");

      audioContext.$processTo("00:00.099");
      assert(node.$state === "SCHEDULED", "00:00.099");
      assert(onended.callCount === 0, "00:00.099");

      audioContext.$processTo("00:00.100");
      assert(node.$state === "PLAYING", "00:00.100");
      assert(onended.callCount === 0, "00:00.100");

      audioContext.$processTo("00:00.149");
      assert(node.$state === "PLAYING", "00:00.149");
      assert(onended.callCount === 0, "00:00.149");

      audioContext.$processTo("00:00.150");
      assert(node.$state === "FINISHED", "00:00.150");
      assert(onended.callCount === 1, "00:00.150");
      assert(onended.calledOn(node), "00:00.150");

      audioContext.$processTo("00:00.200");
      assert(node.$state === "FINISHED", "00:00.200");
      assert(onended.callCount === 1, "00:00.200");

      event = onended.args[0][0];

      assert(event instanceof WebAudioTestAPI.Event);
      assert(event.type === "ended");
      assert(event.target === node);

      assert(node.$stateAtTime("00:00.000") === "SCHEDULED");
      assert(node.$stateAtTime("00:00.099") === "SCHEDULED");
      assert(node.$stateAtTime("00:00.100") === "PLAYING");
      assert(node.$stateAtTime("00:00.149") === "PLAYING");
      assert(node.$stateAtTime("00:00.150") === "FINISHED");
      assert(node.$stateAtTime("00:00.200") === "FINISHED");
    });
  });
});
