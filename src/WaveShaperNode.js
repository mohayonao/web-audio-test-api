"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function WaveShaperNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "WaveShaperNode",
    jsonAttrs: [ "oversample" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
  _.$type(this, "curve", Float32Array, null);
  _.$enum(this, "oversample", [ "none", "2x", "4x" ], "none");
}
_.inherits(WaveShaperNode, global.WaveShaperNode);

module.exports = WaveShaperNode;
