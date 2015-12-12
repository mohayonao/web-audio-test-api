describe("AudioListener", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var listener = audioContext.listener;

      assert(listener instanceof global.AudioListener);

      assert.throws(function() {
        return new global.AudioListener();
      }, TypeError);
    });
  });

  describe("#dopplerFactor: number", function() {
    it("works", function() {
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

  describe("#speedOfSound: number", function() {
    it("works", function() {
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

  describe("#setPosition(x: number, y: number, z: number): void", function() {
    it("works", function() {
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

  describe("#setOrientation(x: number, y: number, z: number, xUp: number, yUp: number, zUp: number): void", function() {
    it("works", function() {
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

  describe("#setVelocity(x: number, y: number, z: number): void", function() {
    it("works", function() {
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

  describe("$name: string", function() {
    it("works", function() {
      var listener = audioContext.listener;

      assert(listener.$name === "AudioListener");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var listener = audioContext.listener;

      assert(listener.$context === audioContext);
    });
  });
});
