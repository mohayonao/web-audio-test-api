describe("StereoPannerNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createStereoPanner();

      assert(node instanceof global.StereoPannerNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.StereoPannerNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#pan", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createStereoPanner();

      assert(node.pan instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.pan = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createStereoPanner();

      assert.deepEqual(node.toJSON(), {
        name: "StereoPannerNode",
        pan: {
          value: 0,
          inputs: [],
        },
        inputs: [],
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createStereoPanner();

      assert(node.$name === "StereoPannerNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createStereoPanner();

      assert(node.$context === audioContext);
    });
  });

});
