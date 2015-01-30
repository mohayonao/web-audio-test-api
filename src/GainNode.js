"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioParam = require("./AudioParam");

/* istanbul ignore else */
if (typeof global.GainNode === "undefined") {
  global.GainNode = function GainNode() {
    throw new TypeError("Illegal constructor: use audioContext.createGain()");
  };
  _.inherits(global.GainNode, AudioNode);
}

function GainNode(context) {
  AudioNode.call(this, context, {
    name: "GainNode",
    jsonAttrs: [ "gain"　],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var gain = new AudioParam(this, "gain", 1.0, 0.0, 1.0);

  _.defineAttribute(this, "gain", "readonly", gain, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(GainNode, global.GainNode);

module.exports = global.WebAudioTestAPI.GainNode = GainNode;
