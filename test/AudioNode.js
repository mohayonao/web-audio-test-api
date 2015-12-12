describe("AudioNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var utils = WebAudioTestAPI.utils;
  var immigration = utils.Immigration.getInstance();
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    before(function() {
      WebAudioTestAPI.setState("AudioContext#close", "enabled");
    });
    after(function() {
      WebAudioTestAPI.setState("AudioContext#close", "disabled");
    });
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      assert(node instanceof global.AudioNode);
      assert(node instanceof global.EventTarget);

      assert.throws(function() {
        return new global.AudioNode();
      }, TypeError);

      return audioContext.close().then(function() {
        return immigration.apply(function(admission) {
          return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
        });
      }).then(function() {
        throw new Error("NOT REACHED");
      }, function(e) {
        assert(e instanceof TypeError && /audioContext has been closed/i.test(e.message));
      });
    });
  });

  describe("#context: AudioContext", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      assert(node.context === audioContext);

      assert.throws(function() {
        node.context = null;
      }, TypeError);
    });
  });

  describe("#numberOfInputs: number", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      assert(typeof node.numberOfInputs === "number");

      assert.throws(function() {
        node.numberOfInputs = 1;
      }, TypeError);
    });
  });

  describe("#numberOfOutputs: number", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      assert(typeof node.numberOfOutputs === "number");

      assert.throws(function() {
        node.numberOfOutputs = 1;
      }, TypeError);
    });
  });

  describe("#channelCount: number", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      assert(typeof node.channelCount === "number");

      node.channelCount = 1;
      assert(node.channelCount === 1);

      node.channelCount = 2;
      assert(node.channelCount === 2);

      assert.throws(function() {
        node.channelCount = 1.5;
      }, TypeError);
    });
  });

  describe("#channelCountMode: string", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      assert(typeof node.channelCountMode === "string");

      node.channelCountMode = "max";
      assert(node.channelCountMode === "max");

      node.channelCountMode = "clamped-max";
      assert(node.channelCountMode === "clamped-max");

      node.channelCountMode = "explicit";
      assert(node.channelCountMode === "explicit");

      assert.throws(function() {
        node.channelCountMode = "custom";
      }, TypeError);
    });
  });

  describe("#channelInterpretation: string", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      assert(typeof node.channelInterpretation === "string");

      node.channelInterpretation = "speakers";
      assert(node.channelInterpretation === "speakers");

      node.channelInterpretation = "discrete";
      assert(node.channelInterpretation === "discrete");

      assert.throws(function() {
        node.channelInterpretation = "custom";
      }, TypeError);
    });
  });

  describe("#connect(destination: AudioNode, [ output: number, input: number ]): void", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var anotherAudioContext = new WebAudioTestAPI.AudioContext();

      node.connect(audioContext.destination);

      node.connect(audioContext.destination, 0, 0);

      assert.throws(function() {
        node.connect(audioContext.destination, 2);
      }, TypeError);

      assert.throws(function() {
        node.connect(audioContext.destination, 0, 2);
      }, TypeError);

      assert.throws(function() {
        node.connect("INVALID");
      }, TypeError);

      assert.throws(function() {
        node.connect(audioContext.destination, 1.5);
      }, TypeError);

      assert.throws(function() {
        node.connect(audioContext.destination, 0, 1.5);
      }, TypeError);

      assert.throws(function() {
        node.connect(anotherAudioContext.destination);
      }, TypeError);

      assert(node.connect === global.AudioNode.prototype.connect);
    });
  });

  describe("#disconnect([ output: number ]): void", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      node.disconnect();
      node.disconnect(0);

      assert.throws(function() {
        node.disconnect(1.5);
      }, TypeError);

      assert.throws(function() {
        node.disconnect(2);
      }, TypeError);

      assert(node.disconnect === global.AudioNode.prototype.disconnect);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

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

  describe("$name: string", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      assert(node.$name === "AudioNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      assert(node.$context === audioContext);
    });
  });

  describe("$process(inNumSamples, tick): void", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      node.$inputs[0].process = sinon.spy();

      node.$process(10, 0);
      assert(node.$inputs[0].process.callCount === 1);
      assert.deepEqual(node.$inputs[0].process.args[0], [ 10, 0 ]);

      node.$process(10, 0);
      assert(node.$inputs[0].process.callCount === 1);
      assert.deepEqual(node.$inputs[0].process.args[0], [ 10, 0 ]);

      node.$process(10, 1);
      assert(node.$inputs[0].process.callCount === 2);
      assert.deepEqual(node.$inputs[0].process.args[1], [ 10, 1 ]);

      node.$process(10, 1);
      assert(node.$inputs[0].process.callCount === 2);
      assert.deepEqual(node.$inputs[0].process.args[1], [ 10, 1 ]);
    });
  });

  describe("$isConnectedTo(destination, output = 0, input = 0): boolean", function() {
    it("works", function() {
      var node1 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext, numberOfOutputs: 3 });
      });
      var node2 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext, numberOfInputs: 3 });
      });
      var node3 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      node1.connect(node2, 1, 2);
      node2.connect(node3);

      assert(node1.$isConnectedTo(node2) === false);
      assert(node1.$isConnectedTo(node2, 0, 1) === false);
      assert(node1.$isConnectedTo(node2, 1, 0) === false);
      assert(node1.$isConnectedTo(node2, 1, 1) === false);
      assert(node1.$isConnectedTo(node2, 1, 2) === true);
      assert(node1.$isConnectedTo(node2, 2, 1) === false);
      assert(node1.$isConnectedTo(node2, 2, 2) === false);
      assert(node1.$isConnectedTo(node2, 3, 0) === false);
      assert(node1.$isConnectedTo(node2, 0, 3) === false);
      assert(node1.$isConnectedTo(node3) === false);
      assert(node2.$isConnectedTo(node3) === true);
      assert(node1.$isConnectedTo({}) === false);
    });
  });

  describe("$isConnectedFrom(destination, output = 0, input = 0): boolean", function() {
    it("works", function() {
      var node1 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext, numberOfOutputs: 3 });
      });
      var node2 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext, numberOfInputs: 3 });
      });
      var node3 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

      node1.connect(node2, 1, 2);
      node2.connect(node3);

      assert(node2.$isConnectedFrom(node1) === false);
      assert(node2.$isConnectedFrom(node1, 0, 1) === false);
      assert(node2.$isConnectedFrom(node1, 1, 0) === false);
      assert(node2.$isConnectedFrom(node1, 1, 1) === false);
      assert(node2.$isConnectedFrom(node1, 1, 2) === true);
      assert(node2.$isConnectedFrom(node1, 2, 1) === false);
      assert(node2.$isConnectedFrom(node1, 2, 2) === false);
      assert(node2.$isConnectedFrom(node1, 3, 0) === false);
      assert(node2.$isConnectedFrom(node1, 0, 3) === false);
      assert(node3.$isConnectedFrom(node1) === false);
      assert(node3.$isConnectedFrom(node2) === true);
      assert(node1.$isConnectedFrom({}) === false);
    });
  });

  describe("works", function() {
    it("connect", function() {
      var node1 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var node2 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var node3 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

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
      var node1 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var node2 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var node3 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });

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
