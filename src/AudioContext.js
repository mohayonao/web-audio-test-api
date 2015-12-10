import utils from "./utils";
import Configuration from "./utils/Configuration";
import Immigration from "./utils/Immigration";
import Event from "./Event";
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
import oncallback from "./decorators/oncallback";

let configuration = Configuration.getInstance();
let immigration = Immigration.getInstance();

function isEnabledState() {
  return configuration.getState("AudioContext#suspend") === "enabled"
    || configuration.getState("AudioContext#resume") === "enabled"
    || configuration.getState("AudioContext#close") === "enabled";
}

function transitionToState(methodName, callback) {
  this._.inspector.describe(methodName, [], ($assert) => {
    $assert(configuration.getState(`AudioContext#${methodName}`) === "enabled", (fmt) => {
      throw new TypeError(fmt.plain `
        ${fmt.form};
        not enabled
      `);
    });
  });

  return new Promise((resolve, reject) => {
    this._.inspector.describe(methodName, [], ($assert) => {
      $assert(this._.state !== "closed", (fmt) => {
        reject(new Error(fmt.plain `
          ${fmt.form};
          Cannot ${methodName} a context that is being closed or has already been closed
        `));
      });
    });

    callback();
    resolve();
  });
}

export default class AudioContext extends EventTarget {
  constructor() {
    super();

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

  get destination() {
    return this._.destination;
  }

  set destination(value) {
    this._.inspector.describe("destination", ($assert) => {
      $assert.throwReadOnlyTypeError(value);
    });
  }

  get sampleRate() {
    return this._.sampleRate;
  }

  set sampleRate(value) {
    this._.inspector.describe("sampleRate", ($assert) => {
      $assert.throwReadOnlyTypeError(value);
    });
  }

  get currentTime() {
    return this._.microCurrentTime / (1000 * 1000);
  }

  set currentTime(value) {
    this._.inspector.describe("currentTime", ($assert) => {
      $assert.throwReadOnlyTypeError(value);
    });
  }

  get listener() {
    return this._.listener;
  }

  set listener(value) {
    this._.inspector.describe("listener", ($assert) => {
      $assert.throwReadOnlyTypeError(value);
    });
  }

  get state() {
    if (isEnabledState()) {
      return this._.state;
    }
  }

  set state(value) {
    if (!isEnabledState()) {
      return;
    }

    this._.inspector.describe("state", ($assert) => {
      $assert.throwReadOnlyTypeError(value);
    });
  }

  @oncallback()
  onstatechange() {}

  get $name() {
    return "AudioContext";
  }

  get $context() {
    return this;
  }

  suspend() {
    return transitionToState.call(this, "suspend", () => {
      if (this._.state === "running") {
        this._.state = "suspended";
        this.dispatchEvent(new Event("statechange", this));
      }
    });
  }

  resume() {
    return transitionToState.call(this, "resume", () => {
      if (this._.state === "suspended") {
        this._.state = "running";
        this.dispatchEvent(new Event("statechange", this));
      }
    });
  }

  close() {
    return transitionToState.call(this, "close", () => {
      if (this._.state !== "closed") {
        this._.state = "closed";
        this.$reset();
        this.dispatchEvent(new Event("statechange", this));
      }
    });
  }

  createBuffer(numberOfChannels, length, sampleRate) {
    return immigration.apply(admission =>
      new AudioBuffer(admission, this, numberOfChannels, length, sampleRate)
    );
  }

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

    function $assertion() {
      if ($assertion.done) {
        return;
      }

      this._.inspector.describe("decodeAudioData", [ "audioData", "successCallback", "errorCallback" ], ($assert) => {
        $assert(utils.isInstanceOf(audioData, global.ArrayBuffer), (fmt) => {
          throw new TypeError(fmt.plain `
            ${fmt.form};
            ${fmt.butGot(audioData, "audioData", "ArrayBuffer")}
          `);
        });

        $assert(utils.isFunction(successCallback), (fmt) => {
          throw new TypeError(fmt.plain `
            ${fmt.form};
            ${fmt.butGot(successCallback, "successCallback", "function")}
          `);
        });

        $assert(utils.isFunction(errorCallback), (fmt) => {
          throw new TypeError(fmt.plain `
            ${fmt.form};
            ${fmt.butGot(errorCallback, "errorCallback", "function")}
          `);
        });
      });

      $assertion.done = true;
    }

    let promise = new Promise((resolve, reject) => {
      $assertion.call(this);

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

    $assertion.call(this);
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

  createAudioWorker() {
    this._.inspector.describe("createAudioWorker", ($assert) => {
      $assert(false, (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          not enabled
        `);
      });
    });
  }

  createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels) {
    if (arguments.length < 3) {
      numberOfOutputChannels = 2;
    }
    if (arguments.length < 2) {
      numberOfInputChannels = 2;
    }

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

  createDelay(maxDelayTime) {
    if (arguments.length < 1) {
      maxDelayTime = 1;
    }

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

  createStereoPanner() {
    this._.inspector.describe("createStereoPanner", ($assert) => {
      $assert(configuration.getState("AudioContext#createStereoPanner") === "enabled", (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          not enabled
        `);
      });
    });

    return immigration.apply(admission =>
      new StereoPannerNode(admission, this)
    );
  }

  createConvolver() {
    return immigration.apply(admission =>
      new ConvolverNode(admission, this)
    );
  }

  createChannelSplitter(numberOfOutputs = 6) {
    return immigration.apply(admission =>
      new ChannelSplitterNode(admission, this, numberOfOutputs)
    );
  }

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

  createPeriodicWave(real, imag) {
    return immigration.apply(admission =>
      new PeriodicWave(admission, this, real, imag)
    );
  }

  toJSON() {
    return this.destination.toJSON([]);
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
