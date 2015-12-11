import utils from "./utils";
import Configuration from "./utils/Configuration";
import Immigration from "./utils/Immigration";
import Event from "./dom/Event";
import EventTarget from "./dom/EventTarget";
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
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

let configuration = Configuration.getInstance();
let immigration = Immigration.getInstance();

function isEnabledState() {
  return configuration.getState("AudioContext#suspend") === "enabled"
    || configuration.getState("AudioContext#resume") === "enabled"
    || configuration.getState("AudioContext#close") === "enabled";
}

export default class AudioContext extends EventTarget {
  constructor() {
    super();

    Object.defineProperty(this, "_", { value: {} });

    this._.destination = immigration.apply(admission =>
      new AudioDestinationNode(admission, this)
    );
    this._.sampleRate = global.WebAudioTestAPI.sampleRate;
    this._.listener = immigration.apply(admission =>
      new AudioListener(admission, this)
    );
    this._.microCurrentTime = 0;
    this._.processedSamples = 0;
    this._.tick = 0;
    this._.state = "running";
  }

  static get WEB_AUDIO_TEST_API_VERSION() {
    return utils.getAPIVersion();
  }

  @props.readonly()
  destination() {
    return this._.destination;
  }

  @props.readonly()
  sampleRate() {
    return this._.sampleRate;
  }

  @props.readonly()
  currentTime() {
    return this._.microCurrentTime / (1000 * 1000);
  }

  @props.readonly()
  listener() {
    return this._.listener;
  }

  get state() {
    if (isEnabledState()) {
      return this._.state;
    }
  }

  set state(value) {
    if (!isEnabledState(value)) {
      return;
    }
    throw new TypeError(`${this.constructor.name}; Attempt to assign to readonly property: "state"`);
  }

  @props.on("statechange")
  onstatechange() {}

  suspend() {
    return this.__transitionToState("suspend", () => {
      if (this._.state === "running") {
        this._.state = "suspended";
        this.dispatchEvent(new Event("statechange", this));
      }
    });
  }

  resume() {
    return this.__transitionToState("resume", () => {
      if (this._.state === "suspended") {
        this._.state = "running";
        this.dispatchEvent(new Event("statechange", this));
      }
    });
  }

  close() {
    return this.__transitionToState("close", () => {
      if (this._.state !== "closed") {
        this._.state = "closed";
        this.$reset();
        this.dispatchEvent(new Event("statechange", this));
      }
    });
  }

  @methods.param("numberOfChannels", validators.isPositiveInteger)
  @methods.param("length", validators.isPositiveInteger)
  @methods.param("sampleRate", validators.isPositiveInteger)
  createBuffer(numberOfChannels, length, sampleRate) {
    return immigration.apply(admission =>
      new AudioBuffer(admission, this, numberOfChannels, length, sampleRate)
    );
  }

  @methods.param("audioData", validators.isInstanceOf(ArrayBuffer))
  @methods.param("[ successCallback ]", validators.isFunction)
  @methods.param("[ errorCallback ]", validators.isFunction)
  decodeAudioData(audioData, _successCallback, _errorCallback) {
    let isPromiseBased = configuration.getState("AudioContext#decodeAudioData") === "promise";
    let successCallback, errorCallback;

    if (isPromiseBased) {
      successCallback = utils.defaults(_successCallback, () => {});
      errorCallback = utils.defaults(_errorCallback, () => {});
    } else {
      successCallback = _successCallback;
      errorCallback = utils.defaults(_errorCallback, () => {});
    }

    let promise = new Promise((resolve, reject) => {
      if (this.DECODE_AUDIO_DATA_FAILED) {
        reject();
      } else {
        resolve(this.DECODE_AUDIO_DATA_RESULT || immigration.apply(admission =>
          new AudioBuffer(admission, this, 2, 1024, this.sampleRate)
        ));
      }
    });

    promise.then(successCallback, errorCallback);

    if (isPromiseBased) {
      return promise;
    }
  }

  createBufferSource() {
    return immigration.apply(admission =>
      new AudioBufferSourceNode(admission, this)
    );
  }

  createMediaElementSource(mediaElement) {
    return immigration.apply(admission =>
      new MediaElementAudioSourceNode(admission, this, mediaElement)
    );
  }

  createMediaStreamSource(mediaStream) {
    return immigration.apply(admission =>
      new MediaStreamAudioSourceNode(admission, this, mediaStream)
    );
  }

