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
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });

      assert.doesNotThrow(function() {
        audioContext.createDelay();
      });

      assert.throws(function() {
        audioContext.createDelay(undefined);
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });

      assert.throws(function() {
        return new global.DelayNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#delayTime", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createDelay();

      assert(node.delayTime instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.delayTime = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
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
