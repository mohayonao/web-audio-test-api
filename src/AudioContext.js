import Event from "./dom/Event";
import EventTarget from "./dom/EventTarget";
import HTMLMediaElement from "./dom/HTMLMediaElement";
import MediaStream from "./dom/MediaStream";
import AudioBuffer from "./AudioBuffer";
import AnalyserNode from "./AnalyserNode";
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
import caniuse from "./utils/caniuse";
import getAPIVersion from "./utils/getAPIVersion";
import toMicroseconds from "./utils/toMicroseconds";
import testapi from "./testapi";
import versions from "./testapi/decorators/versions";

const PROMISE_BASED_DECODE_AUDIO_DATA = { chrome: "none", firefox: "36-", safari: "none" };
const AUDIOCONTEXT_STATE = { chrome: "41-", firefox: "40-", safari: "9-" };
const NOOP = () => {};
const createAudioNodeContract = {
  precondition() {
    if (caniuse(AUDIOCONTEXT_STATE, versions.targetVersions)) {
      if (this._.state === "closed") {
        throw new TypeError(`AudioContext has been closed.`);
      }
    }
  }
};

export default class AudioContext extends EventTarget {
  static get WEB_AUDIO_TEST_API_VERSION() {
    return getAPIVersion();
  }

  constructor() {
    super();

    Object.defineProperty(this, "_", { value: {} });

    this._.sampleRate = global.WebAudioTestAPI.sampleRate;
    this._.destination = AudioDestinationNode.$new(this);
    this._.listener = AudioListener.$new(this);
    this._.microCurrentTime = 0;
    this._.processedSamples = 0;
    this._.tick = 0;
    this._.state = "running";
  }

  @testapi.props.readonly()
  destination() {
    return this._.destination;
  }

  @testapi.props.readonly()
  sampleRate() {
    return this._.sampleRate;
  }

  @testapi.props.readonly()
  currentTime() {
    return this._.microCurrentTime / (1000 * 1000);
  }

  @testapi.props.readonly()
  listener() {
    return this._.listener;
  }

  @testapi.props.readonly()
  state() {
    if (caniuse(AUDIOCONTEXT_STATE, versions.targetVersions)) {
      return this._.state;
    }
  }

  @testapi.props.on("statechange")
  onstatechange() {}

  @testapi.methods.returns(testapi.isInstanceOf(Promise))
  @testapi.versions({ chrome: "41-", firefox: "40-", safari: "9-" })
  suspend() {
    return this.__transitionToState("suspend", (resolve) => {
      if (this._.state === "running") {
        this._.state = "suspended";
        this.dispatchEvent(new Event("statechange", this));
      }
      resolve();
    });
  }

  @testapi.methods.returns(testapi.isInstanceOf(Promise))
  @testapi.versions({ chrome: "41-", firefox: "40-", safari: "9-" })
  resume() {
    return this.__transitionToState("resume", (resolve) => {
      if (this._.state === "suspended") {
        this._.state = "running";
        this.dispatchEvent(new Event("statechange", this));
      }
      resolve();
    });
  }

  @testapi.methods.returns(testapi.isInstanceOf(Promise))
  @testapi.versions({ chrome: "42-", firefox: "40-", safari: "9-" })
  close() {
    return this.__transitionToState("close", (resolve) => {
      if (this._.state !== "closed") {
        this._.state = "closed";
        this.$reset();
        this.dispatchEvent(new Event("statechange", this));
      }
      resolve();
    });
  }

  @testapi.methods.param("numberOfChannels", testapi.isPositiveInteger)
  @testapi.methods.param("length", testapi.isPositiveInteger)
  @testapi.methods.param("sampleRate", testapi.isPositiveInteger)
  @testapi.methods.returns(testapi.isInstanceOf(AudioBuffer))
  createBuffer(numberOfChannels, length, sampleRate) {
    return global.WebAudioTestAPI.AudioBuffer.$new(this, numberOfChannels, length, sampleRate);
  }


