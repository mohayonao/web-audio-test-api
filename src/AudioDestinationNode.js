"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function AudioDestinationNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "AudioDestinationNode",
    jsonAttrs: [],
    numberOfInputs  : 1,
    numberOfOutputs : 0,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });
  _.$read(this, "maxChannelCount", 2);
}
_.inherits(AudioDestinationNode, global.AudioDestinationNode);

module.exports = AudioDestinationNode;
