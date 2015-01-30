"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function ConvolverNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "ConvolverNode",
    jsonAttrs: [ "normalize" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers"
  });

  var buffer = null;
  var normalize = true;

  _.defineAttribute(this, "buffer", "AudioBuffer|null", buffer, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "normalize", "boolean", normalize, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(ConvolverNode, global.ConvolverNode);

module.exports = global.WebAudioTestAPI.ConvolverNode = ConvolverNode;
