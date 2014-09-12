/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-test-api");

describe("OscillatorNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createOscillator();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new OscillatorNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(AudioNode);
    });
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
      }).throw(TypeError, "OscillatorNode#start(when)");
    });
    it("throw error if called more than once", function() {
      node.start(0);
      expect(function() {
        node.start(0);
      }).to.throw(Error);
    });
  });

  describe("#stop(when)", function() {
    it("should work", function() {
      expect(node.$state).to.equal("init");
      node.start();
      expect(node.$state).to.equal("start");
      expect(function() {
        node.stop();
      }).to.not.throw();
      expect(node.$state).to.equal("stop");
    });
    it("throw error", function() {
      node.start();
      expect(function() {
        node.stop("INVALID");
      }).to.throw(TypeError, "OscillatorNode#stop(when)");
    });
    it("throw error if called without calling start first", function() {
      expect(function() {
        node.stop();
      }).to.throw(Error);
    });
    it("throw error if called more than once", function() {
      node.start();
      node.stop();
      expect(function() {
        node.stop();
      }).to.throw(Error);
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
      }).throw(TypeError, "OscillatorNode#setPeriodicWave(periodicWave)");
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
  });

});