  decodeAudioData() {
    if (caniuse(PROMISE_BASED_DECODE_AUDIO_DATA, versions.targetVersions)) {
      return this.__decodeAudioData$$Promise.apply(this, arguments);
    }
    return this.__decodeAudioData$$Void.apply(this, arguments);
  }

  @testapi.methods.param("audioData", testapi.isInstanceOf(ArrayBuffer))
  @testapi.methods.param("[ successCallback ]", testapi.isFunction)
  @testapi.methods.param("[ errorCallback ]", testapi.isFunction)
  @testapi.methods.returns(testapi.isInstanceOf(Promise))
  __decodeAudioData$$Promise(audioData, successCallback, errorCallback) {
    return this.__decodeAudioData(audioData, successCallback, errorCallback);
  }

  @testapi.methods.param("audioData", testapi.isInstanceOf(ArrayBuffer))
  @testapi.methods.param("successCallback", testapi.isFunction)
  @testapi.methods.param("[ errorCallback ]", testapi.isFunction)
  __decodeAudioData$$Void(audioData, successCallback, errorCallback) {
    this.__decodeAudioData(audioData, successCallback, errorCallback);
  }

  __decodeAudioData(audioData, successCallback, errorCallback) {
    successCallback = successCallback || NOOP;
    errorCallback = errorCallback || NOOP;

    const promise = new Promise((resolve, reject) => {
      if (this.DECODE_AUDIO_DATA_FAILED) {
        reject();
      } else {
        resolve(this.DECODE_AUDIO_DATA_RESULT
          || global.WebAudioTestAPI.AudioBuffer.$new(this, 2, 1024, this.sampleRate)
        );
      }
    });

    promise.then(successCallback, errorCallback);

    return promise;
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(AudioBufferSourceNode))
  createBufferSource() {
    return global.WebAudioTestAPI.AudioBufferSourceNode.$new(this);
  }

