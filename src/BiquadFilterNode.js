"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

var BiquadFilterType = "enum { lowpass, highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass }";

var BiquadFilterNodeConstructor = function BiquadFilterNode() {
  throw new TypeError("Illegal constructor: use audioContext.createBiquadFilter()");
};
_.inherits(BiquadFilterNodeConstructor, AudioNode);

function BiquadFilterNode(context) {
  AudioNode.call(this, context, {
    name: "BiquadFilterNode",
    jsonAttrs: [ "type", "frequency", "detune", "Q", "gain" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var type = "lowpass";
  var frequency = new AudioParam(this, "frequency", 350, 10, context.sampleRate / 2);
  var detune = new AudioParam(this, "detune", 0, -4800, 4800);
  var Q = new AudioParam(this, "Q", 1, 0.0001, 1000);
  var gain = new AudioParam(this, "gain", 0, -40, 40);

  _.defineAttribute(this, "type", BiquadFilterType, type, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "frequency", "readonly", frequency, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "detune", "readonly", detune, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "Q", "readonly", Q, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "gain", "readonly", gain, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(BiquadFilterNode, BiquadFilterNodeConstructor);

BiquadFilterNode.exports = BiquadFilterNodeConstructor;

BiquadFilterNode.prototype.getFrequencyResponse = function() {
  var inspector = new Inspector(this, "getFrequencyResponse", [
    { name: "frequencyHz"  , type: "Float32Array" },
    { name: "magResponse"  , type: "Float32Array" },
    { name: "phaseResponse", type: "Float32Array" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = WebAudioTestAPI.BiquadFilterNode = BiquadFilterNode;
