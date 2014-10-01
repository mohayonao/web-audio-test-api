"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

function DynamicsCompressorNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "DynamicsCompressorNode",
    jsonAttrs: [ "threshold", "knee", "ratio", "reduction", "attack", "release" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });
  _.$read(this, "threshold", new AudioParam(this, "threshold", -24, -100, 0));
  _.$read(this, "knee", new AudioParam(this, "knee", 30, 0, 40));
  _.$read(this, "ratio", new AudioParam(this, "ratio", 12, 1, 20));
  _.$read(this, "reduction", new AudioParam(this, "reduction", 0, -20, 0));
  _.$read(this, "attack", new AudioParam(this, "attack", 0.003, 0, 1.0));
  _.$read(this, "release", new AudioParam(this, "release", 0.250, 0, 1.0));
}
_.inherits(DynamicsCompressorNode, global.DynamicsCompressorNode);

module.exports = DynamicsCompressorNode;
