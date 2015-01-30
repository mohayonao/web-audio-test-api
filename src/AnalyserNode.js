"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var AudioNode = require("./AudioNode");

var FFTSize = "enum { 32, 64, 128, 256, 512, 1024, 2048 }";

function AnalyserNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "AnalyserNode",
    jsonAttrs: [ "fftSize", "minDecibels", "maxDecibels", "smoothingTimeConstant" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 1,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });

  var fftSize = 2048;
  var frequencyBinCount = function() { return this.fftSize >> 1; };
  var minDecibels = -100;
  var maxDecibels = 30;
  var smoothingTimeConstant = 0.8;

  _.defineAttribute(this, "fftSize", FFTSize, fftSize, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "frequencyBinCount", "readonly", frequencyBinCount, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "minDecibels", "number", minDecibels, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "maxDecibels", "number", maxDecibels, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "smoothingTimeConstant", "number", smoothingTimeConstant, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(AnalyserNode, global.AnalyserNode);

AnalyserNode.prototype.getFloatFrequencyData = function() {
  var inspector = new Inspector(this, "getFloatFrequencyData", [
    { name: "array", type: "Float32Array" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AnalyserNode.prototype.getByteFrequencyData = function() {
  var inspector = new Inspector(this, "getByteFrequencyData", [
    { name: "array", type: "Uint8Array" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

AnalyserNode.prototype.getByteTimeDomainData = function() {
  var inspector = new Inspector(this, "getByteTimeDomainData", [
    { name: "array", type: "Uint8Array" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = AnalyserNode;
