"use strict";

describe("ModularRouting", function() {
  var ctx = null;

  beforeEach(function() {
    ctx = new global.AudioContext();
  });

  describe("osc -> gain -> dest", function() {
    it("toJSON", function() {
      var osc = ctx.createOscillator();
      var amp = ctx.createGain();

      osc.connect(amp);
      amp.connect(ctx.destination);

      assert.deepEqual(ctx.toJSON(), {
        "name": "AudioDestinationNode",
        "inputs": [
          {
            "name": "GainNode",
            "gain": {
              "value": 1,
              "inputs": []
            },
            "inputs": [
              {
                "name": "OscillatorNode",
                "type": "sine",
                "frequency": {
                  "value": 440,
                  "inputs": []
                },
                "detune": {
                  "value": 0,
                  "inputs": []
                },
                "inputs": []
              }
            ]
          }
        ]
      });
    });
  });

  describe("osc -> gain(gain<-buSrc) -> dest", function() {
    it("toJSON", function() {
      var osc = ctx.createOscillator();
      var amp = ctx.createGain();
      var bufSrc = ctx.createBufferSource();

      osc.connect(amp);
      bufSrc.connect(amp.gain);
      amp.connect(ctx.destination);

      ctx.$processTo("00:00.100");

      assert.deepEqual(ctx.toJSON(), {
        "name": "AudioDestinationNode",
        "inputs": [
          {
            "name": "GainNode",
            "gain": {
              "value": 1,
              "inputs": [
                {
                  "name": "AudioBufferSourceNode",
                  "buffer": null,
                  "playbackRate": {
                    "value": 1,
                    "inputs": []
                  },
                  "loop": false,
                  "loopStart": 0,
                  "loopEnd": 0,
                  "inputs": []
                }
              ]
            },
            "inputs": [
              {
                "name": "OscillatorNode",
                "type": "sine",
                "frequency": {
                  "value": 440,
                  "inputs": []
                },
                "detune": {
                  "value": 0,
                  "inputs": []
                },
                "inputs": []
              }
            ]
          }
        ]
      });
    });
  });

  describe("osc -> gain -> x -> dest", function() {
    it("toJSON", function() {
      var osc = ctx.createOscillator();
      var amp = ctx.createGain();

      osc.connect(amp);
      amp.connect(ctx.destination);
      amp.disconnect();

      osc.connect(amp);
      amp.connect(ctx.destination);
      amp.disconnect();

      assert.deepEqual(ctx.toJSON(), {
        "name": "AudioDestinationNode",
        "inputs": []
      });
    });
  });

  describe("osc#id -> dest", function() {
    it("toJSON", function() {
      var osc = ctx.createOscillator();

      osc.$id = "id";

      osc.connect(ctx.destination);

      assert.deepEqual(ctx.toJSON(), {
        "name": "AudioDestinationNode",
        "inputs": [
          {
            "name": "OscillatorNode#id",
            "type": "sine",
            "frequency": {
              "value": 440,
              "inputs": []
            },
            "detune": {
              "value": 0,
              "inputs": []
            },
            "inputs": []
          }
        ]
      });
    });
  });

  describe("has circular", function() {
    it("toJSON", function() {
      var osc = ctx.createOscillator();

      osc.connect(osc.frequency);
      osc.connect(ctx.destination);

      assert.deepEqual(ctx.toJSON(), {
        "name": "AudioDestinationNode",
        "inputs": [
          {
            "name": "OscillatorNode",
            "type": "sine",
            "frequency": {
              "value": 440,
              "inputs": [
                "<circular:OscillatorNode>"
              ]
            },
            "detune": {
              "value": 0,
              "inputs": []
            },
            "inputs": []
          }
        ]
      });
    });
  });

});
