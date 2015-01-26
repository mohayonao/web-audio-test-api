"use strict";

describe("DynamicsCompressorNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createDynamicsCompressor();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new global.DynamicsCompressorNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(global.AudioNode);
    });
  });

  describe("#threshold", function() {
    it("should be exist", function() {
      expect(node).to.have.property("threshold");
    });
    it("should be readonly", function() {
      expect(function() {
        node.threshold = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.threshold).to.be.instanceOf(global.AudioParam);
    });
  });

  describe("#knee", function() {
    it("should be exist", function() {
      expect(node).to.have.property("knee");
    });
    it("should be readonly", function() {
      expect(function() {
        node.knee = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.knee).to.be.instanceOf(global.AudioParam);
    });
  });

  describe("#ratio", function() {
    it("should be exist", function() {
      expect(node).to.have.property("ratio");
    });
    it("should be readonly", function() {
      expect(function() {
        node.ratio = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.ratio).to.be.instanceOf(global.AudioParam);
    });
  });

  describe("#reduction", function() {
    it("should be exist", function() {
      expect(node).to.have.property("reduction");
    });
    it("should be readonly", function() {
      expect(function() {
        node.reduction = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.reduction).to.be.instanceOf(global.AudioParam);
    });
  });

  describe("#attack", function() {
    it("should be exist", function() {
      expect(node).to.have.property("attack");
    });
    it("should be readonly", function() {
      expect(function() {
        node.attack = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.attack).to.be.instanceOf(global.AudioParam);
    });
  });

  describe("#release", function() {
    it("should be exist", function() {
      expect(node).to.have.property("release");
    });
    it("should be readonly", function() {
      expect(function() {
        node.release = 0;
      }).to.throw(Error, "readonly");
    });
    it("should be an instance of AudioParam", function() {
      expect(node.release).to.be.instanceOf(global.AudioParam);
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      expect(node.toJSON()).to.eql({
        name: "DynamicsCompressorNode",
        threshold: {
          value: -24,
          inputs: []
        },
        knee: {
          value: 30,
          inputs: []
        },
        ratio: {
          value: 12,
          inputs: []
        },
        reduction: {
          value: 0,
          inputs: []
        },
        attack: {
          value: 0.003,
          inputs: []
        },
        release: {
          value: 0.25,
          inputs: []
        },
        inputs: []
      });
    });
  });

});
