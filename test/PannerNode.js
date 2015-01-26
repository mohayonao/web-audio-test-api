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
      expect(function() {
        return new global.PannerNode();
      }).to.throw(TypeError, "Illegal constructor");
    });
    it("should have been inherited from AudioNode", function() {
      expect(node).to.be.instanceOf(global.AudioNode);
    });
  });

  describe("#panningModel", function() {
    it("should be exist", function() {
      expect(node).to.have.property("panningModel");
    });
    it("should be an enum", function() {
      expect(function() {
        node.panningModel = "equalpower";
      }).to.not.throw();
      expect(function() {
        node.panningModel = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#distanceModel", function() {
    it("should be exist", function() {
      expect(node).to.have.property("distanceModel");
    });
    it("should be an enum", function() {
      expect(function() {
        node.distanceModel = "linear";
      }).to.not.throw();
      expect(function() {
        node.distanceModel = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#refDistance", function() {
    it("should be exist", function() {
      expect(node).to.have.property("refDistance");
    });
    it("should be type of number", function() {
      expect(function() {
        node.refDistance = 0;
      }).to.not.throw();
      expect(function() {
        node.refDistance = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#maxDistance", function() {
    it("should be exist", function() {
      expect(node).to.have.property("maxDistance");
    });
    it("should be type of number", function() {
      expect(function() {
        node.maxDistance = 0;
      }).to.not.throw();
      expect(function() {
        node.maxDistance = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#rolloffFactor", function() {
    it("should be exist", function() {
      expect(node).to.have.property("rolloffFactor");
    });
    it("should be type of number", function() {
      expect(function() {
        node.rolloffFactor = 0;
      }).to.not.throw();
      expect(function() {
        node.rolloffFactor = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#coneInnerAngle", function() {
    it("should be exist", function() {
      expect(node).to.have.property("coneInnerAngle");
    });
    it("should be type of number", function() {
      expect(function() {
        node.coneInnerAngle = 0;
      }).to.not.throw();
      expect(function() {
        node.coneInnerAngle = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#coneOuterAngle", function() {
    it("should be exist", function() {
      expect(node).to.have.property("coneOuterAngle");
    });
    it("should be type of number", function() {
      expect(function() {
        node.coneOuterAngle = 0;
      }).to.not.throw();
      expect(function() {
        node.coneOuterAngle = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#coneOuterGain", function() {
    it("should be exist", function() {
      expect(node).to.have.property("coneOuterGain");
    });
    it("should be type of number", function() {
      expect(function() {
        node.coneOuterGain = 0;
      }).to.not.throw();
      expect(function() {
        node.coneOuterGain = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#setPosition(x, y, z)", function() {
    it("should work", function() {
      node.setPosition(0, 0, 0);
    });
    it("throw error", function() {
      expect(function() {
        node.setPosition("INVALID", 0, 0);
      }).to.throw(TypeError, "PannerNode#setPosition(x, y, z)");
    });
    it("throw error", function() {
      expect(function() {
        node.setPosition(0, "INVALID", 0);
      }).to.throw(TypeError, "PannerNode#setPosition(x, y, z)");
    });
    it("throw error", function() {
      expect(function() {
        node.setPosition(0, 0, "INVALID");
      }).to.throw(TypeError, "PannerNode#setPosition(x, y, z)");
    });
  });

  describe("#setOrientation(x, y, z)", function() {
    it("should work", function() {
      node.setOrientation(0, 0, 0);
    });
    it("throw error", function() {
      expect(function() {
        node.setOrientation("INVALID", 0, 0);
      }).to.throw(TypeError, "PannerNode#setOrientation(x, y, z)");
    });
    it("throw error", function() {
      expect(function() {
        node.setOrientation(0, "INVALID", 0);
      }).to.throw(TypeError, "PannerNode#setOrientation(x, y, z)");
    });
    it("throw error", function() {
      expect(function() {
        node.setOrientation(0, 0, "INVALID");
      }).to.throw(TypeError, "PannerNode#setOrientation(x, y, z)");
    });
  });

  describe("#setVelocity(x, y, z)", function() {
    it("should work", function() {
      node.setVelocity(0, 0, 0);
    });
    it("throw error", function() {
      expect(function() {
        node.setVelocity("INVALID", 0, 0);
      }).to.throw(TypeError, "PannerNode#setVelocity(x, y, z)");
    });
    it("throw error", function() {
      expect(function() {
        node.setVelocity(0, "INVALID", 0);
      }).to.throw(TypeError, "PannerNode#setVelocity(x, y, z)");
    });
    it("throw error", function() {
      expect(function() {
        node.setVelocity(0, 0, "INVALID");
      }).to.throw(TypeError, "PannerNode#setVelocity(x, y, z)");
    });
  });

  describe("#toJSON()", function() {
    it("return json", function() {
      expect(node.toJSON()).to.eql({
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
