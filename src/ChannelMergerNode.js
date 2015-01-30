"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function ChannelMergerNode(context, numberOfInputs) {
  AudioNode.call(this, context, {
    name: "ChannelMergerNode",
    jsonAttrs: [],
    numberOfInputs  : numberOfInputs,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(ChannelMergerNode, global.ChannelMergerNode);

module.exports = global.WebAudioTestAPI.ChannelMergerNode = ChannelMergerNode;
