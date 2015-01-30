"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var ChannelSplitterNodeConstructor = function ChannelSplitterNode() {
  throw new TypeError("Illegal constructor: use audioContext.createChannelSplitter([numberOfOutputs: number])");
};
_.inherits(ChannelSplitterNodeConstructor, AudioNode);

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
_.inherits(ChannelSplitterNode, ChannelSplitterNodeConstructor);

ChannelSplitterNode.exports = ChannelSplitterNodeConstructor;

module.exports = WebAudioTestAPI.ChannelSplitterNode = ChannelSplitterNode;
