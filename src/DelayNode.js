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

  var delayTime = new AudioParam(this, "delayTime", 0, 0, maxDelayTime);

  _.defineAttribute(this, "delayTime", "readonly", delayTime, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  Object.defineProperties(this, {
    $maxDelayTime: { value: maxDelayTime }
  });
}
_.inherits(DelayNode, global.DelayNode);

module.exports = global.WebAudioTestAPI.DelayNode = DelayNode;
