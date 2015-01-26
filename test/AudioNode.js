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
      expect(function() {
        return new global.AudioNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
  });

  describe("#context", function() {
    it("should be exist", function() {
      expect(node).to.have.property("context", ctx);
    });
  });

  describe("#numberOfInputs", function() {
    it("should be exist", function() {
      expect(node).to.have.property("numberOfInputs");
    });
  });

  describe("#numberOfOutputs", function() {
    it("should be exist", function() {
      expect(node).to.have.property("numberOfOutputs");
    });
  });

  describe("#channelCount", function() {
    it("should be exist", function() {
      expect(node).to.have.property("channelCount");
    });
  });

  describe("#channelCountMode", function() {
    it("should be exist", function() {
      expect(node).to.have.property("channelCountMode");
    });
  });

  describe("#channelInterpretation", function() {
    it("should be exist", function() {
      expect(node).to.have.property("channelInterpretation");
    });
  });

  describe("#connect(destination, output, input)", function() {
    it("should work", function() {
      expect(function() {
        node.connect(ctx.destination);
      }).not.throw();
    });
    it("throw error", function() {
      expect(function() {
        node.connect("INVALID");
      }).throw(TypeError, "connect(destination, output, input)");
    });
    it("throw error", function() {
      expect(function() {
        node.connect(ctx.destination, "INVALID");
      }).throw(TypeError, "connect(destination, output, input)");
    });
    it("throw error", function() {
      expect(function() {
        node.connect(ctx.destination, 0, "INVALID");
      }).throw(TypeError, "connect(destination, output, input)");
    });
    it("throw error", function() {
      expect(function() {
        node.connect(new global.AudioContext().destination);
      }).throw(Error, "connect(destination, output, input): cannot connect to a destination belonging to a different audio context");
    });
    it("throw error", function() {
      expect(function() {
        node.connect(ctx.destination, 2);
      }).throw(Error, "connect(destination, output, input): output index (2) exceeds number of outputs (1)");
    });
    it("throw error", function() {
      expect(function() {
        node.connect(ctx.destination, 0, 2);
      }).throw(Error, "connect(destination, output, input): input index (2) exceeds number of inputs (1)");
    });
  });

  describe("#disconnect(output)", function() {
    it("should work", function() {
      expect(function() {
        node.disconnect();
      }).not.throw();
    });
    it("throw error", function() {
      expect(function() {
        node.disconnect("INVALID");
      }).throw(TypeError, "disconnect(output)");
    });
    it("throw error", function() {
      expect(function() {
        node.disconnect(2);
      }).throw(Error, "disconnect(output): output index (2) exceeds number of outputs (1)");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      expect(node.toJSON()).to.eql({
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

      expect(node.toJSON()).to.eql({
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
