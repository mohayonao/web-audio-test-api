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
      assert.throws(function() {
        return new global.DynamicsCompressorNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("#threshold", function() {
    it("should be exist", function() {
      assert(node.threshold instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.threshold = 0;
      }, Error, "readonly");
    });
  });

  describe("#knee", function() {
    it("should be exist", function() {
      assert(node.knee instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.knee = 0;
      }, Error, "readonly");
    });
  });

  describe("#ratio", function() {
    it("should be exist", function() {
      assert(node.ratio instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.ratio = 0;
      }, Error, "readonly");
    });
  });

  describe("#reduction", function() {
    it("should be exist", function() {
      assert(node.reduction instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.reduction = 0;
      }, Error, "readonly");
    });
  });

  describe("#attack", function() {
    it("should be exist", function() {
      assert(node.attack instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.attack = 0;
      }, Error, "readonly");
    });
  });

  describe("#release", function() {
    it("should be exist", function() {
      assert(node.release instanceof global.AudioParam);
    });
    it("should be readonly", function() {
      assert.throws(function() {
        node.release = 0;
      }, Error, "readonly");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
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
