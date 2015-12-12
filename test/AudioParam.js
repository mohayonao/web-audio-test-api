describe("AudioParam", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var utils = WebAudioTestAPI.utils;
  var immigration = utils.Immigration.getInstance();
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor", function() {
    it("()", function() {
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

  describe("#name", function() {
    it("get: string", function() {
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

  describe("#defaultValue", function() {
    it("get: number", function() {
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

  describe("#value", function() {
    it("get/set: number", function() {
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

  describe("#setValueAtTime", function() {
    it("(value: number, startTime: number): void", function() {
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

  describe("#linearRampToValueAtTime", function() {
    it("(value: number, endTime: number): void", function() {
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

  describe("#exponentialRampToValueAtTime", function() {
    it("(value: number, endTime: number): void", function() {
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

  describe("#setTargetAtTime", function() {
    it("(target: number, startTime: number, timeConstant: number): void", function() {
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

  describe("#setValueCurveAtTime", function() {
    it("(values: Float32Array, startTime: number, duration: number): void", function() {
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

  describe("#cancelScheduledValues", function() {
    it("(startTime: number): void", function() {
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

  describe("#toJSON", function() {
    it("(): object", function() {
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

  describe("$name", function() {
    it("get: string", function() {
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

  describe("$valueAtTime", function() {
    it("(time: number|string): number", function() {
      var node = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioNode(admission, { context: audioContext });
      });
      var param = immigration.apply(function(admission) {
        return new WebAudioTestAPI.AudioParam(admission, node, "name", 0, 0, 0);
      });

      assert(typeof param.$valueAtTime("00:00.000") === "number");
    });
  });

  describe("$process", function() {
    it("(inNumSamples, tick): void", function() {
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

  describe("$isConnectedFrom", function() {
    it("(destination, output = 0): boolean", function() {
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
