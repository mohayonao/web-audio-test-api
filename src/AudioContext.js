import * as util from "./util";
import EventTarget from "./EventTarget";
import AnalyserNode from "./AnalyserNode";
import AudioBuffer from "./AudioBuffer";
import AudioBufferSourceNode from "./AudioBufferSourceNode";
import AudioDestinationNode from "./AudioDestinationNode";
import AudioListener from "./AudioListener";
import BiquadFilterNode from "./BiquadFilterNode";
import ChannelMergerNode from "./ChannelMergerNode";
import ChannelSplitterNode from "./ChannelSplitterNode";
import ConvolverNode from "./ConvolverNode";
import DelayNode from "./DelayNode";
import DynamicsCompressorNode from "./DynamicsCompressorNode";
import GainNode from "./GainNode";
import MediaElementAudioSourceNode from "./MediaElementAudioSourceNode";
import MediaStreamAudioDestinationNode from "./MediaStreamAudioDestinationNode";
import MediaStreamAudioSourceNode from "./MediaStreamAudioSourceNode";
import OscillatorNode from "./OscillatorNode";
import PannerNode from "./PannerNode";
import PeriodicWave from "./PeriodicWave";
import ScriptProcessorNode from "./ScriptProcessorNode";
import StereoPannerNode from "./StereoPannerNode";
import WaveShaperNode from "./WaveShaperNode";

export default class AudioContext extends EventTarget {
  constructor() {
    super();

    this._.destination = util.immigration.apply(admission =>
      new AudioDestinationNode(admission, this)
    );
    this._.sampleRate = global.WebAudioTestAPI.sampleRate;
    this._.listener = util.immigration.apply(admission =>
      new AudioListener(admission, this)
    );
    this._.microCurrentTime = 0;
    this._.processedSamples = 0;
    this._.tick = 0;
  }

  static get WEB_AUDIO_TEST_API_VERSION() {
    return util.getAPIVersion();
  }

  get destination() {
    return this._.destination;
  }

  set destination(value) {
    this._.inspector.describe("destination", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get sampleRate() {
    return this._.sampleRate;
  }

  set sampleRate(value) {
    this._.inspector.describe("sampleRate", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get currentTime() {
    return this._.microCurrentTime / (1000 * 1000);
  }

  set currentTime(value) {
    this._.inspector.describe("currentTime", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get listener() {
    return this._.listener;
  }

  set listener(value) {
    this._.inspector.describe("listener", (assert) => {
      assert.throwReadOnlyTypeError(value);
    });
  }

  get $name() {
    return "AudioContext";
  }

  get $context() {
    return this;
  }

  createBuffer(numberOfChannels, length, sampleRate) {
    return util.immigration.apply(admission =>
      new AudioBuffer(admission, this, numberOfChannels, length, sampleRate)
    );
  }

  decodeAudioData(audioData, successCallback, errorCallback = () => {}) {
    this._.inspector.describe("decodeAudioData", [ "audioData", "successCallback", "errorCallback" ], (assert) => {
      assert(util.isInstanceOf(audioData, global.ArrayBuffer), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(audioData, "audioData", "ArrayBuffer")}
        `);
      });

      assert(util.isFunction(successCallback), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(successCallback, "successCallback", "function")}
        `);
      });

      assert(util.isFunction(errorCallback), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(errorCallback, "errorCallback", "function")}
        `);
      });
    });

    setTimeout(() => {
      if (this.DECODE_AUDIO_DATA_FAILED) {
        errorCallback();
      } else {
        successCallback(this.DECODE_AUDIO_DATA_RESULT || util.immigration.apply(admission =>
          new AudioBuffer(admission, this, 2, 1024, this.sampleRate)
        ));
      }
    }, 0);
  }

  createBufferSource() {
    return util.immigration.apply(admission =>
      new AudioBufferSourceNode(admission, this)
    );
  }

  createMediaElementSource(mediaElement) {
    return util.immigration.apply(admission =>
      new MediaElementAudioSourceNode(admission, this, mediaElement)
    );
  }

  createMediaStreamSource(mediaStream) {
    return util.immigration.apply(admission =>
      new MediaStreamAudioSourceNode(admission, this, mediaStream)
    );
  }

  createMediaStreamDestination() {
    return util.immigration.apply(admission =>
      new MediaStreamAudioDestinationNode(admission, this)
    );
  }

  createAudioWorker() {
    this._.inspector.describe("createAudioWorker", (assert) => {
      assert(false, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          not enabled
        `);
      });
    });
  }

  createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
    return util.immigration.apply(admission =>
      new ScriptProcessorNode(admission, this, bufferSize, numberOfInputChannels, numberOfOutputChannels)
    );
  }

  createAnalyser() {
    return util.immigration.apply(admission =>
      new AnalyserNode(admission, this)
    );
  }

  createGain() {
    return util.immigration.apply(admission =>
      new GainNode(admission, this)
    );
  }

  createDelay(maxDelayTime = 1) {
    return util.immigration.apply(admission =>
      new DelayNode(admission, this, maxDelayTime)
    );
  }

  createBiquadFilter() {
    return util.immigration.apply(admission =>
      new BiquadFilterNode(admission, this)
    );
  }

  createWaveShaper() {
    return util.immigration.apply(admission =>
      new WaveShaperNode(admission, this)
    );
  }

  createPanner() {
    return util.immigration.apply(admission =>
      new PannerNode(admission, this)
    );
  }

  createStereoPanner() {
    this._.inspector.describe("createStereoPanner", (assert) => {
      assert(util.configuration.getState("AudioContext#createStereoPanner") === "enabled", (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          not enabled
        `);
      });
    });

    return util.immigration.apply(admission =>
      new StereoPannerNode(admission, this)
    );
  }

  createConvolver() {
    return util.immigration.apply(admission =>
      new ConvolverNode(admission, this)
    );
  }

  createChannelSplitter(numberOfOutputs = 6) {
    return util.immigration.apply(admission =>
      new ChannelSplitterNode(admission, this, numberOfOutputs)
    );
  }

  createChannelMerger(numberOfInputs = 6) {
    return util.immigration.apply(admission =>
      new ChannelMergerNode(admission, this, numberOfInputs)
    );
  }

  createDynamicsCompressor() {
    return util.immigration.apply(admission =>
      new DynamicsCompressorNode(admission, this)
    );
  }

  createOscillator() {
    return util.immigration.apply(admission =>
      new OscillatorNode(admission, this)
    );
  }

  createPeriodicWave(real, imag) {
    return util.immigration.apply(admission =>
      new PeriodicWave(admission, this, real, imag)
    );
  }

  toJSON() {
    return this.destination.toJSON([]);
  }

  $process(time) {
    this._process(util.toMicroseconds(time));
  }

  $processTo(_time) {
    let time = util.toMicroseconds(_time);

    if (this._.microCurrentTime < time) {
      this._process(time - this._.microCurrentTime);
    }
  }

  $reset() {
    this._.microCurrentTime = 0;
    this._.processedSamples = 0;
    this.destination.$inputs.forEach((node) => {
      node.disconnect();
    });
  }

  _process(microseconds) {
    let nextMicroCurrentTime = this._.microCurrentTime + microseconds;

    while (this._.microCurrentTime < nextMicroCurrentTime) {
      let _nextMicroCurrentTime = Math.min(this._.microCurrentTime + 1000, nextMicroCurrentTime);
      let _nextProcessedSamples = Math.floor(_nextMicroCurrentTime / (1000 * 1000) * this.sampleRate);
      let inNumSamples = _nextProcessedSamples - this._.processedSamples;

      this._.microCurrentTime = _nextMicroCurrentTime;
      this._.processedSamples = _nextProcessedSamples;

      this.destination.$process(inNumSamples, ++this._.tick);
    }
  }
}
