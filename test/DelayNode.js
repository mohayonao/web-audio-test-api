describe("DelayNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
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

  describe("#delayTime", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDelay();

      assert(node.delayTime instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.delayTime = 0;
      }, TypeError);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
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

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createDelay();

      assert(node.$name === "DelayNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createDelay();

      assert(node.$context === audioContext);
    });
  });

  describe("$maxDelayTime", function() {
    it("get: number", function() {
      var node = audioContext.createDelay(10);

      assert(typeof node.$maxDelayTime === "number");
      assert(node.$maxDelayTime === 10);
    });
  });
});
