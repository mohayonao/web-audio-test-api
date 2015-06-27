import assert from "power-assert";
import Configuration from "../../src/utils/Configuration";

describe("Configuration", () => {
  describe("constructor", () => {
    it("()", () => {
      let configuration = new Configuration();

      assert(configuration instanceof Configuration);
    });
  });

  describe(".getInstance", () => {
    it("(): Configuration", () => {
      let configuration1 = Configuration.getInstance();
      let configuration2 = Configuration.getInstance();

      assert(configuration1 instanceof Configuration);
      assert(configuration2 instanceof Configuration);
      assert(configuration1 === configuration2);
    });
  });

  describe("#getState", () => {
    it("(name: string): string", () => {
      let configuration = new Configuration();

      assert(configuration.getState("AnalyserNode#getFloatTimeDomainData") === "disabled");
      assert(configuration.getState("AudioBuffer#copyFromChannel") === "disabled");
      assert(configuration.getState("AudioBuffer#copyToChannel") === "disabled");
      assert(configuration.getState("AudioContext#createAudioWorker") === "disabled");
      assert(configuration.getState("AudioContext#createStereoPanner") === "disabled");
      assert(configuration.getState("AudioContext#decodeAudioData") === "void");
      assert(configuration.getState("AudioContext#close") === "disabled");
      assert(configuration.getState("AudioContext#resume") === "disabled");
      assert(configuration.getState("AudioContext#suspend") === "disabled");
      assert(configuration.getState("OfflineAudioContext#startRendering") === "void");
      assert(configuration.getState("AudioNode#disconnect") === "channel");

      assert.throws(() => {
        configuration.getState("AudioNode#valueOf");
      }, (e) => {
        return e instanceof TypeError && /invalid state name/.test(e.message);
      });
    });
  });

  describe("#setState", () => {
    it("(name: string, value: string): void", () => {
      let configuration = new Configuration();

      configuration.setState("AnalyserNode#getFloatTimeDomainData", "enabled");
      configuration.setState("AudioBuffer#copyFromChannel", "enabled");
      configuration.setState("AudioBuffer#copyToChannel", "enabled");
      configuration.setState("AudioContext#createAudioWorker", "enabled");
      configuration.setState("AudioContext#createStereoPanner", "enabled");
      configuration.setState("AudioContext#decodeAudioData", "promise");
      configuration.setState("AudioContext#close", "enabled");
      configuration.setState("AudioContext#resume", "enabled");
      configuration.setState("AudioContext#suspend", "enabled");
      configuration.setState("OfflineAudioContext#startRendering", "promise");
      configuration.setState("AudioNode#disconnect", "selective");

      assert(configuration.getState("AnalyserNode#getFloatTimeDomainData") === "enabled");
      assert(configuration.getState("AudioBuffer#copyFromChannel") === "enabled");
      assert(configuration.getState("AudioBuffer#copyToChannel") === "enabled");
      assert(configuration.getState("AudioContext#createAudioWorker") === "enabled");
      assert(configuration.getState("AudioContext#createStereoPanner") === "enabled");
      assert(configuration.getState("AudioContext#decodeAudioData") === "promise");
      assert(configuration.getState("AudioContext#close") === "enabled");
      assert(configuration.getState("AudioContext#resume") === "enabled");
      assert(configuration.getState("AudioContext#suspend") === "enabled");
      assert(configuration.getState("OfflineAudioContext#startRendering") === "promise");
      assert(configuration.getState("AudioNode#disconnect") === "selective");

      configuration.setState({
        "AnalyserNode#getFloatTimeDomainData": "disabled",
        "AudioBuffer#copyFromChannel": "disabled",
        "AudioBuffer#copyToChannel": "disabled",
        "AudioContext#createAudioWorker": "disabled",
        "AudioContext#createStereoPanner": "disabled",
        "AudioContext#decodeAudioData": "void",
        "AudioContext#close": "disabled",
        "AudioContext#resume": "disabled",
        "AudioContext#suspend": "disabled",
        "OfflineAudioContext#startRendering": "void",
        "AudioNode#disconnect": "channel",
      });

      assert(configuration.getState("AnalyserNode#getFloatTimeDomainData") === "disabled");
      assert(configuration.getState("AudioBuffer#copyFromChannel") === "disabled");
      assert(configuration.getState("AudioBuffer#copyToChannel") === "disabled");
      assert(configuration.getState("AudioContext#createAudioWorker") === "disabled");
      assert(configuration.getState("AudioContext#createStereoPanner") === "disabled");
      assert(configuration.getState("AudioContext#decodeAudioData") === "void");
      assert(configuration.getState("AudioContext#close") === "disabled");
      assert(configuration.getState("AudioContext#resume") === "disabled");
      assert(configuration.getState("AudioContext#suspend") === "disabled");
      assert(configuration.getState("OfflineAudioContext#startRendering") === "void");
      assert(configuration.getState("AudioNode#disconnect") === "channel");

      assert.throws(() => {
        configuration.setState("AudioNode#valueOf", "enabled");
      }, (e) => {
        return e instanceof TypeError && /invalid state name/.test(e.message);
      });

      assert.throws(() => {
        configuration.setState("AudioNode#disconnect", "enabled");
      }, (e) => {
        return e instanceof TypeError && /invalid state value/.test(e.message);
      });
    });
  });
});
