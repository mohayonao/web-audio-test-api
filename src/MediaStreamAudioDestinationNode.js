"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

/* istanbul ignore else */
if (typeof global.MediaStreamAudioDestinationNode === "undefined") {
  global.MediaStreamAudioDestinationNode = function MediaStreamAudioDestinationNode() {
    throw new TypeError("Illegal constructor: use audioContext.createMediaStreamDestination()");
  };
  _.inherits(global.MediaStreamAudioDestinationNode, AudioNode);
}

function MediaStreamAudioDestinationNode(context) {
  AudioNode.call(this, context, {
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
