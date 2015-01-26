"use strict";

describe("AudioParam", function() {
  var ctx = null;
  var param = null;

  beforeEach(function() {
    var osc;
    ctx = new global.AudioContext();
    osc = ctx.createOscillator();
    param = osc.frequency;
    osc.connect(ctx.destination);
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      assert.throws(function() {
        return new global.AudioParam();
      }, TypeError, "Illegal constructor");
    });
  });

  describe("#connect()", function() {
    it("should be connected", function() {
      var osc = ctx.createOscillator();
      var amp = ctx.createGain();

      assert.doesNotThrow(function() {
        osc.connect(amp.gain);
      });
    });
  });

  describe("#value", function() {
    it("should be exist", function() {
      assert(typeof param.value === "number");
    });
    it("should be type of number", function() {
      assert.doesNotThrow(function() {
        param.value = 0;
      });
      assert.throws(function() {
        param.value = "INVALID";
      }, TypeError);
    });
  });

  describe("#setValueAtTime(value, startTime)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        param.setValueAtTime(0, 0);
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        param.setValueAtTime("INVALID", 0);
      }, TypeError, "AudioParam#setValueAtTime(value, startTime)");
    });
    it("throw error", function() {
      assert.throws(function() {
        param.setValueAtTime(0, "INVALID");
      }, TypeError, "AudioParam#setValueAtTime(value, startTime)");
    });
  });

  describe("#linearRampToValueAtTime(value, endTime)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        param.linearRampToValueAtTime(0, 0);
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        param.linearRampToValueAtTime("INVALID", 0);
      }, TypeError, "AudioParam#linearRampToValueAtTime(value, endTime)");
    });
    it("throw error", function() {
      assert.throws(function() {
        param.linearRampToValueAtTime(0, "INVALID");
      }, TypeError, "AudioParam#linearRampToValueAtTime(value, endTime)");
    });
  });

  describe("#exponentialRampToValueAtTime(value, endTime)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        param.exponentialRampToValueAtTime(0, 0);
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        param.exponentialRampToValueAtTime("INVALID", 0);
      }, TypeError, "AudioParam#exponentialRampToValueAtTime(value, endTime)");
    });
    it("throw error", function() {
      assert.throws(function() {
        param.exponentialRampToValueAtTime(0, "INVALID");
      }, TypeError, "AudioParam#exponentialRampToValueAtTime(value, endTime)");
    });
  });

  describe("#setTargetAtTime(target, startTime, timeConstant)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        param.setTargetAtTime(0, 0, 0);
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        param.setTargetAtTime("INVALID", 0, 0);
      }, TypeError, "AudioParam#setTargetAtTime(target, startTime, timeConstant)");
    });
    it("throw error", function() {
      assert.throws(function() {
        param.setTargetAtTime(0, "INVALID", 0);
      }, TypeError, "AudioParam#setTargetAtTime(target, startTime, timeConstant)");
    });
    it("throw error", function() {
      assert.throws(function() {
        param.setTargetAtTime(0, 0, "INVALID");
      }, TypeError, "AudioParam#setTargetAtTime(target, startTime, timeConstant)");
    });
  });

  describe("#setValueCurveAtTime(values, startTime, duration)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        param.setValueCurveAtTime(new Float32Array(32), 0, 0);
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        param.setValueCurveAtTime("INVALID", 0, 0);
      }, TypeError, "AudioParam#setValueCurveAtTime(values, startTime, duration)");
    });
    it("throw error", function() {
      assert.throws(function() {
        param.setValueCurveAtTime(new Float32Array(32), "INVALID", 0);
      }, TypeError, "AudioParam#setValueCurveAtTime(values, startTime, duration)");
    });
    it("throw error", function() {
      assert.throws(function() {
        param.setValueCurveAtTime(new Float32Array(32), 0, "INVALID");
      }, TypeError, "AudioParam#setValueCurveAtTime(values, startTime, duration)");
    });
  });

  describe("#cancelScheduledValues(startTime)", function() {
    it("should work", function() {
      assert.doesNotThrow(function() {
        param.cancelScheduledValues(0);
      });
    });
    it("throw error", function() {
      assert.throws(function() {
        param.cancelScheduledValues("INVALID");
      }, TypeError, "AudioParam#cancelScheduledValues(startTime)");
    });
  });

  describe("#$valueAtTime(t)", function() {
    it("SetValue", function() {
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
