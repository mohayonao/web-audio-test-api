"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioBuffer = require("./AudioBuffer");
var AudioProcessingEvent = require("./AudioProcessingEvent");

function ScriptProcessorNode(context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
  AudioNode.call(this, {
    context: context,
    name: "ScriptProcessorNode",
    jsonAttrs: [],
    numberOfInputs  : 1,
    numberOfOutputs : 1,
    channelCount    : numberOfInputChannels,
    channelCountMode: "max",
    channelInterpretation: "speakers"
  });
  _.$read(this, "numberOfInputChannels", numberOfInputChannels);
  _.$read(this, "numberOfOutputChannels", numberOfOutputChannels);
  _.$read(this, "bufferSize", bufferSize);
  _.$type(this, "onaudioprocess", "function", null);

  this._numSamples = 0;
}
_.inherits(ScriptProcessorNode, global.ScriptProcessorNode);

ScriptProcessorNode.prototype._process = function(currentTime, nextCurrentTime) {
  var numSamples = ((nextCurrentTime - currentTime) / _.CURRENT_TIME_INCR) * _.BUFFER_SIZE;

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

module.exports = ScriptProcessorNode;
