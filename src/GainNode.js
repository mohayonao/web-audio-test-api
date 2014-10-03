"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

function GainNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "GainNode",
    jsonAttrs: [ "gain"　],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
  _.$read(this, "gain", new AudioParam(this, "gain", 1.0, 0.0, 1.0));
}
_.inherits(GainNode, global.GainNode);

module.exports = GainNode;
