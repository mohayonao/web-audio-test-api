"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioBuffer = require("./AudioBuffer");
var AudioProcessingEvent = require("./AudioProcessingEvent");

function ScriptProcessorNode(context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
  AudioNode.call(this, context, {
    name: "ScriptProcessorNode",
    jsonAttrs: [],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : numberOfInputChannels,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });

  var onaudioprocess = null;

  _.defineAttribute(this, "numberOfInputChannels", "readonly", numberOfInputChannels, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "numberOfOutputChannels", "readonly", numberOfOutputChannels, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "bufferSize", "readonly", bufferSize, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });
  _.defineAttribute(this, "onaudioprocess", "function|null", onaudioprocess, function(msg) {
    throw new TypeError(_.formatter.concat(this, msg));
  });

  this._numSamples = 0;
}
_.inherits(ScriptProcessorNode, global.ScriptProcessorNode);

ScriptProcessorNode.prototype._process = function(currentTime, nextCurrentTime) {
  var numSamples = ((nextCurrentTime - currentTime) / global.WebAudioTestAPI.currentTimeIncr) * global.WebAudioTestAPI.bufferSize;

  this._numSamples -= numSamples;

  if (this._numSamples <= 0 && this.onaudioprocess) {
    this._numSamples += this.bufferSize;

    var e = new AudioProcessingEvent(this);

    e.playbackTime = this.context.currentTime;
    e.inputBuffer = new AudioBuffer(this.context, this.numberOfInputChannels, this.bufferSize, this.context.sampleRate);
    e.outputBuffer = new AudioBuffer(this.context, this.numberOfOutputChannels, this.bufferSize, this.context.sampleRate);

    this.onaudioprocess(e);
  }
};

module.exports = global.WebAudioTestAPI.ScriptProcessorNode = ScriptProcessorNode;
