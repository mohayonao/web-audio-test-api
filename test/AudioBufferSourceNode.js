"use strict";

describe("AudioBufferSourceNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createBufferSource();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new AudioBufferSourceNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(AudioNode);
    });
  });

  describe("#buffer", function() {
    it("should be exist", function() {
      expect(node).to.have.property("buffer");
    });
  });

  describe("#playbackRate", function() {
    it("should be exist", function() {
      expect(node).to.have.property("playbackRate");
    });
    it("should be readonly", function() {
      expect(function() {
        node.playbackRate = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.playbackRate).to.be.instanceOf(AudioParam);
    });
  });

  describe("#loop", function() {
    it("should be exist", function() {
      expect(node).to.have.property("loop");
    });
    it("should be a boolean", function() {
      expect(function() {
        node.loop = true;
      }).to.not.throw();
      expect(function() {
        node.loop = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#loopStart", function() {
    it("should be exist", function() {
      expect(node).to.have.property("loopStart");
    });
    it("should be a number", function() {
      expect(function() {
        node.loopStart = 0;
      }).to.not.throw();
      expect(function() {
        node.loopStart = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#loopEnd", function() {
    it("should be exist", function() {
      expect(node).to.have.property("loopEnd");
    });
    it("should be a number", function() {
      expect(function() {
        node.loopEnd = 0;
      }).to.not.throw();
      expect(function() {
        node.loopEnd = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#onended", function() {
    it("should be exist", function() {
      expect(node).to.have.property("onended");
    });
    it("should be a function", function() {
      expect(function() {
        node.onended = function() {};
      }).to.not.throw();
      expect(function() {
        node.onended = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#$state", function() {
    it("return #$stateAtTime(currentTime)", function() {
      expect(node.$state).to.equal("UNSCHEDULED");

      node.start(0.1);
      expect(node.$state).to.equal("SCHEDULED");

      ctx.$process(0.1);
      expect(node.$state).to.equal("PLAYING");

      node.stop(0.2);
      expect(node.$state).to.equal("PLAYING");

      ctx.$process(0.1);
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

  describe("#start(when, offset, duration)", function() {
    it("should work", function() {
      expect(function() {
        node.start();
      }).to.not.throw();
    });
    it("throw error", function() {
      expect(function() {
        node.start("INVALID");
      }).throw(TypeError, "AudioBufferSourceNode#start(when, offset, duration)");
    });
    it("throw error", function() {
      expect(function() {
        node.start(0, "INVALID");
      }).throw(TypeError, "AudioBufferSourceNode#start(when, offset, duration)");
    });
    it("throw error", function() {
      expect(function() {
        node.start(0, 0, "INVALID");
      }).throw(TypeError, "AudioBufferSourceNode#start(when, offset, duration)");
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
      }).to.throw(TypeError, "AudioBufferSourceNode#stop(when)");
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

  describe("#toJSON()", function() {
    it("return json", function() {
      expect(node.toJSON()).to.eql({
        name: "AudioBufferSourceNode",
        buffer: null,
        playbackRate: {
          value: 1,
          inputs: []
        },
        loop: false,
        loopStart: 0,
        loopEnd: 0,
        inputs: []
      });
    });
  });

});
