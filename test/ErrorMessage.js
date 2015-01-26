"use strict";

describe("ErrorMessage", function() {
  var ctx = null;
  var osc = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
    osc = ctx.createOscillator();
  });

  describe("Readonly", function() {
    it("Object#property is readonly", function() {
      assert.throws(function() {
        osc.detune = 0;
      }, Error, /^\w+#\w+ is readonly$/);
    });
  });

  describe("Type", function() {
    it("Object#property should be a ..., but got *", function() {
      assert.throws(function() {
        osc.channelCount = true;
      }, TypeError, /^\w+#\w+ should be an? \w+, but got [''\w]+$/);
    });
  });

  describe("Enumeration", function() {
    it("Object#property should be any [ ... ], but got *", function() {
      assert.throws(function() {
        osc.type = "INVALID";
      }, TypeError, /^\w+#\w+ should be any \[ [\w, ]+ \], but got [''\w]+$/);
    });
  });

  describe("withID", function() {
    it("(Object#id)#property", function() {
      osc.$id = "LFO";
      assert.throws(function() {
        osc.type = "INVALID";
      }, TypeError, /^\(\w+#\w+\)#\w+/);
    });
  });

  describe("toS", function() {
    it("string", function() {
      assert.throws(function() {
        osc.type = "str";
      }, TypeError, "but got 'str'");
    });
    it("function", function() {
      assert.throws(function() {
        osc.type = it;
      }, TypeError, "but got function");
    });
    it("array", function() {
      assert.throws(function() {
        osc.type = [];
      }, TypeError, "but got array");
    });
    it("null", function() {
      assert.throws(function() {
        osc.type = null;
      }, TypeError, "but got null");
    });
    it("undefined", function() {
      assert.throws(function() {
        osc.type = undefined;
      }, TypeError, "but got undefined");
    });
    it("number", function() {
      assert.throws(function() {
        osc.type = 100;
      }, TypeError, "but got 100");
    });
    it("boolean", function() {
      assert.throws(function() {
        osc.type = true;
      }, TypeError, "but got true");
    });
    it("Float32Array", function() {
      assert.throws(function() {
        osc.type = new Float32Array(2);
      }, TypeError, "but got Float32Array");
    });
    it("Date", function() {
      assert.throws(function() {
        osc.type = new Date();
      }, TypeError, "but got Date");
    });
    it("Object", function() {
      assert.throws(function() {
        osc.type = { constructor: null };
      }, TypeError, "but got Object");
    });
  });

});
