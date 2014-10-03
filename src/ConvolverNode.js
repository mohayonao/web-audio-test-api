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
  _.$type(this, "buffer", AudioBuffer, null);
  _.$type(this, "normalize", "boolean", true);
}
_.inherits(ConvolverNode, global.ConvolverNode);

module.exports = ConvolverNode;
