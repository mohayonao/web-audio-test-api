describe("AudioBufferSourceNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
      var node = audioContext.createBufferSource();

      assert(node instanceof global.AudioBufferSourceNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.AudioBufferSourceNode();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#buffer", function() {
    it("get/set: AudioBuffer", function() {
      var node = audioContext.createBufferSource();
      var buf1 = audioContext.createBuffer(1, 16, 44100);
      var buf2 = audioContext.createBuffer(2, 32, 48000);

      assert(node.buffer === null);

      node.buffer = buf1;
      assert(node.buffer === buf1);

      node.buffer = buf2;
      assert(node.buffer === buf2);

      node.buffer = null;
      assert(node.buffer === null);

      assert.throws(function() {
        node.buffer = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be an AudioBuffer/.test(e.message);
      });
    });
  });

  describe("#playbackRate", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createBufferSource();

      assert(node.playbackRate instanceof WebAudioTestAPI.AudioParam);

      assert.throws(function() {
        node.playbackRate = 0;
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#loop", function() {
    it("get/set: boolean", function() {
      var node = audioContext.createBufferSource();

      assert(typeof node.loop === "boolean");

      node.loop = true;
      assert(node.loop === true);

      node.loop = false;
      assert(node.loop === false);

      assert.throws(function() {
        node.loop = 0;
      }, function(e) {
        return e instanceof TypeError && /should be a boolean/.test(e.message);
      });
    });
  });

  describe("#loopStart", function() {
    it("get/set: number", function() {
      var node = audioContext.createBufferSource();

      assert(typeof node.loopStart === "number");

      node.loopStart = 1;
      assert(node.loopStart === 1);

      node.loopStart = 2;
      assert(node.loopStart === 2);

      assert.throws(function() {
        node.loopStart = -0.5;
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });
    });
  });

  describe("#loopEnd", function() {
    it("get/set: number", function() {
      var node = audioContext.createBufferSource();

      assert(typeof node.loopEnd === "number");

      node.loopEnd = 1;
      assert(node.loopEnd === 1);

      node.loopEnd = 2;
      assert(node.loopEnd === 2);

      assert.throws(function() {
        node.loopEnd = -0.5;
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });
    });
  });

  describe("#onended", function() {
    it("get/set: function", function() {
      var node = audioContext.createBufferSource();

      function fn1() {}
      function fn2() {}

      assert(node.onended === null);

      node.onended = fn1;
      assert(node.onended === fn1);

      node.onended = fn2;
      assert(node.onended === fn2);

      node.onended = null;
      assert(node.onended === null);

      assert.throws(function() {
        node.onended = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a function/.test(e.message);
      });
    });
  });

  describe("#start", function() {
    it("(): void", function() {
      var node = audioContext.createBufferSource();

      node.start();

      assert.throws(function() {
        node.start();
      }, Error, "call twice");

      assert(node.start === global.AudioBufferSourceNode.prototype.start);
    });
    it("(when: number): void", function() {
      var node = audioContext.createBufferSource();

      assert.throws(function() {
        node.start(-0.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });

      node.start(0);

      assert.throws(function() {
        node.start(0);
      }, Error, "call twice");
    });
    it("(when: number, offset: number): void", function() {
      var node = audioContext.createBufferSource();

      assert.throws(function() {
        node.start(0, -0.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });

      node.start(0, 0);

      assert.throws(function() {
        node.start(0, 0);
      }, Error, "call twice");
    });
    it("(when: number, offset: number, duration: number): void", function() {
      var node = audioContext.createBufferSource();

      assert.throws(function() {
        node.start(0, 0, -0.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });

      node.start(0, 0, 0);

      assert.throws(function() {
        node.start(0, 0, 0);
      }, Error, "call twice");
    });
  });

  describe("#stop(when)", function() {
    it("(): void", function() {
      var node = audioContext.createBufferSource();

      assert.throws(function() {
        node.stop();
      }, Error, "not start yet");

      node.start();

      assert.throws(function() {
        node.stop(-0.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });

      node.stop();

      assert.throws(function() {
        node.stop();
      }, Error, "call twice");

      assert.throws(function() {
        node.start();
      }, Error);

      assert(node.stop === global.AudioBufferSourceNode.prototype.stop);
    });
    it("(when: number): void", function() {
      var node = audioContext.createBufferSource();

      assert.throws(function() {
        node.stop(0);
      }, Error, "not start yet");

      node.start(0);

      assert.throws(function() {
        node.stop(-0.5);
      }, function(e) {
        return e instanceof TypeError && /should be a positive number/.test(e.message);
      });

      node.stop(0);

      assert.throws(function() {
        node.stop(0);
      }, Error, "call twice");

      assert.throws(function() {
        node.start(0);
      }, Error);
    });
  });

  describe("#toJSON", function() {
    it("(): object", function() {
      var node = audioContext.createBufferSource();
      var buf = audioContext.createBuffer(1, 16, 44100);

      assert.deepEqual(node.toJSON(), {
        name: "AudioBufferSourceNode",
        buffer: null,
        playbackRate: {
          value: 1,
          inputs: [],
        },
        loop: false,
        loopStart: 0,
        loopEnd: 0,
        inputs: [],
      });

      node.buffer = buf;
      node.loop = true;
      node.loopStart = 1;
      node.loopEnd = 2;

      assert.deepEqual(node.toJSON(), {
        name: "AudioBufferSourceNode",
        buffer: buf.toJSON(),
        playbackRate: {
          value: 1,
          inputs: [],
        },
        loop: true,
        loopStart: 1,
        loopEnd: 2,
        inputs: [],
      });
    });
  });

  describe("#$name", function() {
    it("get: string", function() {
      var node = audioContext.createBufferSource();

      assert(node.$name === "AudioBufferSourceNode");
    });
  });

  describe("#$context", function() {
    it("get: AudioContext", function() {
      var node = audioContext.createBufferSource();

      assert(node.$context === audioContext);
    });
  });

  describe("$state", function() {
    it("get: string", function() {
      var node = audioContext.createBufferSource();

      assert(node.$state === "UNSCHEDULED");

      node.start(0);

      assert(node.$state === "PLAYING");
    });
  });

  describe("$stateAtTime", function() {
    it("(time: number|string): string", function() {
      var node = audioContext.createBufferSource();

      assert(node.$stateAtTime("00:00.000") === "UNSCHEDULED");

      node.start(0);

      assert(node.$stateAtTime("00:00.000") === "PLAYING");
    });
  });

  describe("$startTime", function() {
    it("get: number", function() {
      var node = audioContext.createBufferSource();

      assert(node.$startTime === Infinity);

      node.start(2);

      assert(node.$startTime === 2);
    });
  });

  describe("$stopTime", function() {
    it("get: number", function() {
      var node = audioContext.createBufferSource();

      assert(node.$stopTime === Infinity);

      node.start(2);
      node.stop(3);

      assert(node.$stopTime === 3);
    });
  });

  describe("works", function() {
    it("onended", function() {
      var node = audioContext.createBufferSource();
      var buf = audioContext.createBuffer(1, (44100 * 0.025)|0, 44100);
      var onended = sinon.spy();
      var event;

      node.buffer = buf;
      node.loop = true;
      node.onended = onended;

      node.connect(audioContext.destination);

      assert(node.$state === "UNSCHEDULED");

      node.start(0.100);
      node.stop(0.150);

      audioContext.$processTo("00:00.000");
      assert(node.$state === "SCHEDULED", "00:00.000");
      assert(onended.callCount === 0, "00:00.000");

      audioContext.$processTo("00:00.099");
      assert(node.$state === "SCHEDULED", "00:00.099");
      assert(onended.callCount === 0, "00:00.099");

      audioContext.$processTo("00:00.100");
      assert(node.$state === "PLAYING", "00:00.100");
      assert(onended.callCount === 0, "00:00.100");

      audioContext.$processTo("00:00.149");
      assert(node.$state === "PLAYING", "00:00.149");
      assert(onended.callCount === 0, "00:00.149");

      audioContext.$processTo("00:00.150");
      assert(node.$state === "FINISHED", "00:00.150");
      assert(onended.callCount === 1, "00:00.150");
      assert(onended.calledOn(node), "00:00.150");

      audioContext.$processTo("00:00.200");
      assert(node.$state === "FINISHED", "00:00.200");
      assert(onended.callCount === 1, "00:00.200");

      event = onended.args[0][0];

      assert(event instanceof WebAudioTestAPI.Event);
      assert(event.type === "ended");
      assert(event.target === node);

      assert(node.$stateAtTime("00:00.000") === "SCHEDULED");
      assert(node.$stateAtTime("00:00.099") === "SCHEDULED");
      assert(node.$stateAtTime("00:00.100") === "PLAYING");
      assert(node.$stateAtTime("00:00.149") === "PLAYING");
      assert(node.$stateAtTime("00:00.150") === "FINISHED");
      assert(node.$stateAtTime("00:00.200") === "FINISHED");
    });
    it("onended (auto stop)", function() {
      var node = audioContext.createBufferSource();
      var buf = audioContext.createBuffer(1, (44100 * 0.025)|0, 44100);
      var onended = sinon.spy();
      var event;

      node.buffer = buf;
      node.onended = onended;

      node.connect(node.context.destination);

      assert(node.$state === "UNSCHEDULED");

      node.start(0.100);

      audioContext.$processTo("00:00.000");
      assert(node.$state === "SCHEDULED", "00:00.000");
      assert(onended.callCount === 0, "00:00.000");

      audioContext.$processTo("00:00.099");
      assert(node.$state === "SCHEDULED", "00:00.099");
      assert(onended.callCount === 0, "00:00.099");

      audioContext.$processTo("00:00.100");
      assert(node.$state === "PLAYING", "00:00.100");
      assert(onended.callCount === 0, "00:00.100");

      audioContext.$processTo("00:00.124");
      assert(node.$state === "PLAYING", "00:00.124");
      assert(onended.callCount === 0, "00:00.124");

      audioContext.$processTo("00:00.125");
      assert(node.$state === "FINISHED", "00:00.125");
      assert(onended.callCount === 1, "00:00.125");
      assert(onended.calledOn(node), "00:00.125");

      audioContext.$processTo("00:00.200");
      assert(node.$state === "FINISHED", "00:00.200");
      assert(onended.callCount === 1, "00:00.200");

      event = onended.args[0][0];

      assert(event instanceof WebAudioTestAPI.Event);
      assert(event.type === "ended");
      assert(event.target === node);

      assert(node.$stateAtTime("00:00.000") === "SCHEDULED");
      assert(node.$stateAtTime("00:00.099") === "SCHEDULED");
      assert(node.$stateAtTime("00:00.100") === "PLAYING");
      assert(node.$stateAtTime("00:00.124") === "PLAYING");
      assert(node.$stateAtTime("00:00.125") === "FINISHED");
      assert(node.$stateAtTime("00:00.200") === "FINISHED");
    });
  });
});
