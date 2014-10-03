"use strict";

describe("ErrorMessage", function() {
  var ctx = null;
  var osc = null;

  beforeEach(function() {
    ctx = new AudioContext();
    osc = ctx.createOscillator();
  });

  describe("Readonly", function() {
    it("Object#property is readonly", function() {
      expect(function() {
        osc.detune = 0;
      }).to.throw(Error, /^\w+#\w+ is readonly$/);
    });
  });

  describe("Type", function() {
    it("Object#property should be a ..., but got *", function() {
      expect(function() {
        osc.channelCount = true;
      }).to.throw(TypeError, /^\w+#\w+ should be an? \w+, but got [''\w]+$/);
    });
  });

  describe("Enumeration", function() {
    it("Object#property should be any [ ... ], but got *", function() {
      expect(function() {
        osc.type = "INVALID";
      }).to.throw(TypeError, /^\w+#\w+ should be any \[ [\w, ]+ \], but got [''\w]+$/);
    });
  });

  describe("withID", function() {
    it("(Object#id)#property", function() {
      osc.$id = "LFO";
      expect(function() {
        osc.type = "INVALID";
      }).to.throw(TypeError, /^\(\w+#\w+\)#\w+/);
    });
  });

  describe("toS", function() {
    it("string", function() {
      expect(function() {
        osc.type = "str";
      }).to.throw(TypeError, "but got 'str'");
    });
    it("function", function() {
      expect(function() {
        osc.type = it;
      }).to.throw(TypeError, "but got function");
    });
    it("array", function() {
      expect(function() {
        osc.type = [];
      }).to.throw(TypeError, "but got array");
    });
    it("null", function() {
      expect(function() {
        osc.type = null;
      }).to.throw(TypeError, "but got null");
    });
    it("undefined", function() {
      expect(function() {
        osc.type = undefined;
      }).to.throw(TypeError, "but got undefined");
    });
    it("number", function() {
      expect(function() {
        osc.type = 100;
      }).to.throw(TypeError, "but got 100");
    });
    it("boolean", function() {
      expect(function() {
        osc.type = true;
      }).to.throw(TypeError, "but got true");
    });
    it("Float32Array", function() {
      expect(function() {
        osc.type = new Float32Array(2);
      }).to.throw(TypeError, "but got Float32Array");
    });
    it("Date", function() {
      expect(function() {
        osc.type = new Date();
      }).to.throw(TypeError, "but got Date");
    });
    it("Object", function() {
      expect(function() {
        osc.type = { constructor: null };
      }).to.throw(TypeError, "but got Object");
    });
  });

});
