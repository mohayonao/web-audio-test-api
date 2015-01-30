"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function MediaStreamAudioDestinationNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "MediaStreamAudioDestinationNode",
    jsonAttrs:  [],
    numberOfInputs  : 1,
    numberOfOutputs : 0,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });
}
_.inherits(MediaStreamAudioDestinationNode, global.MediaStreamAudioDestinationNode);

module.exports = global.WebAudioTestAPI.MediaStreamAudioDestinationNode = MediaStreamAudioDestinationNode;
