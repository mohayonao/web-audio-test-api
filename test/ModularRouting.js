/* global describe, it, expect, beforeEach */
"use strict";

require("../web-audio-mock");

describe("ModularRouting", function() {
  var ctx = null;

  beforeEach(function() {
    ctx = new AudioContext();
  });

  describe("osc -> gain -> dest", function() {
    it("toJSON", function() {
      var osc = ctx.createOscillator();
      var amp = ctx.createGain();

      osc.connect(amp);
      amp.connect(ctx.destination);

      expect(ctx.toJSON()).to.eql({
        "name": "AudioDestinationNode",
        "inputs": [
          {
            "name": "GainNode",
            "gain": {
              "name": "gain",
              "value": 1,
              "inputs": []
            },
            "inputs": [
              {
                "name": "OscillatorNode",
                "type": "sine",
                "frequency": {
                  "name": "frequency",
                  "value": 440,
                  "inputs": []
                },
                "detune": {
                  "name": "detune",
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

      ctx.process(5);

      expect(ctx.toJSON()).to.eql({
        "name": "AudioDestinationNode",
        "inputs": [
          {
            "name": "GainNode",
            "gain": {
              "name": "gain",
              "value": 1,
              "inputs": [
                {
                  "name": "AudioBufferSourceNode",
                  "playbackRate": {
                    "name": "playbackRate",
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
                  "name": "frequency",
                  "value": 440,
                  "inputs": []
                },
                "detune": {
                  "name": "detune",
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

      expect(ctx.toJSON()).to.eql({
        "name": "AudioDestinationNode",
        "inputs": []
      });
    });
  });

  describe("has circular", function() {
    it("toJSON", function() {
      var osc = ctx.createOscillator();

      osc.connect(osc.frequency);
      osc.connect(ctx.destination);

      expect(ctx.toJSON()).to.eql({
        "name": "AudioDestinationNode",
        "inputs": [
          {
            "name": "OscillatorNode",
            "type": "sine",
            "frequency": {
              "name": "frequency",
              "value": 440,
              "inputs": [
                "<circular>"
              ]
            },
            "detune": {
              "name": "detune",
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
