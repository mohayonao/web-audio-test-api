"use strict";

var _ = require("./utils");
var WebAudioTestAPI = require("./WebAudioTestAPI");
var AudioNode = require("./AudioNode");
var AudioBuffer = require("./AudioBuffer");
var AudioProcessingEvent = require("./AudioProcessingEvent");

var ScriptProcessorNodeConstructor = function ScriptProcessorNode() {
  throw new TypeError("Illegal constructor: use audioContext.createScriptProcessor(bufferSize: number, [numberOfInputChannels: number], [numberOfOutputChannels: number])");
};
_.inherits(ScriptProcessorNodeConstructor, AudioNode);

function ScriptProcessorNode(context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
  AudioNode.call(this, context, {
    name: "ScriptProcessorNode",
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
_.inherits(ScriptProcessorNode, ScriptProcessorNodeConstructor);

ScriptProcessorNode.exports = ScriptProcessorNodeConstructor;

ScriptProcessorNode.prototype._process = function(inNumSamples) {
  this._numSamples -= inNumSamples;

  if (this._numSamples <= 0) {
    this._numSamples += this.bufferSize;

    var event = new AudioProcessingEvent(this);

    event.playbackTime = this.context.currentTime + this.bufferSize / this.context.sampleRate;
    event.inputBuffer = new AudioBuffer(this.context, this.numberOfInputChannels, this.bufferSize, this.context.sampleRate);
    event.outputBuffer = new AudioBuffer(this.context, this.numberOfOutputChannels, this.bufferSize, this.context.sampleRate);

    this.dispatchEvent(event);
  }
};

module.exports = WebAudioTestAPI.ScriptProcessorNode = ScriptProcessorNode;
