"use strict";

describe("AudioNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.AudioNode();
      }, TypeError);
    });
  });

  describe("#context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createOscillator();

      assert(node.context === audioContext);

      assert.throws(function() {
        node.context = null;
      }, Error);
    });
  });

  describe("#numberOfInputs", function() {
    it("get: number", function() {
      var node = audioContext.createOscillator();

      assert(typeof node.numberOfInputs === "number");

      assert.throws(function() {
        node.numberOfInputs = null;
      }, Error);
    });
  });

  describe("#numberOfOutputs", function() {
    it("get: number", function() {
      var node = audioContext.createOscillator();

      assert(typeof node.numberOfOutputs === "number");

      assert.throws(function() {
        node.numberOfOutputs = null;
      }, Error);
    });
  });

  describe("#channelCount", function() {
    it("get/set: number", function() {
      var node = audioContext.createOscillator();

      assert(typeof node.channelCount === "number");
    });
  });

  describe("#channelCountMode", function() {
    it("get/set: enum[max, clamped-max, explicit]", function() {
      var node = audioContext.createOscillator();

      assert(typeof node.channelCountMode === "string");
    });
  });

  describe("#channelInterpretation", function() {
    it("get/set: enum[speakers, discrete]", function() {
      var node = audioContext.createOscillator();

      assert(typeof node.channelInterpretation === "string");
    });
  });

  describe("#connect", function() {
    it("(destination: AudioNode, [output: number], [input: number]): void", function() {
      var node = audioContext.createOscillator();

      node.connect(audioContext.destination);

      node.connect(audioContext.destination, 0, 0);

      assert.throws(function() {
        node.connect(audioContext.destination, 2);
      }, Error);

      assert.throws(function() {
        node.connect(audioContext.destination, 0, 2);
      }, Error);

      assert.throws(function() {
        node.connect("INVALID");
      }, TypeError);

      assert.throws(function() {
        node.connect(audioContext.destination, "INVALID");
      }, TypeError);

      assert.throws(function() {
        node.connect(audioContext.destination, 0, "INVALID");
      }, TypeError);

      var anotherAudioContext = new global.AudioContext();

      assert.throws(function() {
        node.connect(anotherAudioContext.destination);
      }, Error);
    });
  });

  describe("#disconnect", function() {
    it("([output: number]): void", function() {
      var node = audioContext.createOscillator();

      node.disconnect();
      node.disconnect(0);

      assert.throws(function() {
        node.disconnect("INVALID");
      }, TypeError);

      assert.throws(function() {
        node.disconnect(2);
      }, Error);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createOscillator();

      audioContext.VERBOSE_JSON = true;

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
        numberOfInputs: 0,
        numberOfOutputs: 1,
        channelCount: 2,
        channelCountMode: "max",
        channelInterpretation: "speakers",
        inputs: []
      });
    });
  });

});
