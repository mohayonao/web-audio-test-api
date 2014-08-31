/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("AudioParam", function() {
  var ctx = null;
  var param = null;

  beforeEach(function() {
    var osc;
    ctx = new AudioContext();
    osc = ctx.createOscillator();
    param = osc.frequency;
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

});
