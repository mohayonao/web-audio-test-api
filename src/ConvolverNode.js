"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");

/* istanbul ignore else */
if (typeof global.ConvolverNode === "undefined") {
  global.ConvolverNode = function ConvolverNode() {
    throw new TypeError("Illegal constructor: use audioContext.createConvolver()");
  };
  _.inherits(global.ConvolverNode, AudioNode);
}

function ConvolverNode(context) {
  AudioNode.call(this, context, {
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
