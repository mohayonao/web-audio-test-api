/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("OscillatorNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createOscillator();
  });

  describe("#type", function() {
    it("should be exist", function() {
      expect(node).to.have.property("type");
    });
    it("should be an enum", function() {
      expect(function() {
        node.type = "sawtooth";
      }).to.not.throw();
      expect(function() {
        node.type = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#frequency", function() {
    it("should be exist", function() {
      expect(node).to.have.property("frequency");
    });
    it("should be readonly", function() {
      expect(function() {
        node.frequency = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.frequency).to.be.instanceOf(AudioParam);
    });
  });

  describe("#detune", function() {
    it("should be exist", function() {
      expect(node).to.have.property("detune");
    });
    it("should be readonly", function() {
      expect(function() {
        node.detune = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.detune).to.be.instanceOf(AudioParam);
    });
  });

  describe("#start(when)", function() {
    it("should work", function() {
      expect(function() {
        node.start();
      }).to.not.throw();
    });
    it("throw error", function() {
      expect(function() {
        node.start("INVALID");
      }).throw(Error, "OscillatorNode#start: 'when' should be a number");
    });
  });

  describe("#stop(when)", function() {
    it("should work", function() {
      expect(function() {
        node.stop();
      }).to.not.throw();
    });
    it("throw error", function() {
      expect(function() {
        node.stop("INVALID");
      }).throw(Error, "OscillatorNode#stop: 'when' should be a number");
    });
  });

  describe("#setPeriodicWave(periodicWave)", function() {
    it("should work", function() {
      expect(function() {
        node.setPeriodicWave(ctx.createPeriodicWave(new Float32Array(128), new Float32Array(128)));
      }).to.not.throw();
    });
    it("throw error", function() {
      expect(function() {
        node.setPeriodicWave("INVALID");
      }).throw(Error, "OscillatorNode#setPeriodicWave: 'periodicWave' should be a PeriodicWave");
    });
  });

});
