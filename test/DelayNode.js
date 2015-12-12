describe("DelayNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createDelay();

      assert(node instanceof global.DelayNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        audioContext.createDelay("INVALID");
      }, TypeError);

      assert.doesNotThrow(function() {
        audioContext.createDelay();
      });

      assert.throws(function() {
        audioContext.createDelay(undefined);
      }, TypeError);

      assert.throws(function() {
        return new global.DelayNode();
      }, TypeError);
    });
  });

  describe("#delayTime: AudioParam", function() {
    it("works", function() {
      var node = audioContext.createDelay();

      assert(node.delayTime instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.delayTime = 0;
      }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createDelay();

      assert.deepEqual(node.toJSON(), {
        name: "DelayNode",
        delayTime: {
          value: 0,
          inputs: []
        },
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createDelay();

      assert(node.$name === "DelayNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createDelay();

      assert(node.$context === audioContext);
    });
  });

  describe("$maxDelayTime: number", function() {
    it("works", function() {
      var node = audioContext.createDelay(10);

      assert(typeof node.$maxDelayTime === "number");
      assert(node.$maxDelayTime === 10);
    });
  });
});
