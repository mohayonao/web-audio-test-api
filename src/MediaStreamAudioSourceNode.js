"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var MediaStreamAudioSourceNodeConstructor = function MediaStreamAudioSourceNode() {
  throw new TypeError("Illegal constructor: use audioContext.createMediaStreamSource(mediaStream: MediaStream)");
};
_.inherits(MediaStreamAudioSourceNodeConstructor, AudioNode);

function　MediaStreamAudioSourceNode(context) {
  AudioNode.call(this, context, {
    name: "MediaStreamAudioSourceNode",
    numberOfInputs  : 0,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
}
_.inherits(MediaStreamAudioSourceNode, MediaStreamAudioSourceNodeConstructor);

MediaStreamAudioSourceNode.exports = MediaStreamAudioSourceNodeConstructor;

module.exports = WebAudioTestAPI.MediaStreamAudioSourceNode = MediaStreamAudioSourceNode;
