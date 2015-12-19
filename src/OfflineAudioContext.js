const dom = require("./dom");
const testapi = require("./testapi");
const versions = require("./testapi/decorators/versions");
const AudioContext = require("./AudioContext");
const AudioBuffer = require("./AudioBuffer");
const OfflineAudioCompletionEvent = require("./OfflineAudioCompletionEvent");

const PROMISE_BASED_START_RENDERING = { chrome: "42-", firefox: "37-", safari: "none" };

module.exports = class OfflineAudioContext extends AudioContext {
  constructor(numberOfChannels, length, sampleRate) {
    super();

    this.__OfflineAudioContext(numberOfChannels, length, sampleRate);
  }

  @testapi.methods.param("numberOfChannels", testapi.isPositiveInteger)
  @testapi.methods.param("length", testapi.isPositiveInteger)
  @testapi.methods.param("sampleRate", testapi.isPositiveInteger)
  __OfflineAudioContext(numberOfChannels, length, sampleRate) {
    this._.sampleRate = sampleRate;
    this._.numberOfChannels = numberOfChannels;
    this._.length = length;
    this._.rendering = false;
    this._.resolve = null;
    this._.state = "suspended";
  }

  @testapi.props.on("complete")
  oncomplete() {}

  @testapi.versions({ chrome: "41-", firefox: "40-", safari: "9-" })
  suspend() {
    return Promise.reject(new TypeError(`Failed to execute 'suspend' on 'OfflineAudioContext'.`));
  }

  @testapi.versions({ chrome: "41-", firefox: "40-", safari: "9-" })
  resume() {
    return Promise.reject(new TypeError(`Failed to execute 'resume' on 'OfflineAudioContext'.`));
  }

  @testapi.versions({ chrome: "42-", firefox: "40-", safari: "9-" })
  close() {
    return Promise.reject(new TypeError(`Failed to execute 'close' on 'OfflineAudioContext'.`));
  }

  @testapi.methods.contract({
    precondition() {
      if (this._.rendering) {
        throw new TypeError("Cannot call startRendering more than once.");
      }
    }
  })
  startRendering() {
    this._.rendering = true;
    if (testapi.caniuse(PROMISE_BASED_START_RENDERING, versions.targetVersions)) {
      return this.__startRendering$$Promise.apply(this, arguments);
    }
    return this.__startRendering$$Void.apply(this, arguments);
  }

  __startRendering$$Void() {
    this._.state = "running";
    this.dispatchEvent(new dom.Event("statechange", this));
  }

  __startRendering$$Promise() {
    return new Promise((resolve) => {
      this._.resolve = resolve;
      this._.state = "running";
      this.dispatchEvent(new dom.Event("statechange", this));
    });
  }

  get $name() {
    return "OfflineAudioContext";
  }

  __process(microseconds) {
    if (!this._.rendering || this._.length <= this._.processedSamples) {
      return;
    }

    let nextMicroCurrentTime = this._.microCurrentTime + microseconds;

    while (this._.microCurrentTime < nextMicroCurrentTime) {
      let microCurrentTime = Math.min(this._.microCurrentTime + 1000, nextMicroCurrentTime);
      let processedSamples = Math.floor(microCurrentTime / (1000 * 1000) * this.sampleRate);
      let inNumSamples = processedSamples - this._.processedSamples;

      this.destination.$process(inNumSamples, ++this._.tick);

      this._.microCurrentTime = microCurrentTime;
      this._.processedSamples = processedSamples;

      if (this._.length <= this._.processedSamples) {
        break;
      }
    }

    if (this._.length <= this._.processedSamples) {
      let renderedBuffer = AudioBuffer.$new(this, this._.numberOfChannels, this._.length, this.sampleRate);
      let event = OfflineAudioCompletionEvent.$new(this);

      event.renderedBuffer = renderedBuffer;

      this._.state = "closed";

      this.dispatchEvent(event);
      if (this._.resolve !== null) {
        this._.resolve(renderedBuffer);
        this._.resolve = null;
      }

      this.dispatchEvent(new dom.Event("statechange", this));
    }
  }
};
