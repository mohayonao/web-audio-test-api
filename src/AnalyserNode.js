"use strict";

var _ = require("./utils");
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

AnalyserNode.prototype.getFloatFrequencyData = function(array) {
  _.check(_.caption(this, "getFloatFrequencyData(array)"), {
    array: { type: "Float32Array", given: array }
  });
};

AnalyserNode.prototype.getByteFrequencyData = function(array) {
  _.check(_.caption(this, "getByteFrequencyData(array)"), {
    array: { type: "Uint8Array", given: array }
  });
};

AnalyserNode.prototype.getByteTimeDomainData = function(array) {
  _.check(_.caption(this, "getByteTimeDomainData(array)"), {
    array: { type: "Uint8Array", given: array }
  });
};

module.exports = AnalyserNode;
