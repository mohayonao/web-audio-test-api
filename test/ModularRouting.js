"use strict";

describe("ModularRouting", function() {
  var audioContext = null;

  beforeEach(function() {
    audioContext = new global.AudioContext();
  });

  describe("osc -> gain -> dest", function() {
    it("toJSON", function() {
      var osc = audioContext.createOscillator();
      var amp = audioContext.createGain();

      osc.connect(amp);
      amp.connect(audioContext.destination);

      assert.deepEqual(audioContext.toJSON(), {
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
      var osc = audioContext.createOscillator();
      var amp = audioContext.createGain();
      var bufSrc = audioContext.createBufferSource();

      osc.connect(amp);
      bufSrc.connect(amp.gain);
      amp.connect(audioContext.destination);

      audioContext.$processTo("00:00.100");

      assert.deepEqual(audioContext.toJSON(), {
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
      var osc = audioContext.createOscillator();
      var amp = audioContext.createGain();

      osc.connect(amp);
      amp.connect(audioContext.destination);
      amp.disconnect();

      osc.connect(amp);
      amp.connect(audioContext.destination);
      amp.disconnect();

      assert.deepEqual(audioContext.toJSON(), {
        "name": "AudioDestinationNode",
        "inputs": []
      });
    });
  });

  describe("osc#id -> dest", function() {
    it("toJSON", function() {
      var osc = audioContext.createOscillator();

      osc.$id = "id";

      osc.connect(audioContext.destination);

      assert.deepEqual(audioContext.toJSON(), {
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

  describe("circular", function() {
    it("toJSON", function() {
      var osc = audioContext.createOscillator();

      osc.connect(osc.frequency);
      osc.connect(audioContext.destination);

      assert.deepEqual(audioContext.toJSON(), {
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
