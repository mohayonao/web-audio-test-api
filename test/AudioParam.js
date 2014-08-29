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
      }).to.throw(Error, "AudioParam#setValueAtTime: 'value' should be a number");
    });
    it("throw error", function() {
      expect(function() {
        param.setValueAtTime(0, "INVALID");
      }).to.throw(Error, "AudioParam#setValueAtTime: 'startTime' should be a number");
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
      }).to.throw(Error, "AudioParam#linearRampToValueAtTime: 'value' should be a number");
    });
    it("throw error", function() {
      expect(function() {
        param.linearRampToValueAtTime(0, "INVALID");
      }).to.throw(Error, "AudioParam#linearRampToValueAtTime: 'endTime' should be a number");
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
      }).to.throw(Error, "AudioParam#exponentialRampToValueAtTime: 'value' should be a number");
    });
    it("throw error", function() {
      expect(function() {
        param.exponentialRampToValueAtTime(0, "INVALID");
      }).to.throw(Error, "AudioParam#exponentialRampToValueAtTime: 'endTime' should be a number");
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
      }).to.throw(Error, "AudioParam#setTargetAtTime: 'target' should be a number");
    });
    it("throw error", function() {
      expect(function() {
        param.setTargetAtTime(0, "INVALID", 0);
      }).to.throw(Error, "AudioParam#setTargetAtTime: 'startTime' should be a number");
    });
    it("throw error", function() {
      expect(function() {
        param.setTargetAtTime(0, 0, "INVALID");
      }).to.throw(Error, "AudioParam#setTargetAtTime: 'timeConstant' should be a number");
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
      }).to.throw(Error, "AudioParam#setValueCurveAtTime: 'values' should be a Float32Array");
    });
    it("throw error", function() {
      expect(function() {
        param.setValueCurveAtTime(new Float32Array(32), "INVALID", 0);
      }).to.throw(Error, "AudioParam#setValueCurveAtTime: 'startTime' should be a number");
    });
    it("throw error", function() {
      expect(function() {
        param.setValueCurveAtTime(new Float32Array(32), 0, "INVALID");
      }).to.throw(Error, "AudioParam#setValueCurveAtTime: 'duration' should be a number");
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
      }).to.throw(Error, "AudioParam#cancelScheduledValues: 'startTime' should be a number");
    });
  });

});
