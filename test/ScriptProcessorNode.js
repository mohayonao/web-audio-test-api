describe("ScriptProcessorNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createScriptProcessor(256, 1, 1);

      assert(node instanceof global.ScriptProcessorNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        audioContext.createScriptProcessor(0, 1, 1);
      }, TypeError);

      assert.throws(function() {
        audioContext.createScriptProcessor(1024, 1.5, 1);
      }, TypeError);

      assert.throws(function() {
        audioContext.createScriptProcessor(1024, 1, 1.5);
      }, TypeError);

      assert.doesNotThrow(function() {
        audioContext.createScriptProcessor(1024);
      });

      assert.throws(function() {
        audioContext.createScriptProcessor(1024, undefined);
      }, TypeError);

      assert.throws(function() {
        audioContext.createScriptProcessor(1024, 1, undefined);
      }, TypeError);
    });
    it("not work when 'new' directly", function() {
      assert.throws(function() { new global.ScriptProcessorNode(256, 1, 1); }, TypeError);
    });
  });

  describe("#bufferSize: number", function() {
    it("works", function() {
      var node1 = audioContext.createScriptProcessor(1024, 0, 1);
      var node2 = audioContext.createScriptProcessor(2048, 0, 2);

      assert(node1.bufferSize === 1024);
      assert(node2.bufferSize === 2048);

      assert.throws(function() {
        node1.bufferSize = 2048;
      }, TypeError);
    });
  });

  describe("#onaudioprocess: function", function() {
    it("works", function() {
      var node = audioContext.createScriptProcessor(1024, 0, 1);

      function fn1() {}
      function fn2() {}

      assert(node.onaudioprocess === null);

      node.onaudioprocess = fn1;
      assert(node.onaudioprocess === fn1);

      node.onaudioprocess = fn2;
      assert(node.onaudioprocess === fn2);

      node.onaudioprocess = null;
      assert(node.onaudioprocess === null);

      assert.throws(function() {
        node.onaudioprocess = "INVALID";
      }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createScriptProcessor(1024, 0, 1);

      assert.deepEqual(node.toJSON(), {
        name: "ScriptProcessorNode",
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createScriptProcessor(256, 1, 1);

      assert(node.$name === "ScriptProcessorNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createScriptProcessor(256, 1, 1);

      assert(node.$context === audioContext);
    });
  });

  describe("works", function() {
    it("onaudioprocess", function() {
      // 256 / 44100 = 5.805msec -> 11.610msec -> 17.415msec
      var node = audioContext.createScriptProcessor(256, 1, 1);
      var onaudioprocess = sinon.spy();
      var event;

      node.onaudioprocess = onaudioprocess;

      node.connect(audioContext.destination);

      audioContext.$processTo("00:00.000");
      assert(onaudioprocess.callCount === 0, "00:00.000");

      audioContext.$processTo("00:00.001");
      assert(onaudioprocess.callCount === 1, "00:00.001");
      assert(onaudioprocess.calledOn(node), "00:00.001");
      event = onaudioprocess.args[0][0];
      assert(audioContext.currentTime < event.playbackTime);

      audioContext.$processTo("00:00.005");
      assert(onaudioprocess.callCount === 1, "00:00.005");

      audioContext.$processTo("00:00.006");
      assert(onaudioprocess.callCount === 2, "00:00.006");
      assert(onaudioprocess.calledOn(node), "00:00.006");
      event = onaudioprocess.args[1][0];
      assert(audioContext.currentTime < event.playbackTime);

      audioContext.$processTo("00:00.011");
      assert(onaudioprocess.callCount === 2, "00:00.011");

      audioContext.$processTo("00:00.012");
      assert(onaudioprocess.callCount === 3, "00:00.012");
      assert(onaudioprocess.calledOn(node), "00:00.012");
      event = onaudioprocess.args[2][0];
      assert(audioContext.currentTime < event.playbackTime);

      audioContext.$processTo("00:00.017");
      assert(onaudioprocess.callCount === 3, "00:00.017");

      audioContext.$processTo("00:00.018");
      assert(onaudioprocess.callCount === 4, "00:00.018");
      assert(onaudioprocess.calledOn(node), "00:00.018");
      event = onaudioprocess.args[3][0];
      assert(audioContext.currentTime < event.playbackTime);

      event = onaudioprocess.args[0][0];

      assert(event instanceof WebAudioTestAPI.AudioProcessingEvent);
      assert(event.inputBuffer instanceof WebAudioTestAPI.AudioBuffer);
      assert(event.outputBuffer instanceof WebAudioTestAPI.AudioBuffer);
      assert(event.type === "audioprocess");
      assert(event.target === node);
      assert(typeof event.playbackTime === "number");

      assert(onaudioprocess.args[0][0] !== onaudioprocess.args[1][0]);
    });
  });
});
