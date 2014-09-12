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

  describe("#$process()", function() {
    it("SetValue", function() {
      param.setValueAtTime(220, ctx.currentTime);
      param.setValueAtTime(660, ctx.currentTime + 1.5);
      param.setValueAtTime(440, ctx.currentTime + 1.0);
      param.setValueAtTime(880, ctx.currentTime + 1.0);
      param.setValueAtTime(660, ctx.currentTime + 0.5);

      expect(param.value, "00:00.000").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.250").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.500").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:00.750").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:01.000").to.equal(880);

      ctx.$process(0.25);
      expect(param.value, "00:01.250").to.equal(880);

      ctx.$process(0.25);
      expect(param.value, "00:01.500").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:01.750").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:02.000").to.equal(660);
    });
    it("LinearRampToValue", function() {
      param.setValueAtTime(220, ctx.currentTime);
      param.setValueAtTime(660, ctx.currentTime + 0.5);
      param.linearRampToValueAtTime(880, ctx.currentTime + 1.0);
      param.linearRampToValueAtTime(660, ctx.currentTime + 1.5);

      expect(param.value, "00:00.000").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.250").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.500").to.be.closeTo(660, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:00.750").to.be.closeTo(770, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:01.000").to.be.closeTo(880, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:01.250").to.be.closeTo(770, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:01.500").to.be.closeTo(660, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:01.750").to.be.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:02.000").to.be.equal(660);
    });
    it("ExponentialRampToValue", function() {
      param.setValueAtTime(220, ctx.currentTime);
      param.setValueAtTime(660, ctx.currentTime + 0.5);
      param.exponentialRampToValueAtTime(880, ctx.currentTime + 1.0);
      param.exponentialRampToValueAtTime(660, ctx.currentTime + 1.5);

      expect(param.value, "00:00.000").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.250").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.500").to.be.closeTo(660, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:00.750").to.be.closeTo(762.102355330306, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:01.000").to.be.closeTo(880, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:01.250").to.be.closeTo(762.102355330306, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:01.500").to.be.closeTo(660, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:01.750").to.be.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:02.000").to.be.equal(660);
    });
    it("SetTarget", function() {
      param.setValueAtTime(220, ctx.currentTime);
      param.setValueAtTime(660, ctx.currentTime + 0.5);
      param.setTargetAtTime(880, ctx.currentTime + 1.0, 2);
      param.setTargetAtTime(660, ctx.currentTime + 1.5, 2);

      expect(param.value, "00:00.000").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.250").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.500").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:00.750").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:01.000").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:01.250").to.be.closeTo(685.850681431389, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:01.500").to.be.closeTo(708.663827724291, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:01.750").to.be.closeTo(702.9456772345972, 1e-6);

      ctx.$process(0.25);
      expect(param.value, "00:02.000").to.be.closeTo(697.8994271389297, 1e-6);
    });
    it("SetCurve", function() {
      var curve = new Float32Array([ 220, 330, 440, 330 ]);

      param.setValueAtTime(220, ctx.currentTime);
      param.setValueAtTime(660, ctx.currentTime + 0.5);
      param.setValueCurveAtTime(curve, ctx.currentTime + 1.0, 0.5);
      param.setValueCurveAtTime(curve, ctx.currentTime + 1.5, 1.0);

      expect(param.value, "00:00.000").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.250").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.500").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:00.750").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:01.000").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:01.250").to.equal(385);

      ctx.$process(0.25);
      expect(param.value, "00:01.500").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:01.750").to.equal(302.5);

      ctx.$process(0.25);
      expect(param.value, "00:02.000").to.equal(385);
    });
    it("cancel", function() {
      param.setValueAtTime(220, ctx.currentTime);
      param.setValueAtTime(660, ctx.currentTime + 0.5);
      param.setValueAtTime(880, ctx.currentTime + 1.0);
      param.setValueAtTime(440, ctx.currentTime + 1.5);
      param.cancelScheduledValues(ctx.currentTime + 1.0);

      expect(param.value, "00:00.000").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.250").to.equal(220);

      ctx.$process(0.25);
      expect(param.value, "00:00.500").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:00.750").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:01.000").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:01.250").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:01.500").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:01.750").to.equal(660);

      ctx.$process(0.25);
      expect(param.value, "00:02.000").to.equal(660);
    });
  });

});
