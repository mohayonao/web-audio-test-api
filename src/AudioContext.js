const dom = require("./dom");
const testapi = require("./testapi");
const versions = require("./testapi/decorators/versions");
const utils = require("./utils");
const AudioBuffer = require("./AudioBuffer");
const AnalyserNode = require("./AnalyserNode");
const AudioBufferSourceNode = require("./AudioBufferSourceNode");
const AudioDestinationNode = require("./AudioDestinationNode");
const AudioListener = require("./AudioListener");
const BiquadFilterNode = require("./BiquadFilterNode");
const ChannelMergerNode = require("./ChannelMergerNode");
const ChannelSplitterNode = require("./ChannelSplitterNode");
const ConvolverNode = require("./ConvolverNode");
const DelayNode = require("./DelayNode");
const DynamicsCompressorNode = require("./DynamicsCompressorNode");
const GainNode = require("./GainNode");
const MediaElementAudioSourceNode = require("./MediaElementAudioSourceNode");
const MediaStreamAudioDestinationNode = require("./MediaStreamAudioDestinationNode");
const MediaStreamAudioSourceNode = require("./MediaStreamAudioSourceNode");
const OscillatorNode = require("./OscillatorNode");
const PannerNode = require("./PannerNode");
const PeriodicWave = require("./PeriodicWave");
const ScriptProcessorNode = require("./ScriptProcessorNode");
const StereoPannerNode = require("./StereoPannerNode");
const WaveShaperNode = require("./WaveShaperNode");

const PROMISE_BASED_DECODE_AUDIO_DATA = { chrome: "none", firefox: "36-", safari: "none" };
const AUDIOCONTEXT_STATE = { chrome: "41-", firefox: "40-", safari: "9-" };
const NOOP = () => {};
const createAudioNodeContract = {
  precondition() {
    if (testapi.caniuse(AUDIOCONTEXT_STATE, versions.targetVersions)) {
      if (this._.state === "closed") {
        throw new TypeError(`AudioContext has been closed.`);
      }
    }
  }
};

module.exports = class AudioContext extends dom.EventTarget {
  static get WEB_AUDIO_TEST_API_VERSION() {
    return testapi.version;
  }

  constructor() {
    super();

    Object.defineProperty(this, "_", { value: {} });

    this._.sampleRate = testapi.sampleRate;
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
    if (testapi.caniuse(AUDIOCONTEXT_STATE, versions.targetVersions)) {
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
        this.dispatchEvent(new dom.Event("statechange", this));
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
        this.dispatchEvent(new dom.Event("statechange", this));
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
        this.dispatchEvent(new dom.Event("statechange", this));
      }
      resolve();
    });
  }

  @testapi.methods.param("numberOfChannels", testapi.isPositiveInteger)
  @testapi.methods.param("length", testapi.isPositiveInteger)
  @testapi.methods.param("sampleRate", testapi.isPositiveInteger)
  @testapi.methods.returns(testapi.isInstanceOf(AudioBuffer))
  createBuffer(numberOfChannels, length, sampleRate) {
    return AudioBuffer.$new(this, numberOfChannels, length, sampleRate);
  }

  decodeAudioData() {
    if (testapi.caniuse(PROMISE_BASED_DECODE_AUDIO_DATA, versions.targetVersions)) {
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
        resolve(this.DECODE_AUDIO_DATA_RESULT || AudioBuffer.$new(this, 2, 1024, this.sampleRate)
        );
      }
    });

    promise.then(successCallback, errorCallback);

    return promise;
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(AudioBufferSourceNode))
  createBufferSource() {
    return AudioBufferSourceNode.$new(this);
  }

  @testapi.methods.param("mediaElement", testapi.isInstanceOf(dom.HTMLMediaElement))
  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(MediaElementAudioSourceNode))
  createMediaElementSource(mediaElement) {
    return MediaElementAudioSourceNode.$new(this, mediaElement);
  }

  @testapi.methods.param("mediaStream", testapi.isInstanceOf(dom.MediaStream))
  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(MediaStreamAudioSourceNode))
  createMediaStreamSource(mediaStream) {
    return MediaStreamAudioSourceNode.$new(this, mediaStream);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(MediaStreamAudioDestinationNode))
  createMediaStreamDestination() {
    return MediaStreamAudioDestinationNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.versions({ chrome: "", firefox: "", safari: "" })
  createAudioWorker() {}

  @testapi.methods.param("bufferSize", testapi.isEnum([ 256, 512, 1024, 2048, 4096, 8192, 16384 ]))
  @testapi.methods.param("[ numberOfInputChannels ]", testapi.isPositiveInteger)
  @testapi.methods.param("[ numberOfOutputChannels ]", testapi.isPositiveInteger)
  @testapi.methods.returns(testapi.isInstanceOf(ScriptProcessorNode))
  createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
    return ScriptProcessorNode.$new(this, bufferSize, numberOfInputChannels, numberOfOutputChannels);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(AnalyserNode))
  createAnalyser() {
    return AnalyserNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(GainNode))
  createGain() {
    return GainNode.$new(this);
  }

  @testapi.methods.param("[ maxDelayTime ]", testapi.isPositiveNumber)
  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(DelayNode))
  createDelay(maxDelayTime) {
    return DelayNode.$new(this, maxDelayTime);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(BiquadFilterNode))
  createBiquadFilter() {
    return BiquadFilterNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(WaveShaperNode))
  createWaveShaper() {
    return WaveShaperNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(PannerNode))
  createPanner() {
    return PannerNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(StereoPannerNode))
  @testapi.versions({ chrome: "41-", firefox: "37-", safari: "none" })
  createStereoPanner() {
    return StereoPannerNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(ConvolverNode))
  createConvolver() {
    return ConvolverNode.$new(this);
  }

  @testapi.methods.param("[ numberOfOutputs ]", testapi.isPositiveInteger)
  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(ChannelSplitterNode))
  createChannelSplitter(numberOfOutputs) {
    return ChannelSplitterNode.$new(this, numberOfOutputs);
  }

  @testapi.methods.param("[ numberOfInputs ]", testapi.isPositiveInteger)
  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(ChannelMergerNode))
  createChannelMerger(numberOfInputs) {
    return ChannelMergerNode.$new(this, numberOfInputs);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(DynamicsCompressorNode))
  createDynamicsCompressor() {
    return DynamicsCompressorNode.$new(this);
  }

  @testapi.methods.contract(createAudioNodeContract)
  @testapi.methods.returns(testapi.isInstanceOf(OscillatorNode))
  createOscillator() {
    return OscillatorNode.$new(this);
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
    return PeriodicWave.$new(this, real, imag);
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
    this.__process(utils.toMicroseconds(when));
  }

  $processTo(when) {
    let time = utils.toMicroseconds(when);

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
};
