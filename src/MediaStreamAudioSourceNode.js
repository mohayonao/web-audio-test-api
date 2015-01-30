"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

/* istanbul ignore else */
if (typeof global.MediaStreamAudioSourceNode === "undefined") {
  global.MediaStreamAudioSourceNode = function MediaStreamAudioSourceNode() {
    throw new TypeError("Illegal constructor: use audioContext.createMediaStreamSource(mediaStream: MediaStream)");
  };
  _.inherits(global.MediaStreamAudioSourceNode, AudioNode);
}

function　MediaStreamAudioSourceNode(context) {
  AudioNode.call(this, context, {
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

module.exports = global.WebAudioTestAPI.MediaStreamAudioSourceNode = MediaStreamAudioSourceNode;
