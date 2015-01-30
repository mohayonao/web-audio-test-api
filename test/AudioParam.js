"use strict";

describe("AudioParam", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("constructor", function() {
    it("(): throws TypeError", function() {
      assert.throws(function() {
        global.AudioParam();
      }, function(e) {
        return e instanceof TypeError && /Illegal constructor/.test(e.message);
      });
    });
  });

  describe("#name", function() {
    it("get: string", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      assert(typeof param.name === "string");

      assert.throws(function() {
        param.name = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#defaultValue", function() {
    it("get: number", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      assert(typeof param.defaultValue === "number");

      assert.throws(function() {
        param.defaultValue = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#minValue", function() {
    it("get: number", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      assert(typeof param.minValue === "number");

      assert.throws(function() {
        param.minValue = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#maxValue", function() {
    it("get: number", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      assert(typeof param.maxValue === "number");

      assert.throws(function() {
        param.maxValue = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /readonly/.test(e.message);
      });
    });
  });

  describe("#value", function() {
    it("get/set: number", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      assert(typeof param.value === "number");

      param.value = 0;

      assert.throws(function() {
        param.value = "INVALID";
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#setValueAtTime", function() {
    it("(value: number, startTime: number): void", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      param.setValueAtTime(0, 0);

      assert.throws(function() {
        param.setValueAtTime("INVALID", 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        param.setValueAtTime(0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#linearRampToValueAtTime", function() {
    it("(value: number, endTime: number): void", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      param.linearRampToValueAtTime(0, 0);

      assert.throws(function() {
        param.linearRampToValueAtTime("INVALID", 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        param.linearRampToValueAtTime(0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#exponentialRampToValueAtTime", function() {
    it("(value: number, endTime: number): void", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      param.exponentialRampToValueAtTime(0, 0);

      assert.throws(function() {
        param.exponentialRampToValueAtTime("INVALID", 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        param.exponentialRampToValueAtTime(0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#setTargetAtTime", function() {
    it("(target: number, startTime: number, timeConstant: number): void", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      param.setTargetAtTime(0, 0, 0);

      assert.throws(function() {
        param.setTargetAtTime("INVALID", 0, 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        param.setTargetAtTime(0, "INVALID", 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        param.setTargetAtTime(0, 0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#setValueCurveAtTime", function() {
    it("(values: Float32Array, startTime: number, duration: number): void", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);
      var values = new Float32Array(32);

      param.setValueCurveAtTime(values, 0, 0);

      assert.throws(function() {
        param.setValueCurveAtTime("INVALID", 0, 0);
      }, function(e) {
        return e instanceof TypeError && /should be a Float32Array/.test(e.message);
      });

      assert.throws(function() {
        param.setValueCurveAtTime(values, "INVALID", 0);
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });

      assert.throws(function() {
        param.setValueCurveAtTime(values, 0, "INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#cancelScheduledValues", function() {
    it("(startTime: number): void", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      param.cancelScheduledValues(0);

      assert.throws(function() {
        param.cancelScheduledValues("INVALID");
      }, function(e) {
        return e instanceof TypeError && /should be a number/.test(e.message);
      });
    });
  });

  describe("#$valueAtTime", function() {
    it("(time: number): number", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      param.setValueAtTime(0, 0.000);
      param.setValueAtTime(0, 4.000);
      param.setValueAtTime(0, 1.000);
      param.setValueAtTime(100, 1.000);
      param.setValueAtTime(1000, 4.000);

      assert(param.$valueAtTime(0.000) ===    0, "00:00.000");
      assert(param.$valueAtTime(0.500) ===    0, "00:00.500");
      assert(param.$valueAtTime(1.000) ===  100, "00:01.000");
      assert(param.$valueAtTime(1.500) ===  100, "00:01.500");
      assert(param.$valueAtTime(2.000) ===  100, "00:02.000");
      assert(param.$valueAtTime(2.500) ===  100, "00:02.500");
      assert(param.$valueAtTime(3.000) ===  100, "00:02.000");
      assert(param.$valueAtTime(3.500) ===  100, "00:02.500");
      assert(param.$valueAtTime(4.000) === 1000, "00:02.000");
      assert(param.$valueAtTime(4.500) === 1000, "00:02.500");
      assert(param.$valueAtTime(5.000) === 1000, "00:02.000");
    });
    it("LinearRampToValue", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      param.setValueAtTime(0, 0.000);
      param.linearRampToValueAtTime(100, 1.000);
      param.linearRampToValueAtTime(1000, 4.000);

      assert(param.$valueAtTime(0.000) ===    0, "00:00.000");
      assert(param.$valueAtTime(0.500) ===   50, "00:00.500");
      assert(param.$valueAtTime(1.000) ===  100, "00:01.000");
      assert(param.$valueAtTime(1.500) ===  250, "00:01.500");
      assert(param.$valueAtTime(2.000) ===  400, "00:02.000");
      assert(param.$valueAtTime(2.500) ===  550, "00:02.500");
      assert(param.$valueAtTime(3.000) ===  700, "00:02.000");
      assert(param.$valueAtTime(3.500) ===  850, "00:02.500");
      assert(param.$valueAtTime(4.000) === 1000, "00:02.000");
      assert(param.$valueAtTime(4.500) === 1000, "00:02.500");
      assert(param.$valueAtTime(5.000) === 1000, "00:02.000");
    });
    it("ExponentialRampToValue", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      param.setValueAtTime(0.0001, 0.000);
      param.exponentialRampToValueAtTime(100, 1.000);
      param.exponentialRampToValueAtTime(1000, 4.000);

      assert(closeTo(param.$valueAtTime(0.000), 0.0001, 1e-6), "00:00.000");
      assert(closeTo(param.$valueAtTime(0.500), 0.1, 1e-6), "00:00.500");
      assert(closeTo(param.$valueAtTime(1.000), 100, 1e-6), "00:01.000");
      assert(closeTo(param.$valueAtTime(1.500), 146.77992676220694, 1e-6), "00:01.500");
      assert(closeTo(param.$valueAtTime(2.000), 215.44346900318837, 1e-6), "00:02.000");
      assert(closeTo(param.$valueAtTime(2.500), 316.22776601683796, 1e-6), "00:02.500");
      assert(closeTo(param.$valueAtTime(3.000), 464.15888336127784, 1e-6), "00:02.000");
      assert(closeTo(param.$valueAtTime(3.500), 681.2920690579613, 1e-6), "00:02.500");
      assert(param.$valueAtTime(4.000) === 1000, "00:02.000");
      assert(param.$valueAtTime(4.500) === 1000, "00:02.500");
      assert(param.$valueAtTime(5.000) === 1000, "00:02.000");
    });
    it("SetTarget", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      param.setValueAtTime(0, 0.000);
      param.setTargetAtTime( 100, 1.000, 2);
      param.setTargetAtTime(1000, 3.500, 0.5);

      assert(param.$valueAtTime(0.000) === 0, "00:00.000");
      assert(param.$valueAtTime(0.500) === 0, "00:00.500");
      assert(param.$valueAtTime(1.000) === -0, "00:01.000");
      assert(closeTo(param.$valueAtTime(1.500), 22.119921692859506, 1e-6), "00:01.500");
      assert(closeTo(param.$valueAtTime(2.000), 39.346934028736655, 1e-6), "00:02.000");
      assert(closeTo(param.$valueAtTime(2.500), 52.763344725898534, 1e-6), "00:02.500");
      assert(closeTo(param.$valueAtTime(3.000), 63.212055882855765, 1e-6), "00:03.000");
      assert(closeTo(param.$valueAtTime(3.500), 71.34952031398099, 1e-6), "00:03.500");
      assert(closeTo(param.$valueAtTime(4.000), 658.3685804895155, 1e-6), "00:04.000");
      assert(closeTo(param.$valueAtTime(4.500), 874.3208243038764, 1e-6), "00:04.500");
      assert(closeTo(param.$valueAtTime(5.000), 953.7652150780225, 1e-6), "00:05.000");
    });
    it("SetCurve", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);
      var curve1 = new Float32Array([ 220, 330, 440, 330, 220 ]);
      var curve2 = new Float32Array([ 1, 2, 3, 4 ]);

      param.setValueAtTime(0, 0.000);
      param.setValueCurveAtTime(curve1, 1.000, 2);
      param.setValueCurveAtTime(curve2, 4.000, 4);

      assert(param.$valueAtTime(0.000) ===   0, "00:00.000");
      assert(param.$valueAtTime(0.500) ===   0, "00:00.500");
      assert(param.$valueAtTime(1.000) === 220, "00:01.000");
      assert(param.$valueAtTime(1.500) === 330, "00:01.500");
      assert(param.$valueAtTime(2.000) === 440, "00:02.000");
      assert(param.$valueAtTime(2.500) === 330, "00:02.500");
      assert(param.$valueAtTime(3.000) === 220, "00:03.000");
      assert(param.$valueAtTime(3.500) === 220, "00:03.500");

      assert(param.$valueAtTime(4.000) === 1, "00:04.000");
      assert(param.$valueAtTime(4.500) === 1, "00:04.500");
      assert(param.$valueAtTime(5.000) === 2, "00:05.000");
      assert(param.$valueAtTime(5.500) === 2, "00:05.500");
      assert(param.$valueAtTime(6.000) === 3, "00:06.000");
      assert(param.$valueAtTime(6.500) === 3, "00:06.500");
      assert(param.$valueAtTime(7.000) === 4, "00:07.000");
      assert(param.$valueAtTime(7.500) === 4, "00:07.500");
      assert(param.$valueAtTime(8.000) === 4, "00:08.000");
    });
    it("Cancel", function() {
      var node = new WebAudioTestAPI.AudioNode(audioContext);
      var param = new WebAudioTestAPI.AudioParam(node, "name", 0, 0, 0);

      param.setValueAtTime(0, 0.000);
      param.linearRampToValueAtTime( 100, 1.000);
      param.linearRampToValueAtTime(1000, 4.000);
      param.cancelScheduledValues(3.000);

      assert(param.$valueAtTime(0.000) ===   0, "00:00.000");
      assert(param.$valueAtTime(0.500) ===  50, "00:00.500");
      assert(param.$valueAtTime(1.000) === 100, "00:01.000");
      assert(param.$valueAtTime(1.500) === 100, "00:01.500");
      assert(param.$valueAtTime(2.000) === 100, "00:02.000");
      assert(param.$valueAtTime(2.500) === 100, "00:02.500");
      assert(param.$valueAtTime(3.000) === 100, "00:02.000");
      assert(param.$valueAtTime(3.500) === 100, "00:02.500");
      assert(param.$valueAtTime(4.000) === 100, "00:02.000");
      assert(param.$valueAtTime(4.500) === 100, "00:02.500");
      assert(param.$valueAtTime(5.000) === 100, "00:02.000");
    });
  });

});
