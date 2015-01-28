"use strict";

describe("AudioBufferSourceNode", function() {
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("() throws TypeError", function() {
      assert.throws(function() {
        global.AudioBufferSourceNode();
      }, TypeError);
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

      assert.throws(function() {
        node.buffer = "INVALID";
      }, TypeError);
    });
  });

  describe("#playbackRate", function() {
    it("get: AudioParam", function() {
      var node = audioContext.createBufferSource();

      assert(node.playbackRate instanceof global.AudioParam);

      assert.throws(function() {
        node.playbackRate = 0;
      }, Error);
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
      }, TypeError);
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
        node.loopStart = "INVALID";
      }, TypeError);
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
        node.loopEnd = "INVALID";
      }, TypeError);
    });
  });

  describe("#onended", function() {
    it("get/set: function", function() {
      var node = audioContext.createBufferSource();
      var fn1 = function() {};
      var fn2 = function() {};

      assert(node.onended === null);

      node.onended = fn1;
      assert(node.onended === fn1);

      node.onended = fn2;
      assert(node.onended === fn2);

      node.onended = null;

      assert.throws(function() {
        node.onended = "INVALID";
      });
    });
    it("works", function() {
      var node = audioContext.createBufferSource();
      var buf = audioContext.createBuffer(1, 44100 * 0.25, 44100);
      var spy = sinon.spy();

      node.buffer = buf;
      node.onended = spy;

      node.connect(audioContext.destination);
      node.start(0.1);
      node.stop(0.15);

      assert(spy.callCount === 0, "00:00.000");

      node.context.$processTo("00:00.149");
      assert(spy.callCount === 0, "00:00.149");

      // TODO: FIX
      node.context.$processTo("00:00.151");
      assert(spy.callCount === 1, "00:00.151");

      node.context.$processTo("00:00.200");
      assert(spy.callCount === 1, "00:00.200");
    });
    it("works auto stop", function() {
      var node = audioContext.createBufferSource();
      var buf = audioContext.createBuffer(1, 44100 * 0.25, 44100);
      var spy = sinon.spy();

      node.buffer = buf;
      node.onended = spy;

      node.connect(node.context.destination);
      node.start(0.1);

      assert(spy.callCount === 0, "00:00.000");

      node.context.$processTo("00:00.349");
      assert(spy.callCount === 0, "00:00.349");

      // TODO: FIX
      node.context.$processTo("00:00.352");
      assert(spy.callCount === 1, "00:00.352");

      node.context.$processTo("00:00.400");
      assert(spy.callCount === 1, "00:00.400");
    });
  });

  describe("#start", function() {
    it("(): void", function() {
      var node = audioContext.createBufferSource();

      node.start();

      assert.throws(function() {
        node.start();
      }, Error, "call twice");
    });
    it("(when: number): void", function() {
      var node = audioContext.createBufferSource();

      assert.throws(function() {
        node.start("INVALID");
      }, TypeError);

      node.start(0);

      assert.throws(function() {
        node.start(0);
      }, Error, "call twice");
    });
    it("(when: number, offset: number): void", function() {
      var node = audioContext.createBufferSource();

      assert.throws(function() {
        node.start(0, "INVALID");
      }, TypeError);

      node.start(0, 0);

      assert.throws(function() {
        node.start(0, 0);
      }, Error, "call twice");
    });
    it("(when: number, offset: number, duration: number): void", function() {
      var node = audioContext.createBufferSource();

      assert.throws(function() {
        node.start(0, 0, "INVALID");
      }, TypeError);

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
        node.stop("INVALID");
      }, TypeError);

      node.stop();

      assert.throws(function() {
        node.stop();
      }, Error, "call twice");

      assert.throws(function() {
        node.start();
      }, Error);
    });
    it("(when: number): void", function() {
      var node = audioContext.createBufferSource();

      assert.throws(function() {
        node.stop(0);
      }, Error, "not start yet");

      node.start(0);

      assert.throws(function() {
        node.stop("INVALID");
      }, TypeError);

      node.stop(0);

      assert.throws(function() {
        node.stop(0);
      }, Error, "call twice");

      assert.throws(function() {
        node.start(0);
      }, Error);
    });
  });

  describe("$state", function() {
    it("get: string", function() {
      var node = audioContext.createBufferSource();

      assert(node.$state === "UNSCHEDULED");

      node.start(0.1);
      assert(node.$state === "SCHEDULED");

      audioContext.$process(0.1);
      assert(node.$state === "PLAYING");

      node.stop(0.2);
      assert(node.$state === "PLAYING");

      audioContext.$process(0.1);
      assert(node.$state === "FINISHED");
    });
  });

  describe("$stateAtTime", function() {
    it("(time: number): string", function() {
      var node = audioContext.createBufferSource();

      assert(node.$stateAtTime(0.05) === "UNSCHEDULED");
      assert(node.$stateAtTime(0.15) === "UNSCHEDULED");
      assert(node.$stateAtTime(0.25) === "UNSCHEDULED");

      node.start(0.1);
      node.stop(0.2);

      assert(node.$stateAtTime(0.05) === "SCHEDULED");
      assert(node.$stateAtTime(0.15) === "PLAYING");
      assert(node.$stateAtTime(0.25) === "FINISHED");
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
          inputs: []
        },
        loop: false,
        loopStart: 0,
        loopEnd: 0,
        inputs: []
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
          inputs: []
        },
        loop: true,
        loopStart: 1,
        loopEnd: 2,
        inputs: []
      });
    });
  });

});
