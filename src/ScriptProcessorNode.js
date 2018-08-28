import Immigration from "./utils/Immigration";
import AudioNode from "./AudioNode";
import AudioBuffer from "./AudioBuffer";
import AudioProcessingEvent from "./AudioProcessingEvent";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

let immigration = Immigration.getInstance();

export default class ScriptProcessorNode extends AudioNode {
  static $JSONKeys = [];

  constructor(admission, context, bufferSize, numberOfInputChannels, numberOfOutputChannels) {
    super(admission, {
      name: "ScriptProcessorNode",
      context: context,
      numberOfInputs: 1,
      numberOfOutputs: 1,
      channelCount: numberOfInputChannels,
      channelCountMode: "max",
      channelInterpretation: "speakers"
    });
    this.__createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels);
  }

  @methods.param("bufferSize", validators.isPositiveInteger)
  @methods.param("numberOfInputChannels", validators.isPositiveInteger)
  @methods.param("numberOfOutputChannels", validators.isPositiveInteger)
  @methods.contract({
    precondition(bufferSize) {
      if ([ 256, 512, 1024, 2048, 4096, 8192, 16384 ].indexOf(bufferSize) === -1) {
        throw new TypeError(`The {{bufferSize}} should be one of [ 256, 512, 1024, 2048, 4096, 8192, 16384 ], but got ${bufferSize}.`);
      }
    }
  })
  __createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
    this._.bufferSize = bufferSize;
    this._.numberOfInputChannels = numberOfInputChannels;
    this._.numberOfOutputChannels = numberOfOutputChannels;
    this._.numSamples = 0;
  }

  @props.readonly()
  bufferSize() {
    return this._.bufferSize;
  }

  @props.on("audioprocess")
  onaudioprocess() {}

  __process(inNumSamples) {
    this._.numSamples -= inNumSamples;

    if (this._.numSamples <= 0) {
      this._.numSamples += this.bufferSize;

      let event = immigration.apply(admission =>
        new AudioProcessingEvent(admission, this)
      );

      event.playbackTime = this.context.currentTime + this.bufferSize / this.context.sampleRate;
      event.inputBuffer = immigration.apply(admission =>
        new AudioBuffer(admission, this.context, this._.numberOfInputChannels, this.bufferSize, this.context.sampleRate)
      );
      event.outputBuffer = immigration.apply(admission =>
        new AudioBuffer(admission, this.context, this._.numberOfOutputChannels, this.bufferSize, this.context.sampleRate)
      );

      this.dispatchEvent(event);
    }
  }
}
