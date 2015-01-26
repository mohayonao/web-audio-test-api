"use strict";

describe("AudioNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createOscillator();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.AudioNode();
      }, TypeError, "Illegal constructor");
    });
  });

  describe("#context", function() {
    it("should be exist", function() {
      assert(node.context === ctx);
    });
  });

  describe("#numberOfInputs", function() {
    it("should be exist", function() {
      assert(typeof node.numberOfInputs === "number");
    });
  });

  describe("#numberOfOutputs", function() {
    it("should be exist", function() {
      assert(typeof node.numberOfOutputs === "number");
    });
  });

  describe("#channelCount", function() {
    it("should be exist", function() {
      assert(typeof node.channelCount === "number");
    });
  });

  describe("#channelCountMode", function() {
    it("should be exist", function() {
      assert(typeof node.channelCountMode === "string");
    });
  });

  describe("#channelInterpretation", function() {
    it("should be exist", function() {
      assert(typeof node.channelInterpretation === "string");
    });
  });

  describe("#connect(destination, output, input)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        node.connect(ctx.destination);
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        node.connect("INVALID");
      }, TypeError, "connect(destination, output, input)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.connect(ctx.destination, "INVALID");
      }, TypeError, "connect(destination, output, input)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.connect(ctx.destination, 0, "INVALID");
      }, TypeError, "connect(destination, output, input)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.connect(new global.AudioContext().destination);
      }, Error, "connect(destination, output, input): cannot connect to a destination belonging to a different audio context");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.connect(ctx.destination, 2);
      }, Error, "connect(destination, output, input): output index (2) exceeds number of outputs (1)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.connect(ctx.destination, 0, 2);
      }, Error, "connect(destination, output, input): input index (2) exceeds number of inputs (1)");
    });
  });

  describe("#disconnect(output)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        node.disconnect();
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        node.disconnect("INVALID");
      }, TypeError, "disconnect(output)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.disconnect(2);
      }, Error, "disconnect(output): output index (2) exceeds number of outputs (1)");
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
    it("return verbose json", function() {
      ctx.VERBOSE_JSON = true;

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
