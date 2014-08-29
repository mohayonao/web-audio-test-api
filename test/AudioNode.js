/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("AudioNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createOscillator();
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

  describe("#connect(destination)", function() {
    it("should work", function() {
      expect(function() {
        node.connect(ctx.destination);
      }).not.throw();
    });
    it("throw error", function() {
      expect(function() {
        node.connect("INVALID");
      }).throw(Error, "AudioNode#connect: 'destination' should be an instance of AudioNode or AudioParam");
    });
    it("throw error", function() {
      expect(function() {
        node.connect(ctx.destination, "INVALID");
      }).throw(Error, "AudioNode#connect: 'output' should be a number");
    });
    it("throw error", function() {
      expect(function() {
        node.connect(ctx.destination, 0, "INVALID");
      }).throw(Error, "AudioNode#connect: 'input' should be a number");
    });
    it("throw error", function() {
      expect(function() {
        node.connect(new AudioContext().destination);
      }).throw(Error, "AudioNode#connect: cannot connect to a destination belonging to a different audio context");
    });
    it("throw error", function() {
      expect(function() {
        node.connect(ctx.destination, 2);
      }).throw(Error, "AudioNode#connect: output index (2) exceeds number of outputs (1)");
    });
    it("throw error", function() {
      expect(function() {
        node.connect(ctx.destination, 0, 2);
      }).throw(Error, "AudioNode#connect: input index (2) exceeds number of inputs (1)");
    });

    it.skip("circular check", function() {});
  });

  describe("#disconnect()", function() {
    it("should work", function() {
      expect(function() {
        node.disconnect();
      }).not.throw();
    });
    it("throw error", function() {
      expect(function() {
        node.disconnect("INVALID");
      }).throw(Error, "AudioNode#disconnect: should be a number");
    });
    it("throw error", function() {
      expect(function() {
        node.disconnect(2);
      }).throw(Error, "AudioNode#disconnect: output index (2) exceeds number of outputs (1)");
    });
  });

});
