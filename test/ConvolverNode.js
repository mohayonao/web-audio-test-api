describe("ConvolverNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createConvolver();

      assert(node instanceof global.ConvolverNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.ConvolverNode();
      }, TypeError);
    });
  });

  describe("#buffer: AudioBuffer", function() {
    it("works", function() {
      var node = audioContext.createConvolver();
      var buf1 = audioContext.createBuffer(1, 16, 44100);
      var buf2 = audioContext.createBuffer(2, 32, 44100);

      assert(node.buffer === null);

      node.buffer = buf1;
      assert(node.buffer === buf1);

      node.buffer = buf2;
      assert(node.buffer === buf2);

      node.buffer = null;
      assert(node.buffer === null);

      assert.throws(function() {
        node.buffer = "INVALID";
      }, TypeError);
    });
  });

  describe("#normalize: boolean", function() {
    it("works", function() {
      var node = audioContext.createConvolver();

      assert(typeof node.normalize === "boolean");

      node.normalize = true;
      assert(node.normalize === true);

      node.normalize = false;
      assert(node.normalize === false);

      assert.throws(function() {
        node.normalize = "INVALID";
      }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createConvolver();

      assert.deepEqual(node.toJSON(), {
        name: "ConvolverNode",
        normalize: true,
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createConvolver();

      assert(node.$name === "ConvolverNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createConvolver();

      assert(node.$context === audioContext);
    });
  });
});
