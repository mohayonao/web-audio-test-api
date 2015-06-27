import * as util from "./util";
import AudioContext from "./AudioContext";
import AudioBuffer from "./AudioBuffer";
import OfflineAudioCompletionEvent from "./OfflineAudioCompletionEvent";

export default class OfflineAudioContext extends AudioContext {
  constructor(numberOfChannels, length, sampleRate) {
    super();

    this._.inspector.describe("constructor", (assert) => {
      assert(util.isPositiveInteger(numberOfChannels), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(numberOfChannels, "numberOfChannels", "positive integer")}
        `);
      });

      assert(util.isPositiveInteger(length), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(length, "length", "positive integer")}
        `);
      });

      assert(util.isPositiveInteger(sampleRate), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(sampleRate, "sampleRate", "positive integer")}
        `);
      });
    });

    this._.sampleRate = sampleRate;
    this._.oncomplete = null;
    this._.numberOfChannels = numberOfChannels;
    this._.length = length;
    this._.rendering = false;
    this._.resolve = null;
  }

  get oncomplete() {
    return this._.oncomplete;
  }

  set oncomplete(value) {
    this._.inspector.describe("oncomplete", (assert) => {
      assert(util.isNullOrFunction(value), (fmt) => {
        throw new TypeError(fmt.plain `
          ${fmt.form};
          ${fmt.butGot(value, "value", "function")}
        `);
      });
    });

    this._.oncomplete = value;
  }

  get $name() {
    return "OfflineAudioContext";
  }

  startRendering() {
    let isPromiseBased = util.configuration.getState("OfflineAudioContext#startRendering") === "promise";
    let rendering = this._.rendering;

    function assertion() {
      this._.inspector.describe("startRendering", (assert) => {
        assert(!rendering, (fmt) => {
          throw new Error(fmt.plain `
            ${fmt.form};
            cannot call startRendering more than once
          `);
        });
      });
    }

    this._.rendering = true;

    if (isPromiseBased) {
      return new Promise((resolve) => {
        assertion.call(this);
        this._.resolve = resolve;
      });
    }

    assertion.call(this);
  }

  _process(microseconds) {
    if (!this._.rendering || this._.length <= this._.processedSamples) {
      return;
    }

    let nextMicroCurrentTime = this._.microCurrentTime + microseconds;

    while (this._.microCurrentTime < nextMicroCurrentTime) {
      let _nextMicroCurrentTime = Math.min(this._.microCurrentTime + 1000, nextMicroCurrentTime);
      let _nextProcessedSamples = Math.floor(_nextMicroCurrentTime / (1000 * 1000) * this.sampleRate);
      let inNumSamples = _nextProcessedSamples - this._.processedSamples;

      this.destination.$process(inNumSamples, ++this._.tick);

      this._.microCurrentTime = _nextMicroCurrentTime;
      this._.processedSamples = _nextProcessedSamples;

      if (this._.length <= this._.processedSamples) {
        break;
      }
    }

    if (this._.length <= this._.processedSamples) {
      let renderedBuffer = util.immigration.apply(admission =>
        new AudioBuffer(admission, this, this._.numberOfChannels, this._.length, this.sampleRate)
      );
      let event = util.immigration.apply(admission =>
        new OfflineAudioCompletionEvent(admission, this)
      );

      event.renderedBuffer = renderedBuffer;

      this.dispatchEvent(event);
      if (this._.resolve !== null) {
        this._.resolve(renderedBuffer);
        this._.resolve = null;
      }
    }
  }
}
