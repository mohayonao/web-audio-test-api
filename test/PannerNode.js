"use strict";

describe("PannerNode", function() {
  var ctx = null;
  var node = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    node = ctx.createPanner();
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.PannerNode();
      }, TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      assert(node instanceof global.AudioNode);
    });
  });

  describe("#panningModel", function() {
    it("should be exist", function() {
      assert(typeof node.panningModel === "string");
    });
    it("should be an enum", function() {
      assert.doesNotThrow(function() {
        node.panningModel = "equalpower";
      });
      assert.throws(function() {
        node.panningModel = "INVALID";
      }, TypeError);
    });
  });

  describe("#distanceModel", function() {
    it("should be exist", function() {
      assert(typeof node.distanceModel === "string");
    });
    it("should be an enum", function() {
      assert.doesNotThrow(function() {
        node.distanceModel = "linear";
      });
      assert.throws(function() {
        node.distanceModel = "INVALID";
      }, TypeError);
    });
  });

  describe("#refDistance", function() {
    it("should be exist", function() {
      assert(typeof node.refDistance === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
        node.refDistance = 0;
      });
      assert.throws(function() {
        node.refDistance = "INVALID";
      }, TypeError);
    });
  });

  describe("#maxDistance", function() {
    it("should be exist", function() {
      assert(typeof node.maxDistance === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
        node.maxDistance = 0;
      });
      assert.throws(function() {
        node.maxDistance = "INVALID";
      }, TypeError);
    });
  });

  describe("#rolloffFactor", function() {
    it("should be exist", function() {
      assert(typeof node.rolloffFactor === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
        node.rolloffFactor = 0;
      });
      assert.throws(function() {
        node.rolloffFactor = "INVALID";
      }, TypeError);
    });
  });

  describe("#coneInnerAngle", function() {
    it("should be exist", function() {
      assert(typeof node.coneInnerAngle === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
        node.coneInnerAngle = 0;
      });
      assert.throws(function() {
        node.coneInnerAngle = "INVALID";
      }, TypeError);
    });
  });

  describe("#coneOuterAngle", function() {
    it("should be exist", function() {
      assert(typeof node.coneOuterAngle === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
        node.coneOuterAngle = 0;
      });
      assert.throws(function() {
        node.coneOuterAngle = "INVALID";
      }, TypeError);
    });
  });

  describe("#coneOuterGain", function() {
    it("should be exist", function() {
      assert(typeof node.coneOuterGain === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
        node.coneOuterGain = 0;
      });
      assert.throws(function() {
        node.coneOuterGain = "INVALID";
      }, TypeError);
    });
  });

  describe("#setPosition(x, y, z)", function() {
    it("should work", function() {
      node.setPosition(0, 0, 0);
    });
    it("throw error", function() {
      assert.throws(function() {
        node.setPosition("INVALID", 0, 0);
      }, TypeError, "PannerNode#setPosition(x, y, z)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.setPosition(0, "INVALID", 0);
      }, TypeError, "PannerNode#setPosition(x, y, z)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.setPosition(0, 0, "INVALID");
      }, TypeError, "PannerNode#setPosition(x, y, z)");
    });
  });

  describe("#setOrientation(x, y, z)", function() {
    it("should work", function() {
      node.setOrientation(0, 0, 0);
    });
    it("throw error", function() {
      assert.throws(function() {
        node.setOrientation("INVALID", 0, 0);
      }, TypeError, "PannerNode#setOrientation(x, y, z)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.setOrientation(0, "INVALID", 0);
      }, TypeError, "PannerNode#setOrientation(x, y, z)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.setOrientation(0, 0, "INVALID");
      }, TypeError, "PannerNode#setOrientation(x, y, z)");
    });
  });

  describe("#setVelocity(x, y, z)", function() {
    it("should work", function() {
      node.setVelocity(0, 0, 0);
    });
    it("throw error", function() {
      assert.throws(function() {
        node.setVelocity("INVALID", 0, 0);
      }, TypeError, "PannerNode#setVelocity(x, y, z)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.setVelocity(0, "INVALID", 0);
      }, TypeError, "PannerNode#setVelocity(x, y, z)");
    });
    it("throw error", function() {
      assert.throws(function() {
        node.setVelocity(0, 0, "INVALID");
      }, TypeError, "PannerNode#setVelocity(x, y, z)");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      assert.deepEqual(node.toJSON(), {
        name: "PannerNode",
        panningModel: "HRTF",
        distanceModel: "inverse",
        refDistance: 1,
        maxDistance: 10000,
        rolloffFactor: 1,
        coneInnerAngle: 360,
        coneOuterAngle: 360,
        coneOuterGain: 0,
        inputs: []
      });
    });
  });

});
