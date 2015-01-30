"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

/* istanbul ignore else */
if (typeof global.ChannelSplitterNode === "undefined") {
  global.ChannelSplitterNode = function ChannelSplitterNode() {
    throw new TypeError("Illegal constructor: use audioContext.createChannelSplitter([numberOfOutputs: number])");
  };
  _.inherits(global.ChannelSplitterNode, AudioNode);
}

function ChannelSplitterNode(context, numberOfOutputs) {
  AudioNode.call(this, context, {
    name: "ChannelSplitterNode",
    jsonAttrs: [],
    numberOfInputs  : 1,
    numberOfOutputs : numberOfOutputs,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(ChannelSplitterNode, global.ChannelSplitterNode);

module.exports = global.WebAudioTestAPI.ChannelSplitterNode = ChannelSplitterNode;
