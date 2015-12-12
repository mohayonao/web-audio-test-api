import Configuration from "./utils/Configuration";
import Immigration from "./utils/Immigration";
import Event from "./dom/Event";
import AudioContext from "./AudioContext";
import AudioBuffer from "./AudioBuffer";
import OfflineAudioCompletionEvent from "./OfflineAudioCompletionEvent";
import * as props from "./decorators/props";
import * as methods from "./decorators/methods";
import * as validators from "./validators";

let configuration = Configuration.getInstance();
let immigration = Immigration.getInstance();

export default class OfflineAudioContext extends AudioContext {
  constructor(numberOfChannels, length, sampleRate) {
    super();
    this.__OfflineAudioContext(numberOfChannels, length, sampleRate);
  }

  @methods.param("numberOfChannels", validators.isPositiveInteger)
  @methods.param("length", validators.isPositiveInteger)
  @methods.param("sampleRate", validators.isPositiveInteger)
  __OfflineAudioContext(numberOfChannels, length, sampleRate) {
    this._.sampleRate = sampleRate;
    this._.numberOfChannels = numberOfChannels;
    this._.length = length;
    this._.rendering = false;
    this._.resolve = null;
    this._.state = "suspended";
  }

  @props.on("complete")
  oncomplete() {}

  suspend() {
    return this.__transitionToState("suspend");
  }

  resume() {
    return this.__transitionToState("resume");
  }

  close() {
    return this.__transitionToState("close");
  }

  @methods.contract({
    precondition() {
      if (this._.rendering) {
        throw new TypeError("cannot call startRendering more than once");
      }
    }
  })
  startRendering() {
    let isPromiseBased = configuration.getState("OfflineAudioContext#startRendering") === "promise";

    this._.rendering = true;

    if (isPromiseBased) {
      return new Promise((resolve) => {
        this._.resolve = resolve;
        this._.state = "running";
        this.dispatchEvent(new Event("statechange", this));
      });
    }

    this._.state = "running";
    this.dispatchEvent(new Event("statechange", this));
  }

  @methods.contract({
    precondition(methodName) {
      if (configuration.getState(`AudioContext#${methodName}`) !== "enabled") {
        throw new TypeError("not enabled");
      }
    }
  })
  __transitionToState(methodName) {
    return new Promise(() => {
      throw new TypeError(`Cannot ${methodName} on an OfflineAudioContext`);
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
      let renderedBuffer = immigration.apply(admission =>
        new AudioBuffer(admission, this, this._.numberOfChannels, this._.length, this.sampleRate)
      );
      let event = immigration.apply(admission =>
        new OfflineAudioCompletionEvent(admission, this)
      );

      event.renderedBuffer = renderedBuffer;

      this._.state = "closed";

      this.dispatchEvent(event);
      if (this._.resolve !== null) {
        this._.resolve(renderedBuffer);
        this._.resolve = null;
      }

      this.dispatchEvent(new Event("statechange", this));
    }
  }
}
