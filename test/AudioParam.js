/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-test-api");

describe("AudioParam", function() {
  var ctx = null;
  var param = null;

  beforeEach(function() {
    var osc;
    ctx = new AudioContext();
    osc = ctx.createOscillator();
    param = osc.frequency;
    osc.connect(ctx.destination);
  });

  describe("()", function() {
    it("throw illegal constructor", function() {
      expect(function() {
        return new AudioParam();
      }).to.throw(TypeError, "Illegal constructor");
    });
  });

  describe("#connect()", function() {
    it("should be connected", function() {
      var osc = ctx.createOscillator();
      var amp = ctx.createGain();

      expect(function() {
        osc.connect(amp.gain);
      }).not.throw();
    });
  });

  describe("#value", function() {
    it("should be exist", function() {
      expect(param).to.have.property("value");
    });
    it("should be type of number", function() {
      expect(function() {
         param.value = 0;
      }).to.not.throw();
      expect(function() {
        param.value = "INVALID";
      }).to.throw(TypeError);
    });
  });

  describe("#setValueAtTime(value, startTime)", function() {
    it("should work", function() {
      expect(function() {
        param.setValueAtTime(0, 0);
      }).to.not.throw();
    });
    it("throw error", function() {
      expect(function() {
        param.setValueAtTime("INVALID", 0);
      }).to.throw(TypeError, "AudioParam#setValueAtTime(value, startTime)");
    });
    it("throw error", function() {
      expect(function() {
        param.setValueAtTime(0, "INVALID");
      }).to.throw(TypeError, "AudioParam#setValueAtTime(value, startTime)");
    });
  });

  describe("#linearRampToValueAtTime(value, endTime)", function() {
    it("should work", function() {
      expect(function() {
        param.linearRampToValueAtTime(0, 0);
      }).to.not.throw();
    });
    it("throw error", function() {
      expect(function() {
        param.linearRampToValueAtTime("INVALID", 0);
      }).to.throw(TypeError, "AudioParam#linearRampToValueAtTime(value, endTime)");
    });
    it("throw error", function() {
      expect(function() {
        param.linearRampToValueAtTime(0, "INVALID");
      }).to.throw(TypeError, "AudioParam#linearRampToValueAtTime(value, endTime)");
    });
  });

  describe("#exponentialRampToValueAtTime(value, endTime)", function() {
    it("should work", function() {
      expect(function() {
        param.exponentialRampToValueAtTime(0, 0);
      }).to.not.throw();
    });
    it("throw error", function() {
      expect(function() {
        param.exponentialRampToValueAtTime("INVALID", 0);
      }).to.throw(TypeError, "AudioParam#exponentialRampToValueAtTime(value, endTime)");
    });
    it("throw error", function() {
      expect(function() {
        param.exponentialRampToValueAtTime(0, "INVALID");
      }).to.throw(TypeError, "AudioParam#exponentialRampToValueAtTime(value, endTime)");
    });
  });

  describe("#setTargetAtTime(target, startTime, timeConstant)", function() {
    it("should work", function() {
      expect(function() {
        param.setTargetAtTime(0, 0, 0);
      }).to.not.throw();
    });
    it("throw error", function() {
      expect(function() {
        param.setTargetAtTime("INVALID", 0, 0);
      }).to.throw(TypeError, "AudioParam#setTargetAtTime(target, startTime, timeConstant)");
    });
    it("throw error", function() {
      expect(function() {
        param.setTargetAtTime(0, "INVALID", 0);
      }).to.throw(TypeError, "AudioParam#setTargetAtTime(target, startTime, timeConstant)");
    });
    it("throw error", function() {
      expect(function() {
        param.setTargetAtTime(0, 0, "INVALID");
      }).to.throw(TypeError, "AudioParam#setTargetAtTime(target, startTime, timeConstant)");
    });
  });

  describe("#setValueCurveAtTime(values, startTime, duration)", function() {
    it("should work", function() {
      expect(function() {
        param.setValueCurveAtTime(new Float32Array(32), 0, 0);
      }).to.not.throw();
    });
    it("throw error", function() {
      expect(function() {
        param.setValueCurveAtTime("INVALID", 0, 0);
      }).to.throw(TypeError, "AudioParam#setValueCurveAtTime(values, startTime, duration)");
    });
    it("throw error", function() {
      expect(function() {
        param.setValueCurveAtTime(new Float32Array(32), "INVALID", 0);
      }).to.throw(TypeError, "AudioParam#setValueCurveAtTime(values, startTime, duration)");
    });
    it("throw error", function() {
      expect(function() {
        param.setValueCurveAtTime(new Float32Array(32), 0, "INVALID");
      }).to.throw(TypeError, "AudioParam#setValueCurveAtTime(values, startTime, duration)");
    });
  });

  describe("#cancelScheduledValues(startTime)", function() {
    it("should work", function() {
      expect(function() {
        param.cancelScheduledValues(0);
      }).to.not.throw();
    });
    it("throw error", function() {
      expect(function() {
        param.cancelScheduledValues("INVALID");
      }).to.throw(TypeError, "AudioParam#cancelScheduledValues(startTime)");
    });
  });

  describe("#$valueAtTime(t)", function() {
    it("SetValue", function() {
      param.setValueAtTime(0, 0.000);
      param.setValueAtTime(0, 4.000);
      param.setValueAtTime(0, 1.000);
      param.setValueAtTime(100, 1.000);
      param.setValueAtTime(1000, 4.000);

      expect(param.$valueAtTime(0.000), "00:00.000").to.equal(0);
      expect(param.$valueAtTime(0.500), "00:00.500").to.equal(0);
      expect(param.$valueAtTime(1.000), "00:01.000").to.equal(100);
      expect(param.$valueAtTime(1.500), "00:01.500").to.equal(100);
      expect(param.$valueAtTime(2.000), "00:02.000").to.equal(100);
      expect(param.$valueAtTime(2.500), "00:02.500").to.equal(100);
      expect(param.$valueAtTime(3.000), "00:02.000").to.equal(100);
      expect(param.$valueAtTime(3.500), "00:02.500").to.equal(100);
      expect(param.$valueAtTime(4.000), "00:02.000").to.equal(1000);
      expect(param.$valueAtTime(4.500), "00:02.500").to.equal(1000);
      expect(param.$valueAtTime(5.000), "00:02.000").to.equal(1000);
    });
    it("LinearRampToValue", function() {
      param.setValueAtTime(0, 0.000);
      param.linearRampToValueAtTime(100, 1.000);
      param.linearRampToValueAtTime(1000, 4.000);

      expect(param.$valueAtTime(0.000), "00:00.000").to.equal(0);
      expect(param.$valueAtTime(0.500), "00:00.500").to.equal(50);
      expect(param.$valueAtTime(1.000), "00:01.000").to.equal(100);
      expect(param.$valueAtTime(1.500), "00:01.500").to.equal(250);
      expect(param.$valueAtTime(2.000), "00:02.000").to.equal(400);
      expect(param.$valueAtTime(2.500), "00:02.500").to.equal(550);
      expect(param.$valueAtTime(3.000), "00:02.000").to.equal(700);
      expect(param.$valueAtTime(3.500), "00:02.500").to.equal(850);
      expect(param.$valueAtTime(4.000), "00:02.000").to.equal(1000);
      expect(param.$valueAtTime(4.500), "00:02.500").to.equal(1000);
      expect(param.$valueAtTime(5.000), "00:02.000").to.equal(1000);
    });
    it("ExponentialRampToValue", function() {
      param.setValueAtTime(0.0001, 0.000);
      param.exponentialRampToValueAtTime(100, 1.000);
      param.exponentialRampToValueAtTime(1000, 4.000);

      expect(param.$valueAtTime(0.000), "00:00.000").to.be.closeTo(0.0001, 1e-6);
      expect(param.$valueAtTime(0.500), "00:00.500").to.be.closeTo(0.1, 1e-6);
      expect(param.$valueAtTime(1.000), "00:01.000").to.be.closeTo(100, 1e-6);
      expect(param.$valueAtTime(1.500), "00:01.500").to.be.closeTo(146.77992676220694, 1e-6);
      expect(param.$valueAtTime(2.000), "00:02.000").to.be.closeTo(215.44346900318837, 1e-6);
      expect(param.$valueAtTime(2.500), "00:02.500").to.be.closeTo(316.22776601683796, 1e-6);
      expect(param.$valueAtTime(3.000), "00:02.000").to.be.closeTo(464.15888336127784, 1e-6);
      expect(param.$valueAtTime(3.500), "00:02.500").to.be.closeTo(681.2920690579613, 1e-6);
      expect(param.$valueAtTime(4.000), "00:02.000").to.equal(1000);
      expect(param.$valueAtTime(4.500), "00:02.500").to.equal(1000);
      expect(param.$valueAtTime(5.000), "00:02.000").to.equal(1000);
    });
    it("SetTarget", function() {
      param.setValueAtTime(0, 0.000);
      param.setTargetAtTime( 100, 1.000, 2);
      param.setTargetAtTime(1000, 3.500, 0.5);

      expect(param.$valueAtTime(0.000), "00:00.000").to.equal(0);
      expect(param.$valueAtTime(0.500), "00:00.500").to.equal(0);
      expect(param.$valueAtTime(1.000), "00:01.000").to.equal(0);
      expect(param.$valueAtTime(1.500), "00:01.500").to.be.closeTo(22.119921692859506, 1e-6);
      expect(param.$valueAtTime(2.000), "00:02.000").to.be.closeTo(39.346934028736655, 1e-6);
      expect(param.$valueAtTime(2.500), "00:02.500").to.be.closeTo(52.763344725898534, 1e-6);
      expect(param.$valueAtTime(3.000), "00:03.000").to.be.closeTo(63.212055882855765, 1e-6);
      expect(param.$valueAtTime(3.500), "00:03.500").to.be.closeTo(71.34952031398099, 1e-6);
      expect(param.$valueAtTime(4.000), "00:04.000").to.be.closeTo(658.3685804895155, 1e-6);
      expect(param.$valueAtTime(4.500), "00:04.500").to.be.closeTo(874.3208243038764, 1e-6);
      expect(param.$valueAtTime(5.000), "00:05.000").to.be.closeTo(953.7652150780225, 1e-6);
    });
    it("SetCurve", function() {
      var curve = new Float32Array([ 220, 330, 440, 330, 220 ]);

      param.setValueAtTime(0, 0.000);
      param.setValueCurveAtTime(curve, 1.000, 2);
      param.setValueCurveAtTime(curve, 4.000, 4);

      expect(param.$valueAtTime(0.000), "00:00.000").to.equal(0);
      expect(param.$valueAtTime(0.500), "00:00.500").to.equal(0);
      expect(param.$valueAtTime(1.000), "00:01.000").to.equal(220);
      expect(param.$valueAtTime(1.500), "00:01.500").to.equal(330);
      expect(param.$valueAtTime(2.000), "00:02.000").to.equal(440);
      expect(param.$valueAtTime(2.500), "00:02.500").to.equal(330);
      expect(param.$valueAtTime(3.000), "00:03.000").to.equal(220);
      expect(param.$valueAtTime(3.500), "00:03.500").to.equal(220);
      expect(param.$valueAtTime(4.000), "00:04.000").to.equal(220);
      expect(param.$valueAtTime(4.500), "00:04.500").to.equal(275);
      expect(param.$valueAtTime(5.000), "00:05.000").to.equal(330);
    });
    it("Cancel", function() {
      param.setValueAtTime(0, 0.000);
      param.linearRampToValueAtTime( 100, 1.000);
      param.linearRampToValueAtTime(1000, 4.000);
      param.cancelScheduledValues(3.000);

      expect(param.$valueAtTime(0.000), "00:00.000").to.equal(0);
      expect(param.$valueAtTime(0.500), "00:00.500").to.equal(50);
      expect(param.$valueAtTime(1.000), "00:01.000").to.equal(100);
      expect(param.$valueAtTime(1.500), "00:01.500").to.equal(100);
      expect(param.$valueAtTime(2.000), "00:02.000").to.equal(100);
      expect(param.$valueAtTime(2.500), "00:02.500").to.equal(100);
      expect(param.$valueAtTime(3.000), "00:02.000").to.equal(100);
      expect(param.$valueAtTime(3.500), "00:02.500").to.equal(100);
      expect(param.$valueAtTime(4.000), "00:02.000").to.equal(100);
      expect(param.$valueAtTime(4.500), "00:02.500").to.equal(100);
      expect(param.$valueAtTime(5.000), "00:02.000").to.equal(100);
    });
  });

});