  @testapi.methods.param("mediaElement", testapi.isInstanceOf(HTMLMediaElement))
  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(MediaElementAudioSourceNode))
  createMediaElementSource(mediaElement) {
    return global.WebAudioTestAPI.MediaElementAudioSourceNode.$new(this, mediaElement);
  }

  @testapi.methods.param("mediaStream", testapi.isInstanceOf(MediaStream))
  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(MediaStreamAudioSourceNode))
  createMediaStreamSource(mediaStream) {
    return global.WebAudioTestAPI.MediaStreamAudioSourceNode.$new(this, mediaStream);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(MediaStreamAudioDestinationNode))
  createMediaStreamDestination() {
    return global.WebAudioTestAPI.MediaStreamAudioDestinationNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.versions({ chrome: "", firefox: "", safari: "" })
  createAudioWorker() {}

  @testapi.methods.param("bufferSize", testapi.isPositiveInteger)
  @testapi.methods.param("[ numberOfInputChannels ]", testapi.isPositiveInteger)
  @testapi.methods.param("[ numberOfOutputChannels ]", testapi.isPositiveInteger)
  @testapi.methods.contract({
    precondition(bufferSize) {
      if ([ 256, 512, 1024, 2048, 4096, 8192, 16384 ].indexOf(bufferSize) === -1) {
        throw new TypeError(`The {{bufferSize}} should be one of [ 256, 512, 1024, 2048, 4096, 8192, 16384 ], but got ${bufferSize}.`);
      }
      this::createAudioNodeContract.precondition();
    }
  })
  @testapi.methods.returns(testapi.isInstanceOf(ScriptProcessorNode))
  createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
    return global.WebAudioTestAPI.ScriptProcessorNode.$new(this, bufferSize, numberOfInputChannels, numberOfOutputChannels);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(AnalyserNode))
  createAnalyser() {
    return global.WebAudioTestAPI.AnalyserNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(GainNode))
  createGain() {
    return global.WebAudioTestAPI.GainNode.$new(this);
  }

  @testapi.methods.param("[ maxDelayTime ]", testapi.isPositiveNumber)
  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(DelayNode))
  createDelay(maxDelayTime) {
    return global.WebAudioTestAPI.DelayNode.$new(this, maxDelayTime);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(BiquadFilterNode))
  createBiquadFilter() {
    return BiquadFilterNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(WaveShaperNode))
  createWaveShaper() {
    return global.WebAudioTestAPI.WaveShaperNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(PannerNode))
  createPanner() {
    return global.WebAudioTestAPI.PannerNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(StereoPannerNode))
  @testapi.versions({ chrome: "41-", firefox: "37-", safari: "none" })
  createStereoPanner() {
    return global.WebAudioTestAPI.StereoPannerNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(ConvolverNode))
  createConvolver() {
    return global.WebAudioTestAPI.ConvolverNode.$new(this);
  }

  @testapi.methods.param("[ numberOfOutputs ]", testapi.isPositiveInteger)
  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(ChannelSplitterNode))
  createChannelSplitter(numberOfOutputs) {
    return global.WebAudioTestAPI.ChannelSplitterNode.$new(this, numberOfOutputs);
  }

  @testapi.methods.param("[ numberOfInputs ]", testapi.isPositiveInteger)
  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(ChannelMergerNode))
  createChannelMerger(numberOfInputs) {
    return global.WebAudioTestAPI.ChannelMergerNode.$new(this, numberOfInputs);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(DynamicsCompressorNode))
  createDynamicsCompressor() {
    return global.WebAudioTestAPI.DynamicsCompressorNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(OscillatorNode))
  createOscillator() {
    return global.WebAudioTestAPI.OscillatorNode.$new(this);
  }

  @testapi.methods.param("real", testapi.isInstanceOf(Float32Array))
  @testapi.methods.param("imag", testapi.isInstanceOf(Float32Array))
  @testapi.methods.contract({
    precondition(real, imag) {
      if (4096 < real.length) {
        throw new TypeError(`The length of "{{real}}" array (${real.length}) exceeds allow maximum of 4096.`);
      }
      if (4096 < imag.length) {
        throw new TypeError(`The length of "{{imag}}" array (${imag.length}) exceeds allow maximum of 4096.`);
      }
      if (real.length !== imag.length) {
        throw new TypeError(`The length of "{{real}}" array (${real.length}) and length of "imag" array (${imag.length}) must match.`);
      }
    }
  })
  @testapi.methods.returns(testapi.isInstanceOf(PeriodicWave))
  createPeriodicWave(real, imag) {
    return global.WebAudioTestAPI.PeriodicWave.$new(this, real, imag);
  }

  __transitionToState(methodName, callback) {
    return new Promise((resolve, reject) => {
      if (this._.state === "close") {
        throw new TypeError(`Cannot ${methodName} a context that is being closed or has already been closed.`);
      }
      callback(resolve, reject);
    });
  }

  toJSON() {
    return this.destination.toJSON([]);
  }

  get $name() {
    return "AudioContext";
  }

  get $context() {
    return this;
  }

  $process(when) {
    this.__process(toMicroseconds(when));
  }

  $processTo(when) {
    let time = toMicroseconds(when);

    if (this._.microCurrentTime < time) {
      this.__process(time - this._.microCurrentTime);
    }
  }

  $reset() {
    this._.microCurrentTime = 0;
    this._.processedSamples = 0;
    this.destination.$inputs.forEach((junction) => {
      junction.inputs.forEach((junction) => {
        junction.disconnectAll();
      });
    });
  }

  __process(microseconds) {
    let nextMicroCurrentTime = this._.microCurrentTime + microseconds;

    while (this._.state === "running" && this._.microCurrentTime < nextMicroCurrentTime) {
      let microCurrentTime = Math.min(this._.microCurrentTime + 1000, nextMicroCurrentTime);
      let processedSamples = Math.floor(microCurrentTime / (1000 * 1000) * this.sampleRate);
      let inNumSamples = processedSamples - this._.processedSamples;

      this._.microCurrentTime = microCurrentTime;
      this._.processedSamples = processedSamples;

      this.destination.$process(inNumSamples, ++this._.tick);
    }
  }
}
