"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

function DelayNode(context, maxDelayTime) {
  AudioNode.call(this, {
    context: context,
    name: "DelayNode",
    jsonAttrs: [ "delayTime"　],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
  _.$read(this, "delayTime", new AudioParam(this, "delayTime", 0, 0, maxDelayTime));

  Object.defineProperties(this, {
    $maxDelayTime: { value: maxDelayTime }
  });
}
_.inherits(DelayNode, global.DelayNode);

module.exports = DelayNode;
