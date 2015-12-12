describe("PannerNode", function() {
  var WebAudioTestAPI = global.WebAudioTestAPI;
  var audioContext;

  beforeEach(function() {
    audioContext = new WebAudioTestAPI.AudioContext();
  });

  describe("constructor()", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(node instanceof global.PannerNode);
      assert(node instanceof global.AudioNode);

      assert.throws(function() {
        return new global.PannerNode();
      }, TypeError);
    });
  });

  describe("#panningModel: string", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(typeof node.panningModel === "string");

      node.panningModel = "equalpower";
      assert(node.panningModel === "equalpower");

      node.panningModel = "HRTF";
      assert(node.panningModel === "HRTF");

      assert.throws(function() {
        node.panningModel = "custom";
      }, TypeError);
    });
  });

  describe("#distanceModel: string", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(typeof node.distanceModel === "string");

      node.distanceModel = "linear";
      assert(node.distanceModel === "linear");

      node.distanceModel = "inverse";
      assert(node.distanceModel === "inverse");

      node.distanceModel = "exponential";
      assert(node.distanceModel === "exponential");

      assert.throws(function() {
        node.distanceModel = "custom";
      }, TypeError);
    });
  });

  describe("#refDistance: number", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(typeof node.refDistance === "number");

      node.refDistance = 0.5;
      assert(node.refDistance === 0.5);

      node.refDistance = 0.25;
      assert(node.refDistance === 0.25);

      assert.throws(function() {
        node.refDistance = "INVALID";
      }, TypeError);
    });
  });

  describe("#maxDistance: number", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(typeof node.maxDistance === "number");

      node.maxDistance = 5000;
      assert(node.maxDistance === 5000);

      node.maxDistance = 2500;
      assert(node.maxDistance === 2500);

      assert.throws(function() {
        node.maxDistance = "INVALID";
      }, TypeError);
    });
  });

  describe("#rolloffFactor: number", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(typeof node.rolloffFactor === "number");

      node.rolloffFactor = 0.5;
      assert(node.rolloffFactor === 0.5);

      node.rolloffFactor = 0.25;
      assert(node.rolloffFactor === 0.25);

      assert.throws(function() {
        node.rolloffFactor = "INVALID";
      }, TypeError);
    });
  });

  describe("#coneInnerAngle: number", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(typeof node.coneInnerAngle === "number");

      node.coneInnerAngle = 180;
      assert(node.coneInnerAngle === 180);

      node.coneInnerAngle = 90;
      assert(node.coneInnerAngle === 90);

      assert.throws(function() {
        node.coneInnerAngle = "INVALID";
      }, TypeError);
    });
  });

  describe("#coneOuterAngle: number", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(typeof node.coneOuterAngle === "number");

      node.coneOuterAngle = 180;
      assert(node.coneOuterAngle === 180);

      node.coneOuterAngle = 90;
      assert(node.coneOuterAngle === 90);

      assert.throws(function() {
        node.coneOuterAngle = "INVALID";
      }, TypeError);
    });
  });

  describe("#coneOuterGain: number", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(typeof node.coneOuterGain === "number");

      node.coneOuterGain = 1;
      assert(node.coneOuterGain === 1);

      node.coneOuterGain = 2;
      assert(node.coneOuterGain === 2);

      assert.throws(function() {
        node.coneOuterGain = "INVALID";
      }, TypeError);
    });
  });

  describe("#setPosition(x: number, y: number, z: number): void", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      node.setPosition(0, 0, 0);

      assert.throws(function() {
        node.setPosition("INVALID", 0, 0);
      }, TypeError);

      assert.throws(function() {
        node.setPosition(0, "INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        node.setPosition(0, 0, "INVALID");
      }, TypeError);
    });
  });

  describe("#setOrientation(x: number, y: number, z: number): void", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      node.setOrientation(0, 0, 0);

      assert.throws(function() {
        node.setOrientation("INVALID", 0, 0);
      }, TypeError);

      assert.throws(function() {
        node.setOrientation(0, "INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        node.setOrientation(0, 0, "INVALID");
      }, TypeError);
    });
  });

  describe("#setVelocity(x: number, y: number, z: number): void", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      node.setVelocity(0, 0, 0);

      assert.throws(function() {
        node.setVelocity("INVALID", 0, 0);
      }, TypeError);

      assert.throws(function() {
        node.setVelocity(0, "INVALID", 0);
      }, TypeError);

      assert.throws(function() {
        node.setVelocity(0, 0, "INVALID");
      }, TypeError);
    });
  });

  describe("#toJSON(): object", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert.deepEqual(node.toJSON(), {
        name: "PannerNode",
        panningModel: "HRTF",
        distanceModel: "inverse",
        refDistance: 1,
        maxDistance: 10000,
        rolloffFactor: 1,
        coneInnerAngle: 360,
        coneOuterAngle: 360,
        coneOuterGain: 0,
        inputs: []
      });
    });
  });

  describe("$name: string", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(node.$name === "PannerNode");
    });
  });

  describe("$context: AudioContext", function() {
    it("works", function() {
      var node = audioContext.createPanner();

      assert(node.$context === audioContext);
    });
  });
});