  createMediaStreamDestination() {
    return immigration.apply(admission =>
      new MediaStreamAudioDestinationNode(admission, this)
    );
  }

  @methods.contract({
    precondition() {
      throw new TypeError("not enabled");
    }
  })
  createAudioWorker() {}

  @methods.param("bufferSize", validators.isPositiveInteger)
  @methods.param("[ numberOfInputChannels ]", validators.isPositiveInteger)
  @methods.param("[ numberOfOutputChannels ]", validators.isPositiveInteger)
  createScriptProcessor(bufferSize, numberOfInputChannels = 2, numberOfOutputChannels = 2) {
    return immigration.apply(admission =>
      new ScriptProcessorNode(admission, this, bufferSize, numberOfInputChannels, numberOfOutputChannels)
    );
  }

  createAnalyser() {
    return immigration.apply(admission =>
      new AnalyserNode(admission, this)
    );
  }

  createGain() {
    return immigration.apply(admission =>
      new GainNode(admission, this)
    );
  }

  @methods.param("[ maxDelayTime ]", validators.isPositiveNumber)
  createDelay(maxDelayTime = 1) {
    return immigration.apply(admission =>
      new DelayNode(admission, this, maxDelayTime)
    );
  }

  createBiquadFilter() {
    return immigration.apply(admission =>
      new BiquadFilterNode(admission, this)
    );
  }

  createWaveShaper() {
    return immigration.apply(admission =>
      new WaveShaperNode(admission, this)
    );
  }

  createPanner() {
    return immigration.apply(admission =>
      new PannerNode(admission, this)
    );
  }

  @methods.contract({
    precondition() {
      if (configuration.getState("AudioContext#createStereoPanner") !== "enabled") {
        throw new TypeError("not enabled");
      }
    }
  })
  createStereoPanner() {
    return immigration.apply(admission =>
      new StereoPannerNode(admission, this)
    );
  }

  createConvolver() {
    return immigration.apply(admission =>
      new ConvolverNode(admission, this)
    );
  }

  @methods.param("[ numberOfOutputs ]", validators.isPositiveInteger)
  createChannelSplitter(numberOfOutputs = 6) {
    return immigration.apply(admission =>
      new ChannelSplitterNode(admission, this, numberOfOutputs)
    );
  }

  @methods.param("[ numberOfInputs ]", validators.isPositiveInteger)
  createChannelMerger(numberOfInputs = 6) {
    return immigration.apply(admission =>
      new ChannelMergerNode(admission, this, numberOfInputs)
    );
  }

  createDynamicsCompressor() {
    return immigration.apply(admission =>
      new DynamicsCompressorNode(admission, this)
    );
  }

  createOscillator() {
    return immigration.apply(admission =>
      new OscillatorNode(admission, this)
    );
  }

  @methods.param("real", validators.isInstanceOf(Float32Array))
  @methods.param("imag", validators.isInstanceOf(Float32Array))
  createPeriodicWave(real, imag) {
    return immigration.apply(admission =>
      new PeriodicWave(admission, this, real, imag)
    );
  }

  @methods.contract({
    precondition(methodName) {
      if (configuration.getState(`AudioContext#${methodName}`) !== "enabled") {
        throw new TypeError("not enabled");
      }
    }
  })
  __transitionToState(methodName, callback) {
    return new Promise((resolve) => {
      if (this._state === "close") {
        throw new TypeError(`Cannot ${methodName} a context that is being closed or has already been closed`);
      }
      callback();
      resolve();
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

  $process(time) {
    this._process(utils.toMicroseconds(time));
  }

  $processTo(_time) {
    let time = utils.toMicroseconds(_time);

    if (this._.microCurrentTime < time) {
      this._process(time - this._.microCurrentTime);
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

  _process(microseconds) {
    let nextMicroCurrentTime = this._.microCurrentTime + microseconds;

    while (this._.state === "running" && this._.microCurrentTime < nextMicroCurrentTime) {
      let _nextMicroCurrentTime = Math.min(this._.microCurrentTime + 1000, nextMicroCurrentTime);
      let _nextProcessedSamples = Math.floor(_nextMicroCurrentTime / (1000 * 1000) * this.sampleRate);
      let inNumSamples = _nextProcessedSamples - this._.processedSamples;

      this._.microCurrentTime = _nextMicroCurrentTime;
      this._.processedSamples = _nextProcessedSamples;

      this.destination.$process(inNumSamples, ++this._.tick);
    }
  }
}
