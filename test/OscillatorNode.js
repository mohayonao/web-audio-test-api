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
      expect(function() {
        return new global.OscillatorNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(global.AudioNode);
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
      expect(node.frequency).to.be.instanceOf(global.AudioParam);
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
      expect(node.detune).to.be.instanceOf(global.AudioParam);
    });
  });

  describe("#onended", function() {
    it("should be exist", function() {
      expect(node).to.have.property("onended");
    });
    it("should be a function", function() {
      expect(function() {
        node.onended = it;
        expect(node.onended).to.equal(it);
      }).to.not.throw();
      expect(function() {
        node.onended = it;
        node.onended = null;
        expect(node.onended).to.equal(null);
      }, "nullable").to.not.throw();
      expect(function() {
        node.onended = "INVALID";
      }).to.throw(TypeError);
    });
    it("works", function() {
      var passed = 0;

      node.onended = function() {
        passed += 1;
      };

      node.connect(node.context.destination);
      node.start(0);
      node.stop(0.15);

      expect(passed, "00:00.000").to.equal(0);

      node.context.$processTo("00:00.100");
      expect(passed, "00:00.100").to.equal(0);

      node.context.$processTo("00:00.200");
      expect(passed, "00:00.200").to.equal(1);

      node.context.$processTo("00:00.300");
      expect(passed, "00:00.300").to.equal(1);
    });
  });

  describe("#$state", function() {
    it("return #$stateAtTime(currentTime)", function() {
      expect(node.$state).to.equal("UNSCHEDULED");

      node.start(0.1);
      expect(node.$state).to.equal("SCHEDULED");

      node.context.$processTo("00:00.100");
      expect(node.$state).to.equal("PLAYING");

      node.stop(0.2);
      expect(node.$state).to.equal("PLAYING");

      node.context.$processTo("00:00.200");
      expect(node.$state).to.equal("FINISHED");
    });
  });

  describe("#$stateAtTime(t)", function() {
    it("return the state at the specified time", function() {

      node.start(0.1);
      node.stop(0.2);

      expect(node.$stateAtTime(0.05)).to.equal("SCHEDULED");
      expect(node.$stateAtTime(0.15)).to.equal("PLAYING");
      expect(node.$stateAtTime(0.25)).to.equal("FINISHED");
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
      node.start();
      expect(function() {
        node.stop();
      }).to.not.throw();
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
      var periodicWave = ctx.createPeriodicWave(new Float32Array(128), new Float32Array(128));
      expect(function() {
        node.setPeriodicWave(periodicWave);
      }).to.not.throw();
      expect(node.type).to.equal("custom");
      expect(node.$custom).to.equal(periodicWave);
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
