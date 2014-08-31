/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("DynamicsCompressorNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new AudioContext();
    node = ctx.createDynamicsCompressor();
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
      expect(node.threshold).to.be.instanceOf(AudioParam);
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
      expect(node.knee).to.be.instanceOf(AudioParam);
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
      expect(node.ratio).to.be.instanceOf(AudioParam);
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
      expect(node.reduction).to.be.instanceOf(AudioParam);
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
      expect(node.attack).to.be.instanceOf(AudioParam);
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
      expect(node.release).to.be.instanceOf(AudioParam);
    });
  });

  describe("#toJSON", function() {
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
