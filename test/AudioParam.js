describe("AudioParam", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var utils = WebAudioTestAPI.utils;
  var immigration = utils.Immigration.getInstance();
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      assert(param instanceof global.AudioParam);

      assert.throws(function() {
        return new global.AudioParam();
      }, TypeError);

      // test api
      assert(param.$node === node);
    });
  });

  describe("#name: string", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      assert(typeof param.name === "string");

      assert.throws(function() {
        param.name = "INVALID";
      }, TypeError);
    });
  });

  describe("#defaultValue: number", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      assert(typeof param.defaultValue === "number");

      assert.throws(function() {
        param.defaultValue = "INVALID";
      }, TypeError);
    });
  });

  describe("#value: number", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      assert(typeof param.value === "number");

      param.value = 0;

      assert(param.value === 0);

      assert.throws(function() {
        param.value = "INVALID";
      }, TypeError);
    });
  });

  describe("#setValueAtTime(value: number, startTime: number): void", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.setValueAtTime(0, 0);

      assert.throws(function() {
        param.setValueAtTime("INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        param.setValueAtTime(0, "INVALID");
      }, TypeError);

      assert(param.setValueAtTime === global.AudioParam.prototype.setValueAtTime);
    });
  });

  describe("#linearRampToValueAtTime(value: number, endTime: number): void", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.linearRampToValueAtTime(0, 0);

      assert.throws(function() {
        param.linearRampToValueAtTime("INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        param.linearRampToValueAtTime(0, "INVALID");
      }, TypeError);

      assert(param.linearRampToValueAtTime === global.AudioParam.prototype.linearRampToValueAtTime);
    });
  });

  describe("#exponentialRampToValueAtTime(value: number, endTime: number): void", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.exponentialRampToValueAtTime(0, 0);

      assert.throws(function() {
        param.exponentialRampToValueAtTime("INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        param.exponentialRampToValueAtTime(0, "INVALID");
      }, TypeError);

      assert(param.exponentialRampToValueAtTime === global.AudioParam.prototype.exponentialRampToValueAtTime);
    });
  });

  describe("#setTargetAtTime(target: number, startTime: number, timeConstant: number): void", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.setTargetAtTime(0, 0, 0);

      assert.throws(function() {
        param.setTargetAtTime("INVALID", 0, 0);
      }, TypeError);

      assert.throws(function() {
        param.setTargetAtTime(0, "INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        param.setTargetAtTime(0, 0, "INVALID");
      }, TypeError);

      assert(param.setTargetAtTime === global.AudioParam.prototype.setTargetAtTime);
    });
  });

  describe("#setValueCurveAtTime(values: Float32Array, startTime: number, duration: number): void", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });
      var values = new Float32Array(32);

      param.setValueCurveAtTime(values, 0, 0);

      assert.throws(function() {
        param.setValueCurveAtTime("INVALID", 0, 0);
      }, TypeError);

      assert.throws(function() {
        param.setValueCurveAtTime(values, "INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        param.setValueCurveAtTime(values, 0, "INVALID");
      }, TypeError);

      assert(param.setValueCurveAtTime === global.AudioParam.prototype.setValueCurveAtTime);
    });
  });

  describe("#cancelScheduledValues(startTime: number): void", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.cancelScheduledValues(0);

      assert.throws(function() {
        param.cancelScheduledValues("INVALID");
      }, TypeError);

      assert(param.cancelScheduledValues === global.AudioParam.prototype.cancelScheduledValues);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      node.$id = "foo";

      assert.deepEqual(param.toJSON(), {
        value: 0,
        inputs: []
      });

      node.connect(param);

      assert.deepEqual(param.toJSON(), {
        value: 0,
        inputs: [
          {
            name: "AudioNode#foo",
            inputs: []
          }
        ]
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      assert(param.$name === "AudioParam");
    });
  });

  describe("$context", function() {
    it("get: AudioContext", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      assert(param.$context === audioContext);
    });
  });

  describe("$valueAtTime(time: number|string): number", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      assert(typeof param.$valueAtTime("00:00.000") === "number");
    });
  });

  describe("$process(inNumSamples, tick): void", function() {
    it("works", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.$inputs[0].process = sinon.spy();

      param.$process(10, 0);
      assert(param.$inputs[0].process.callCount === 1);
      assert.deepEqual(param.$inputs[0].process.args[0], [ 10, 0 ]);

      param.$process(10, 0);
      assert(param.$inputs[0].process.callCount === 1);
      assert.deepEqual(param.$inputs[0].process.args[0], [ 10, 0 ]);

      param.$process(10, 1);
      assert(param.$inputs[0].process.callCount === 2);
      assert.deepEqual(param.$inputs[0].process.args[1], [ 10, 1 ]);

      param.$process(10, 1);
      assert(param.$inputs[0].process.callCount === 2);
      assert.deepEqual(param.$inputs[0].process.args[1], [ 10, 1 ]);
    });
  });

  describe("$isConnectedFrom(destination, output = 0): boolean", function() {
    it("works", function() {
      var node1 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext, numberOfOutputs: 3 });
      });
      var node2 = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext, numberOfInputs: 3 });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node1, "name", 0, 0, 0);
      });

      node1.connect(param, 1);
      node2.connect(param);

      assert(param.$isConnectedFrom(node1) === false);
      assert(param.$isConnectedFrom(node1, 0) === false);
      assert(param.$isConnectedFrom(node1, 1) === true);
      assert(param.$isConnectedFrom(node1, 2) === false);
      assert(param.$isConnectedFrom(node1, 3) === false);
      assert(param.$isConnectedFrom(node2) === true);
      assert(param.$isConnectedFrom(node2, 0) === true);
      assert(param.$isConnectedFrom(node2, 1) === false);
      assert(param.$isConnectedFrom(node2, 2) === false);
      assert(param.$isConnectedFrom(node2, 3) === false);
      assert(param.$isConnectedFrom({}) === false);
    });
  });

  describe("$linearRampToValueAtTime(v, v0, v1, t, t0, t1): number", function() {
    it("works", function() {
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, -10, +10, 0.800, 1.000, 2.000), -10, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, -10, +10, 1.000, 1.000, 2.000), -10, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, -10, +10, 1.200, 1.000, 2.000), -6, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, -10, +10, 1.400, 1.000, 2.000), -2, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, -10, +10, 1.600, 1.000, 2.000), +2, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, -10, +10, 1.800, 1.000, 2.000), +6, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, -10, +10, 2.000, 1.000, 2.000), +10, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, -10, +10, 2.200, 1.000, 2.000), +10, 1e-6));

      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, +10, -10, 0.800, 1.000, 2.000), +10, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, +10, -10, 1.000, 1.000, 2.000), +10, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, +10, -10, 1.200, 1.000, 2.000), +6, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, +10, -10, 1.400, 1.000, 2.000), +2, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, +10, -10, 1.600, 1.000, 2.000), -2, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, +10, -10, 1.800, 1.000, 2.000), -6, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, +10, -10, 2.000, 1.000, 2.000), -10, 1e-6));
      assert(closeTo(AudioParam.$linearRampToValueAtTime(0, +10, -10, 2.200, 1.000, 2.000), -10, 1e-6));
    });
  });
  describe("$exponentialRampToValueAtTime(v, v0, v1, t, t0, t1): number", function() {
    it("works", function() {
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 0, 0, 0.800, 1.000, 2.000), 0, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 0, 0, 1.000, 1.000, 2.000), 0, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 0, 0, 1.200, 1.000, 2.000), 0, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 0, 0, 1.400, 1.000, 2.000), 0, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 0, 0, 1.600, 1.000, 2.000), 0, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 0, 0, 1.800, 1.000, 2.000), 0, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 0, 0, 2.000, 1.000, 2.000), 0, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 0, 0, 2.200, 1.000, 2.000), 0, 1e-6));

      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 1e-3, 10, 0.800, 1.000, 2.000), 1e-3, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 1e-3, 10, 1.000, 1.000, 2.000), 1e-3, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 1e-3, 10, 1.200, 1.000, 2.000), 0.0063095735386013, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 1e-3, 10, 1.400, 1.000, 2.000), 0.0398107171058654, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 1e-3, 10, 1.600, 1.000, 2.000), 0.2511886358261108, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 1e-3, 10, 1.800, 1.000, 2.000), 1.5848932266235352, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 1e-3, 10, 2.000, 1.000, 2.000), 10, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 1e-3, 10, 2.200, 1.000, 2.000), 10, 1e-6));

      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 10, 1e-3, 0.800, 1.000, 2.000), 10, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 10, 1e-3, 1.000, 1.000, 2.000), 10, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 10, 1e-3, 1.200, 1.000, 2.000), 1.5848932266235352, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 10, 1e-3, 1.400, 1.000, 2.000), 0.2511886358261108, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 10, 1e-3, 1.600, 1.000, 2.000), 0.0398107171058654, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 10, 1e-3, 1.800, 1.000, 2.000), 0.0063095735386013, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 10, 1e-3, 2.000, 1.000, 2.000), 1e-3, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, 10, 1e-3, 2.200, 1.000, 2.000), 1e-3, 1e-6));

      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -1e-3, -10, 0.800, 1.000, 2.000), -1e-3, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -1e-3, -10, 1.000, 1.000, 2.000), -1e-3, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -1e-3, -10, 1.200, 1.000, 2.000), -0.0063095735386013, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -1e-3, -10, 1.400, 1.000, 2.000), -0.0398107171058654, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -1e-3, -10, 1.600, 1.000, 2.000), -0.2511886358261108, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -1e-3, -10, 1.800, 1.000, 2.000), -1.5848932266235352, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -1e-3, -10, 2.000, 1.000, 2.000), -10, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -1e-3, -10, 2.200, 1.000, 2.000), -10, 1e-6));

      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -10, -1e-3, 0.800, 1.000, 2.000), -10, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -10, -1e-3, 1.000, 1.000, 2.000), -10, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -10, -1e-3, 1.200, 1.000, 2.000), -1.5848932266235352, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -10, -1e-3, 1.400, 1.000, 2.000), -0.2511886358261108, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -10, -1e-3, 1.600, 1.000, 2.000), -0.0398107171058654, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -10, -1e-3, 1.800, 1.000, 2.000), -0.0063095735386013, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -10, -1e-3, 2.000, 1.000, 2.000), -1e-3, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -10, -1e-3, 2.200, 1.000, 2.000), -1e-3, 1e-6));

      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, -10, +10, 1.500, 1.000, 2.000), 0, 1e-6));
      assert(closeTo(AudioParam.$exponentialRampToValueAtTime(0, +10, -10, 1.500, 1.000, 2.000), 0, 1e-6));
    });
  });
  describe("$setTargetAtTime(v0, v1, t, t0, tau): number", function() {
    it("works", function() {
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 0.000, 1.000, 1.0), 0, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 0.200, 1.000, 1.0), 0, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 0.400, 1.000, 1.0), 0, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 0.600, 1.000, 1.0), 0, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 0.800, 1.000, 1.0), 0, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 1.000, 1.000, 1.0), 0, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 1.200, 1.000, 1.0), 1.81269252300262, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 1.400, 1.000, 1.0), 3.29679942131042, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 1.600, 1.000, 1.0), 4.51188373565673, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 1.800, 1.000, 1.0), 5.50671052932739, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 2.000, 1.000, 1.0), 6.32120561599731, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 2.200, 1.000, 1.0), 6.98805809020996, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 2.400, 1.000, 1.0), 7.53403043746948, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 2.600, 1.000, 1.0), 7.98103475570678, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 2.800, 1.000, 1.0), 8.34701156616211, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 3.000, 1.000, 1.0), 8.64664745330810, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 3.200, 1.000, 1.0), 8.89196872711181, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 3.400, 1.000, 1.0), 9.09282016754150, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 3.800, 1.000, 1.0), 9.39189910888671, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 4.000, 1.000, 1.0), 9.50212955474853, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 4.200, 1.000, 1.0), 9.59237766265869, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 4.400, 1.000, 1.0), 9.66626739501953, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 4.800, 1.000, 1.0), 9.77629184722900, 1e-6));
      assert(closeTo(AudioParam.$setTargetAtTime(0, 10, 5.000, 1.000, 1.0), 9.81684398651123, 1e-6));
    });
  });
  describe("$setValueCurveAtTime(v, t, t0, t1, curve): number", function() {
    it("works", function() {
      var curve = new Float32Array([ 440, 660, 880, 220 ]);

      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 0.000, 1.000, 4.000, curve), 440, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 0.200, 1.000, 4.000, curve), 440, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 0.400, 1.000, 4.000, curve), 440, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 0.600, 1.000, 4.000, curve), 440, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 0.800, 1.000, 4.000, curve), 440, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 1.000, 1.000, 4.000, curve), 440, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 1.200, 1.000, 4.000, curve), 440, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 1.400, 1.000, 4.000, curve), 440, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 1.600, 1.000, 4.000, curve), 440, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 1.800, 1.000, 4.000, curve), 660, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 2.000, 1.000, 4.000, curve), 660, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 2.200, 1.000, 4.000, curve), 660, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 2.400, 1.000, 4.000, curve), 660, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 2.600, 1.000, 4.000, curve), 880, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 2.800, 1.000, 4.000, curve), 880, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 3.000, 1.000, 4.000, curve), 880, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 3.200, 1.000, 4.000, curve), 880, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 3.400, 1.000, 4.000, curve), 220, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 3.600, 1.000, 4.000, curve), 220, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 3.800, 1.000, 4.000, curve), 220, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 4.000, 1.000, 4.000, curve), 220, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 4.200, 1.000, 4.000, curve), 220, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 4.400, 1.000, 4.000, curve), 220, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 4.600, 1.000, 4.000, curve), 220, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 4.800, 1.000, 4.000, curve), 220, 1e-6));
      assert(closeTo(AudioParam.$setValueCurveAtTime(0, 5.000, 1.000, 4.000, curve), 220, 1e-6));
    });
  });

  describe("works", function() {
    it("SetValueAtTime", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.setValueAtTime(0, 0.000);
      param.setValueAtTime(0, 4.000);
      param.setValueAtTime(0, 1.000);
      param.setValueAtTime(100, 1.000);
      param.setValueAtTime(1000, 4.000);

      assert(param.$valueAtTime("00:00.000") === 0);
      assert(param.$valueAtTime("00:00.500") === 0);
      assert(param.$valueAtTime("00:00.999") === 0);
      assert(param.$valueAtTime("00:01.000") === 100);
      assert(param.$valueAtTime("00:01.500") === 100);
      assert(param.$valueAtTime("00:02.000") === 100);
      assert(param.$valueAtTime("00:02.500") === 100);
      assert(param.$valueAtTime("00:03.000") === 100);
      assert(param.$valueAtTime("00:03.500") === 100);
      assert(param.$valueAtTime("00:03.999") === 100);
      assert(param.$valueAtTime("00:04.000") === 1000);
      assert(param.$valueAtTime("00:04.500") === 1000);
      assert(param.$valueAtTime("00:05.000") === 1000);
    });
    it("LinearRampToValue", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.setValueAtTime(0, 0.000);
      param.linearRampToValueAtTime(100, 1.000);
      param.linearRampToValueAtTime(1000, 4.000);

      assert(param.$valueAtTime("00:00.000") === 0.000);
      assert(param.$valueAtTime("00:00.500") === 50.000);
      assert(param.$valueAtTime("00:00.999") === 99.900);
      assert(param.$valueAtTime("00:01.000") === 100.000);
      assert(param.$valueAtTime("00:01.500") === 250.000);
      assert(param.$valueAtTime("00:02.000") === 400.000);
      assert(param.$valueAtTime("00:02.500") === 550.000);
      assert(param.$valueAtTime("00:03.000") === 700.000);
      assert(param.$valueAtTime("00:03.500") === 850.000);
      assert(param.$valueAtTime("00:03.999") === 999.700);
      assert(param.$valueAtTime("00:04.000") === 1000.000);
      assert(param.$valueAtTime("00:04.500") === 1000.000);
      assert(param.$valueAtTime("00:05.000") === 1000.000);
    });
    it("ExponentialRampToValue", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.setValueAtTime(0.0001, 0.000);
      param.exponentialRampToValueAtTime(100, 1.000);
      param.exponentialRampToValueAtTime(1000, 4.000);

      assert(closeTo(param.$valueAtTime("00:00.000"), 0.000, 1e-3));
      assert(closeTo(param.$valueAtTime("00:00.500"), 0.100, 1e-3));
      assert(closeTo(param.$valueAtTime("00:00.999"), 98.627, 1e-3));
      assert(closeTo(param.$valueAtTime("00:01.000"), 100.000, 1e-3));
      assert(closeTo(param.$valueAtTime("00:01.500"), 146.779, 1e-3));
      assert(closeTo(param.$valueAtTime("00:02.000"), 215.443, 1e-3));
      assert(closeTo(param.$valueAtTime("00:02.500"), 316.227, 1e-3));
      assert(closeTo(param.$valueAtTime("00:03.000"), 464.158, 1e-3));
      assert(closeTo(param.$valueAtTime("00:03.500"), 681.292, 1e-3));
      assert(closeTo(param.$valueAtTime("00:03.999"), 999.232, 1e-3));
      assert(param.$valueAtTime("00:04.000") === 1000);
      assert(param.$valueAtTime("00:04.500") === 1000);
      assert(param.$valueAtTime("00:05.000") === 1000);
    });
    it("SetTarget", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.setValueAtTime(0, 0.000);
      param.setTargetAtTime(100, 1.000, 2);
      param.setTargetAtTime(1000, 3.500, 0.5);

      assert(param.$valueAtTime("00:00.000") === 0);
      assert(param.$valueAtTime("00:00.500") === 0);
      assert(param.$valueAtTime("00:00.999") === 0);
      assert(param.$valueAtTime("00:01.000") === 0);
      assert(closeTo(param.$valueAtTime("00:01.500"), 22.119, 1e-3));
      assert(closeTo(param.$valueAtTime("00:02.000"), 39.346, 1e-3));
      assert(closeTo(param.$valueAtTime("00:02.500"), 52.763, 1e-3));
      assert(closeTo(param.$valueAtTime("00:03.000"), 63.212, 1e-3));
      assert(closeTo(param.$valueAtTime("00:03.500"), 71.349, 1e-3));
      assert(closeTo(param.$valueAtTime("00:04.000"), 658.368, 1e-3));
      assert(closeTo(param.$valueAtTime("00:04.500"), 874.320, 1e-3));
      assert(closeTo(param.$valueAtTime("00:05.000"), 953.765, 1e-3));
    });
    it("SetCurve", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });
      var curve1 = new Float32Array([ 220, 330, 440, 330, 220 ]);
      var curve2 = new Float32Array([ 1, 2, 3, 4 ]);

      param.setValueAtTime(0, 0.000);
      param.setValueCurveAtTime(curve1, 1.000, 2);
      param.setValueCurveAtTime(curve2, 4.000, 4);

      assert(param.$valueAtTime("00:00.000") === 0);
      assert(param.$valueAtTime("00:00.999") === 0);

      assert(param.$valueAtTime("00:01.000") === 220);
      assert(param.$valueAtTime("00:01.400") === 220);

      assert(param.$valueAtTime("00:01.401") === 330);
      assert(param.$valueAtTime("00:01.799") === 330);

      assert(param.$valueAtTime("00:01.800") === 440);
      assert(param.$valueAtTime("00:02.199") === 440);

      assert(param.$valueAtTime("00:02.200") === 330);
      assert(param.$valueAtTime("00:02.599") === 330);

      assert(param.$valueAtTime("00:02.600") === 220);
      assert(param.$valueAtTime("00:03.000") === 220);

      assert(param.$valueAtTime("00:04.000") === 1);
      assert(param.$valueAtTime("00:04.999") === 1);

      assert(param.$valueAtTime("00:05.000") === 2);
      assert(param.$valueAtTime("00:05.999") === 2);

      assert(param.$valueAtTime("00:06.000") === 3);
      assert(param.$valueAtTime("00:06.999") === 3);

      assert(param.$valueAtTime("00:07.000") === 4);
      assert(param.$valueAtTime("00:07.999") === 4);

      assert(param.$valueAtTime("00:08.000") === 4);
    });
    it("Cancel", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      param.setValueAtTime(0, 0.000);
      param.linearRampToValueAtTime(100, 1.000);
      param.linearRampToValueAtTime(1000, 4.000);
      param.cancelScheduledValues(3.000);

      assert(param.$valueAtTime("00:00.000") === 0.000);
      assert(param.$valueAtTime("00:00.500") === 50.000);
      assert(param.$valueAtTime("00:00.999") === 99.900);
      assert(param.$valueAtTime("00:01.000") === 100.000);
      assert(param.$valueAtTime("00:01.500") === 100.000);
      assert(param.$valueAtTime("00:02.000") === 100.000);
      assert(param.$valueAtTime("00:02.500") === 100.000);
      assert(param.$valueAtTime("00:03.000") === 100.000);
      assert(param.$valueAtTime("00:03.500") === 100.000);
      assert(param.$valueAtTime("00:04.000") === 100.000);
      assert(param.$valueAtTime("00:04.500") === 100.000);
      assert(param.$valueAtTime("00:05.000") === 100.000);
    });
  });
});
