"use strict";

describe("AudioListener", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.AudioListener();
      }, TypeError);
    });
  });

  describe("#dopplerFactor", function() {
    it("get/set: number", function() {
      var listener = audioContext.listener;

      assert(typeof listener.dopplerFactor === "number");

      listener.dopplerFactor = 1;
      assert(listener.dopplerFactor === 1);

      listener.dopplerFactor = 2;
      assert(listener.dopplerFactor === 2);

      assert.throws(function() {
        listener.dopplerFactor = "INVALID";
      }, TypeError);
    });
  });

  describe("#speedOfSound", function() {
    it("get/set: number", function() {
      var listener = audioContext.listener;

      assert(typeof listener.speedOfSound === "number");

      listener.speedOfSound = 686.6;
      assert(listener.speedOfSound === 686.6);

      listener.speedOfSound = 1373.2;
      assert(listener.speedOfSound === 1373.2);

      assert.throws(function() {
        listener.speedOfSound = "INVALID";
      }, TypeError);
    });
  });

  describe("#setPosition", function() {
    it("(x: number, y: number, z: number): void", function() {
      var listener = audioContext.listener;

      listener.setPosition(0, 0, 0);

      assert.throws(function() {
        listener.setPosition("INVALID", 0, 0);
      }, TypeError);

      assert.throws(function() {
        listener.setPosition(0, "INVALID");
      }, TypeError);

      assert.throws(function() {
        listener.setPosition(0, 0, "INVALID");
      }, TypeError);
    });
  });

  describe("#setOrientation", function() {
    it("(x: number, y: number, z: number, xUp: number, yUp: number, zUp: number): void", function() {
      var listener = audioContext.listener;

      listener.setOrientation(0, 0, 0, 0, 0, 0);

      assert.throws(function() {
        listener.setOrientation("INVALID", 0, 0, 0, 0, 0);
      }, TypeError);

      assert.throws(function() {
        listener.setOrientation(0, "INVALID", 0, 0, 0, 0);
      }, TypeError);

      assert.throws(function() {
        listener.setOrientation(0, 0, "INVALID", 0, 0, 0);
      }, TypeError);

      assert.throws(function() {
        listener.setOrientation(0, 0, 0, "INVALID", 0, 0);
      }, TypeError);

      assert.throws(function() {
        listener.setOrientation(0, 0, 0, 0, "INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        listener.setOrientation(0, 0, 0, 0, 0, "INVALID");
      }, TypeError);
    });
  });

  describe("#setVelocity", function() {
    it("(x: number, y: number, z: number): void", function() {
      var listener = audioContext.listener;

      listener.setVelocity(0, 0, 0);

      assert.throws(function() {
        listener.setVelocity("INVALID", 0, 0);
      }, TypeError);

      assert.throws(function() {
        listener.setVelocity(0, "INVALID");
      }, TypeError);

      assert.throws(function() {
        listener.setVelocity(0, 0, "INVALID");
      }, TypeError);
    });
  });

});
