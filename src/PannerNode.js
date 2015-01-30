"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
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

PannerNode.prototype.setPosition = function() {
  var inspector = new Inspector(this, "setPosition", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

PannerNode.prototype.setOrientation = function() {
  var inspector = new Inspector(this, "setOrientation", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

PannerNode.prototype.setVelocity = function() {
  var inspector = new Inspector(this, "setVelocity", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = PannerNode;
