const testapi = require("./testapi");
const utils = require("./utils");
const AudioNode = require("./AudioNode");
const AudioBuffer = require("./AudioBuffer");
const AudioProcessingEvent = require("./AudioProcessingEvent");

module.exports = class ScriptProcessorNode extends AudioNode {
  static $JSONKeys = [];

  static $new(...args) {
    return utils.auth.request((token) => {
      return new ScriptProcessorNode(token, ...args);
    });
  }

  constructor(token, context, bufferSize = 1024, numberOfInputChannels = 2, numberOfOutputChannels = 2) {
    super(token, {
      name: "ScriptProcessorNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: numberOfInputChannels,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
    this._.bufferSize = bufferSize;
    this._.numberOfInputChannels = numberOfInputChannels;
    this._.numberOfOutputChannels = numberOfOutputChannels;
    this._.numSamples = 0;
  }

  @testapi.props.readonly()
  bufferSize() {
    return this._.bufferSize;
  }

  @testapi.props.on("audioprocess");
  onaudioprocess() {}

  __process(inNumSamples) {
    this._.numSamples -= inNumSamples;

    if (this._.numSamples <= 0) {
      this._.numSamples += this.bufferSize;

      let event = AudioProcessingEvent.$new(this);

      event.playbackTime = this.context.currentTime + this.bufferSize / this.context.sampleRate;
      event.inputBuffer = AudioBuffer.$new(this.context, this._.numberOfInputChannels, this.bufferSize, this.context.sampleRate);
      event.outputBuffer = AudioBuffer.$new(this.context, this._.numberOfOutputChannels, this.bufferSize, this.context.sampleRate);

      this.dispatchEvent(event);
    }
  }
};
