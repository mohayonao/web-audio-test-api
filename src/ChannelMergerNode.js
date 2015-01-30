"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var ChannelMergerNodeConstructor = function ChannelMergerNode() {
  throw new TypeError("Illegal constructor: use audioContext.createChannelMerger([numberOfInputs: number])");
};
_.inherits(ChannelMergerNodeConstructor, AudioNode);

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
_.inherits(ChannelMergerNode, ChannelMergerNodeConstructor);

ChannelMergerNode.exports = ChannelMergerNodeConstructor;

module.exports = WebAudioTestAPI.ChannelMergerNode = ChannelMergerNode;
