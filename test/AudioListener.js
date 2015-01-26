"use strict";

describe("AudioListener", function() {
  var ctx = null;
  var listener = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    listener = ctx.listener;
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.AudioListener();
      }, TypeError, "Illegal constructor");
    });
  });

  describe("#dopplerFactor", function() {
    it("should be exist", function() {
      assert(typeof listener.dopplerFactor === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
         listener.dopplerFactor = 0;
      });
      assert.throws(function() {
        listener.dopplerFactor = "INVALID";
      }, TypeError);
    });
  });

  describe("#speedOfSound", function() {
    it("should be exist", function() {
      assert(typeof listener.speedOfSound === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
         listener.speedOfSound = 0;
      });
      assert.throws(function() {
        listener.speedOfSound = "INVALID";
      }, TypeError);
    });
  });
  describe("#setPosition(x, y, z)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        listener.setPosition(0, 0, 0);
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setPosition("INVALID", 0, 0);
      }, TypeError, "AudioListener#setPosition(x, y, z)");
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setPosition(0, "INVALID", 0);
      }, TypeError, "AudioListener#setPosition(x, y, z)");
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setPosition(0, 0, "INVALID");
      }, TypeError, "AudioListener#setPosition(x, y, z)");
    });
  });

  describe("#setOrientation(x, y, z, xUp, yUp, zUp)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        listener.setOrientation(0, 0, 0, 0, 0, 0);
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setOrientation("INVALID", 0, 0, 0, 0, 0);
      }, TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setOrientation(0, "INVALID", 0, 0, 0, 0);
      }, TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setOrientation(0, 0, "INVALID", 0, 0, 0);
      }, TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setOrientation(0, 0, 0, "INVALID", 0, 0);
      }, TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setOrientation(0, 0, 0, 0, "INVALID", 0);
      }, TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setOrientation(0, 0, 0, 0, 0, "INVALID");
      }, TypeError, "AudioListener#setOrientation(x, y, z, xUp, yUp, zUp)");
    });
  });

  describe("#setVelocity(x, y, z)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        listener.setVelocity(0, 0, 0);
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setVelocity("INVALID", 0, 0);
      }, TypeError, "AudioListener#setVelocity(x, y, z)");
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setVelocity(0, "INVALID", 0);
      }, TypeError, "AudioListener#setVelocity(x, y, z)");
    });
    it("throw error", function() {
      assert.throws(function() {
        listener.setVelocity(0, 0, "INVALID");
      }, TypeError, "AudioListener#setVelocity(x, y, z)");
    });
  });

});
