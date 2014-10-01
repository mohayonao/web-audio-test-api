"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function　MediaStreamAudioSourceNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "MediaStreamAudioSourceNode",
    jsonAttrs:  [],
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(MediaStreamAudioSourceNode, global.MediaStreamAudioSourceNode);

module.exports = MediaStreamAudioSourceNode;
