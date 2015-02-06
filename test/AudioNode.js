"use strict";

describe("AudioNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);

      assert(node instanceof global.AudioNode);
      assert(node instanceof global.EventTarget);

      assert.throws(function() {
        global.AudioNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#context", function() {
    it("get: AudioContext", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);

      assert(node.context === audioContext);

      assert.throws(function() {
        node.context = null;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#numberOfInputs", function() {
    it("get: number", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);

      assert(typeof node.numberOfInputs === "number");

      assert.throws(function() {
        node.numberOfInputs = 1;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#numberOfOutputs", function() {
    it("get: number", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);

      assert(typeof node.numberOfOutputs === "number");

      assert.throws(function() {
        node.numberOfOutputs = 1;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#channelCount", function() {
    it("get/set: number", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);

      assert(typeof node.channelCount === "number");

      node.channelCount = 1;
      assert(node.channelCount === 1);

      node.channelCount = 2;
      assert(node.channelCount === 2);

      assert.throws(function() {
        node.channelCount = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#channelCountMode", function() {
    it("get/set: ChannelCountMode", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);

      assert(typeof node.channelCountMode === "string");

      node.channelCountMode = "max";
      assert(node.channelCountMode === "max");

      node.channelCountMode = "clamped-max";
      assert(node.channelCountMode === "clamped-max");

      node.channelCountMode = "explicit";
      assert(node.channelCountMode === "explicit");

      assert.throws(function() {
        node.channelCountMode = "custom";
      }, function(e) {
        return e instanceof TypeError && /should be an enum/.test(e.message);
      });
    });
  });

  describe("#channelInterpretation", function() {
    it("get/set: ChannelInterpretation", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);

      assert(typeof node.channelInterpretation === "string");

      node.channelInterpretation = "speakers";
      assert(node.channelInterpretation === "speakers");

      node.channelInterpretation = "discrete";
      assert(node.channelInterpretation === "discrete");

      assert.throws(function() {
        node.channelInterpretation = "custom";
      }, function(e) {
        return e instanceof TypeError && /should be an enum/.test(e.message);
      });
    });
  });

  describe("#connect", function() {
    it("(destination: AudioNode, [output: number], [input: number]): void", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);

      node.connect(audioContext.destination);

      node.connect(audioContext.destination, 0, 0);

      assert.throws(function() {
        node.connect(audioContext.destination, 2);
      }, function(e) {
        return e instanceof TypeError && /exceeds number of outputs/.test(e.message);
      });

      assert.throws(function() {
        node.connect(audioContext.destination, 0, 2);
      }, function(e) {
        return e instanceof TypeError && /exceeds number of inputs/.test(e.message);
      });

      assert.throws(function() {
        node.connect("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be an AudioNode/.test(e.message);
      });

      assert.throws(function() {
        node.connect(audioContext.destination, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        node.connect(audioContext.destination, 0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      var anotherAudioContext = new WebAudioTestAPI.AudioContext();

      assert.throws(function() {
        node.connect(anotherAudioContext.destination);
      }, function(e) {
        return e instanceof TypeError && /different audio context/.test(e.message);
      });

      assert(node.connect === global.AudioNode.prototype.connect);
    });
  });

  describe("#disconnect", function() {
    it("([output: number]): void", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);

      node.disconnect();
      node.disconnect(0);

      assert.throws(function() {
        node.disconnect("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        node.disconnect(2);
      }, function(e) {
        return e instanceof TypeError && /exceeds number of outputs/.test(e.message);
      });

      assert(node.disconnect === global.AudioNode.prototype.disconnect);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);

      assert.deepEqual(node.toJSON(), {
        name: "AudioNode",
        inputs: []
      });

      audioContext.VERBOSE_JSON = true;

      assert.deepEqual(node.toJSON(), {
        name: "AudioNode",
        numberOfInputs: 1,
        numberOfOutputs: 1,
        channelCount: 2,
        channelCountMode: "max",
        channelInterpretation: "speakers",
        inputs: []
      });
    });
  });

  describe("works", function() {
    it("connect", function() {
      var node1 = new WebAudioTestAPI.AudioNode(audioContext);
      var node2 = new WebAudioTestAPI.AudioNode(audioContext);
      var node3 = new WebAudioTestAPI.AudioNode(audioContext);

      node1.$id = "foo";
      node2.$id = "bar";
      node3.$id = "baz";

      node3.connect(node2);
      node2.connect(node1);
      node1.connect(node3);

      assert.deepEqual(node1.toJSON(), {
        name: "AudioNode#foo",
        inputs: [
          {
            name: "AudioNode#bar",
            inputs: [
              {
                name: "AudioNode#baz",
                inputs: [
                  "<circular:AudioNode#foo>"
                ]
              }
            ]
          }
        ]
      });
    });

    it("disconnect", function() {
      var node1 = new WebAudioTestAPI.AudioNode(audioContext);
      var node2 = new WebAudioTestAPI.AudioNode(audioContext);
      var node3 = new WebAudioTestAPI.AudioNode(audioContext);

      node1.$id = "foo";
      node2.$id = "bar";
      node3.$id = "baz";

      node3.connect(node2);
      node2.connect(node1);
      node1.connect(node3);
      node3.disconnect();

      assert.deepEqual(node1.toJSON(), {
        name: "AudioNode#foo",
        inputs: [
          {
            name: "AudioNode#bar",
            inputs: []
          }
        ]
      });
    });
  });

});
