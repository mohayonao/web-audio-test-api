"use strict";

var _ = require("./utils");
var AudioNode = require("./AudioNode");
var AudioBuffer = require("./AudioBuffer");
var AudioProcessingEvent = require("./AudioProcessingEvent");

function ScriptProcessorNode(context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
  if ([ 256, 512, 1024, 2048, 4096, 8192, 16384 ].indexOf(bufferSize) === -1) {
    throw new TypeError(_.format(
      "#{caption}: invalid bufferSize: #{0}", {
        caption   : "ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)",
        bufferSize: _.toS(bufferSize)
      }
    ));
  }
  _.check("ScriptProcessorNode(bufferSize, numberOfInputChannels, numberOfOutputChannels)", {
    numberOfInputChannels : { type: "number", given: numberOfInputChannels  },
    numberOfOutputChannels: { type: "number", given: numberOfOutputChannels },
  });
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
  _.$type(this, "onaudioprocess", "function", _.NOP);

  this._numSamples = 0;
}
_.inherits(ScriptProcessorNode, global.ScriptProcessorNode);

ScriptProcessorNode.prototype._process = function(currentTime, nextCurrentTime) {
  var numSamples = ((nextCurrentTime - currentTime) / _.CURRENT_TIME_INCR) * _.BUFFER_SIZE;

  this._numSamples -= numSamples;

  if (this._numSamples <= 0) {
    this._numSamples += this.bufferSize;

    var e = new AudioProcessingEvent();

    e.playbackTime = this.context.currentTime;
    e.inputBuffer = new AudioBuffer(this.context, this.numberOfInputChannels, this.bufferSize, this.context.sampleRate);
    e.outputBuffer = new AudioBuffer(this.context, this.numberOfOutputChannels, this.bufferSize, this.context.sampleRate);

    this.onaudioprocess(e);
  }
};

module.exports = ScriptProcessorNode;
