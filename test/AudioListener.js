"use strict";

describe("AudioListener", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.AudioListener();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#dopplerFactor", function() {
    it("get/set: number", function() {
      var listener = new WebAudioTestAPI.AudioListener(audioContext);

      assert(typeof listener.dopplerFactor === "number");

      listener.dopplerFactor = 1;
      assert(listener.dopplerFactor === 1);

      listener.dopplerFactor = 2;
      assert(listener.dopplerFactor === 2);

      assert.throws(function() {
        listener.dopplerFactor = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#speedOfSound", function() {
    it("get/set: number", function() {
      var listener = new WebAudioTestAPI.AudioListener(audioContext);

      assert(typeof listener.speedOfSound === "number");

      listener.speedOfSound = 686.6;
      assert(listener.speedOfSound === 686.6);

      listener.speedOfSound = 1373.2;
      assert(listener.speedOfSound === 1373.2);

      assert.throws(function() {
        listener.speedOfSound = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#setPosition", function() {
    it("(x: number, y: number, z: number): void", function() {
      var listener = new WebAudioTestAPI.AudioListener(audioContext);

      listener.setPosition(0, 0, 0);

      assert.throws(function() {
        listener.setPosition("INVALID", 0, 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        listener.setPosition(0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        listener.setPosition(0, 0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#setOrientation", function() {
    it("(x: number, y: number, z: number, xUp: number, yUp: number, zUp: number): void", function() {
      var listener = new WebAudioTestAPI.AudioListener(audioContext);

      listener.setOrientation(0, 0, 0, 0, 0, 0);

      assert.throws(function() {
        listener.setOrientation("INVALID", 0, 0, 0, 0, 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        listener.setOrientation(0, "INVALID", 0, 0, 0, 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        listener.setOrientation(0, 0, "INVALID", 0, 0, 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        listener.setOrientation(0, 0, 0, "INVALID", 0, 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        listener.setOrientation(0, 0, 0, 0, "INVALID", 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        listener.setOrientation(0, 0, 0, 0, 0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#setVelocity", function() {
    it("(x: number, y: number, z: number): void", function() {
      var listener = new WebAudioTestAPI.AudioListener(audioContext);

      listener.setVelocity(0, 0, 0);

      assert.throws(function() {
        listener.setVelocity("INVALID", 0, 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        listener.setVelocity(0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        listener.setVelocity(0, 0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

});
