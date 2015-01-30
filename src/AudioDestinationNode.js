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

  var maxChannelCount = 2;

  _.defineAttribute(this, "maxChannelCount", "readonly", maxChannelCount, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(AudioDestinationNode, global.AudioDestinationNode);

module.exports = AudioDestinationNode;
