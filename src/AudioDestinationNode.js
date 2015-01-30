"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

/* istanbul ignore else */
if (typeof global.AudioDestinationNode === "undefined") {
  global.AudioDestinationNode = function AudioDestinationNode() {
    throw new TypeError("Illegal constructor");
  };
  _.inherits(global.AudioDestinationNode, AudioNode);
}

function AudioDestinationNode(context) {
  AudioNode.call(this, context, {
    name: "AudioDestinationNode",
    jsonAttrs: [],
    numberOfInputs  : 1,
    numberOfOutputs : 0,
    channelCount    : 2,
    channelCountMode: "explicit",
    channelInterpretation: "speakers"
  });

  var maxChannelCount = 2;

  _.defineAttribute(this, "maxChannelCount", "readonly", maxChannelCount, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(AudioDestinationNode, global.AudioDestinationNode);

module.exports = global.WebAudioTestAPI.AudioDestinationNode = AudioDestinationNode;
