"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

function PannerNode(context) {
  AudioNode.call(this, {
    context: context,
    name: "PannerNode",
    jsonAttrs: [
      "panningModel", "distanceModel", "refDistance", "maxDistance",
      "rolloffFactor", "coneInnerAngle", "coneOuterAngle", "coneOuterGain"
    ],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers"
  });
  _.$enum(this, "panningModel", [ "equalpower", "HRTF" ], "HRTF");
  _.$enum(this, "distanceModel", [ "linear", "inverse", "exponential" ], "inverse");
  _.$type(this, "refDistance", "number", 1);
  _.$type(this, "maxDistance", "number", 10000);
  _.$type(this, "rolloffFactor", "number", 1);
  _.$type(this, "coneInnerAngle", "number", 360);
  _.$type(this, "coneOuterAngle", "number", 360);
  _.$type(this, "coneOuterGain", "number", 0);
}
_.inherits(PannerNode, global.PannerNode);

PannerNode.prototype.setPosition = function(x, y, z) {
  _.check(_.caption(this, "setPosition(x, y, z)"), {
    x: { type: "number", given: x },
    y: { type: "number", given: y },
    z: { type: "number", given: z },
  });
};

PannerNode.prototype.setOrientation = function(x, y, z) {
  _.check(_.caption(this, "setOrientation(x, y, z)"), {
    x: { type: "number", given: x },
    y: { type: "number", given: y },
    z: { type: "number", given: z },
  });
};

PannerNode.prototype.setVelocity = function(x, y, z) {
  _.check(_.caption(this, "setVelocity(x, y, z)"), {
    x: { type: "number", given: x },
    y: { type: "number", given: y },
    z: { type: "number", given: z },
  });
};

module.exports = PannerNode;
