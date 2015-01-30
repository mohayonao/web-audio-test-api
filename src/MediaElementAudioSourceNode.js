"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function MediaElementAudioSourceNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "MediaElementAudioSourceNode",
    jsonAttrs: [],
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(MediaElementAudioSourceNode, global.MediaElementAudioSourceNode);

module.exports = global.WebAudioTestAPI.MediaElementAudioSourceNode = MediaElementAudioSourceNode;
