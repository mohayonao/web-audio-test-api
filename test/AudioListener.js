"use strict";

describe("AudioListener", function() {
  var ctx = null;
  var listener = null;

  beforeEach(function() {
    ctx = new AudioContext();
    listener = ctx.listener;
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new AudioListener();
      }).to.throw(TypeError, "Illegal constructor");
    });
  });

  describe("#dopplerFactor", function() {
    it("should be exist", function() {
      expect(listener).to.have.property("dopplerFactor");
    });
    it("should be type of number", function() {
      expect(function() {
         listener.dopplerFactor = 0;
      }).to.not.throw();
      expect(function() {
        listener.dopplerFactor = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#speedOfSound", function() {
    it("should be exist", function() {
      expect(listener).to.have.property("speedOfSound");
    });
    it("should be type of number", function() {
      expect(function() {
         listener.speedOfSound = 0;
      }).to.not.throw();
      expect(function() {
        listener.speedOfSound = "INVALID";
      }).to.throw(TypeError);
    });
  });
  describe("#setPosition(x, y, z)", function() {
    it("should work", function() {
      listener.setPosition(0, 0, 0);
    });
    it("throw error", function() {
      expect(function() {
        listener.setPosition("INVALID", 0, 0);
      }).to.throw(TypeError, "AudioListener#setPosition(x, y, z)");
    });
    it("throw error", function() {
      expect(function() {
        listener.setPosition(0, "INVALID", 0);
      }).to.throw(TypeError, "AudioListener#setPosition(x, y, z)");
    });
    it("throw error", function() {
      expect(function() {
        listener.setPosition(0, 0, "INVALID");
      }).to.throw(TypeError, "AudioListener#setPosition(x, y, z)");
    });
  });

  describe("#setOrientation(x, y, z, xUp, yUp, zUp)", function() {
    it("should work", function() {
      listener.setOrientation(0, 0, 0, 0, 0, 0);
    });
    it("throw error", function() {
      expect(function() {
        listener.setOrientation("INVALID", 0, 0, 0, 0, 0);
      }).to.throw(TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
    it("throw error", function() {
      expect(function() {
        listener.setOrientation(0, "INVALID", 0, 0, 0, 0);
      }).to.throw(TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
    it("throw error", function() {
      expect(function() {
        listener.setOrientation(0, 0, "INVALID", 0, 0, 0);
      }).to.throw(TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
    it("throw error", function() {
      expect(function() {
        listener.setOrientation(0, 0, 0, "INVALID", 0, 0);
      }).to.throw(TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
    it("throw error", function() {
      expect(function() {
        listener.setOrientation(0, 0, 0, 0, "INVALID", 0);
      }).to.throw(TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
    it("throw error", function() {
      expect(function() {
        listener.setOrientation(0, 0, 0, 0, 0, "INVALID");
      }).to.throw(TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
  });

  describe("#setVelocity(x, y, z)", function() {
    it("should work", function() {
      listener.setVelocity(0, 0, 0);
    });
    it("throw error", function() {
      expect(function() {
        listener.setVelocity("INVALID", 0, 0);
      }).to.throw(TypeError, "AudioListener#setVelocity(x, y, z)");
    });
    it("throw error", function() {
      expect(function() {
        listener.setVelocity(0, "INVALID", 0);
      }).to.throw(TypeError, "AudioListener#setVelocity(x, y, z)");
    });
    it("throw error", function() {
      expect(function() {
        listener.setVelocity(0, 0, "INVALID");
      }).to.throw(TypeError, "AudioListener#setVelocity(x, y, z)");
    });
  });

});
