"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var AudioNode = require("./AudioNode");

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
  _.$enum(this, "fftSize", [ 32, 64, 128, 256, 512, 1024, 2048 ], 2048);
  _.$read(this, "frequencyBinCount", function() { return this.fftSize >> 1; });
  _.$type(this, "minDecibels", "number", -100);
  _.$type(this, "maxDecibels", "number", 30);
  _.$type(this, "smoothingTimeConstant", "number", 0.8);
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
