"use strict";

var _ = require("./utils");
var Inspector = require("./utils/Inspector");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");

var PanningModelType = "enum { equalpower, HRTF }";
var DistanceModelType = "enum { linear, inverse, exponential }";

var PannerNodeConstructor = function PannerNode() {
  throw new TypeError("Illegal constructor: use audioContext.createPanner()");
};
_.inherits(PannerNodeConstructor, AudioNode);

function PannerNode(context) {
  AudioNode.call(this, context, {
    name: "PannerNode",
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : 2,
    channelCountMode: "clamped-max",
    channelInterpretation: "speakers"
  });

  var panningModel = "HRTF";
  var distanceModel = "inverse";
  var refDistance = 1;
  var maxDistance = 10000;
  var rolloffFactor = 1;
  var coneInnerAngle = 360;
  var coneOuterAngle = 360;
  var coneOuterGain = 0;

  _.defineAttribute(this, "panningModel", PanningModelType, panningModel, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "distanceModel", DistanceModelType, distanceModel, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "refDistance", "number", refDistance, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "maxDistance", "number", maxDistance, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "rolloffFactor", "number", rolloffFactor, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "coneInnerAngle", "number", coneInnerAngle, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "coneOuterAngle", "number", coneOuterAngle, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "coneOuterGain", "number", coneOuterGain, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
}
_.inherits(PannerNode, PannerNodeConstructor);

PannerNode.exports = PannerNodeConstructor;
PannerNode.jsonAttrs = [
  "panningModel", "distanceModel", "refDistance", "maxDistance",
  "rolloffFactor", "coneInnerAngle", "coneOuterAngle", "coneOuterGain"
];

PannerNodeConstructor.prototype.setPosition = function() {
  var inspector = new Inspector(this, "setPosition", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

PannerNodeConstructor.prototype.setOrientation = function() {
  var inspector = new Inspector(this, "setOrientation", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

PannerNodeConstructor.prototype.setVelocity = function() {
  var inspector = new Inspector(this, "setVelocity", [
    { name: "x", type: "number" },
    { name: "y", type: "number" },
    { name: "z", type: "number" },
  ]);

  inspector.validateArguments(arguments, function(msg) {
    throw new TypeError(inspector.form + "; " + msg);
  });
};

module.exports = WebAudioTestAPI.PannerNode = PannerNode;
