"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

var OverSampleType = "enum { none, 2x, 4x }";

function WaveShaperNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "WaveShaperNode",
    jsonAttrs: [ "oversample" ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var curve = null;
  var oversample = "none";

  _.defineAttribute(this, "curve", "Float32Array|null", curve, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "oversample", OverSampleType, oversample, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(WaveShaperNode, global.WaveShaperNode);

module.exports = WaveShaperNode;
