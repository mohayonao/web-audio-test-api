describe("StereoPannerNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;
  var versions;

  before(function() {
    versions = WebAudioTestAPI.getTargetVersions();
    WebAudioTestAPI.setTargetVersions(Infinity);
  });
  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });
  after(function() {
    WebAudioTestAPI.setTargetVersions(versions);
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createStereoPanner();

      assert(node instanceof global.StereoPannerNode);
      assert(node instanceof global.AudioNode);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.StereoPannerNode(); }, TypeError);
    });
  });

  describe("#pan: AudioParam", function() {
    it("works", function() {
      var node = audioContext.createStereoPanner();

      assert(node.pan instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.pan = 0;
      }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createStereoPanner();

      assert.deepEqual(node.toJSON(), {
        name: "StereoPannerNode",
        pan: {
          value: 0,
          inputs: []
        },
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createStereoPanner();

      assert(node.$name === "StereoPannerNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createStereoPanner();

      assert(node.$context === audioContext);
    });
  });
});
