"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

/* istanbul ignore else */
if (typeof global.MediaElementAudioSourceNode === "undefined") {
  global.MediaElementAudioSourceNode = function MediaElementAudioSourceNode() {
    throw new TypeError("Illegal constructor: use audioContext.createMediaElementSource(mediaElement: HTMLMediaElement)");
  };
  _.inherits(global.MediaElementAudioSourceNode, AudioNode);
}

function MediaElementAudioSourceNode(context) {
  AudioNode.call(this, context, {
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
