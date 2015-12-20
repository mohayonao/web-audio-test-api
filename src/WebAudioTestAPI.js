const WebAudioAPI = require("./WebAudioAPI");
const testapi = require("./testapi");
const utils = require("./utils");
const dom = require("./dom");

function use() {
  Object.keys(WebAudioAPI.testAPI).forEach((key) => {
    global[key] = WebAudioAPI.testAPI[key];
  });
}

function unuse() {
  Object.keys(WebAudioAPI.originalAPI).forEach((key) => {
    global[key] = WebAudioAPI.originalAPI[key];
  });
}

function getState() {
  throw new Error(utils.format(`
    Failed to execute 'getState' on 'WebAudioTestAPI'

    \tThis API is removed. Please use WebAudioTestAPI.setBrowserVersions();
  `) + "\n");
}

function setState() {
  throw new Error(utils.format(`
    Failed to execute 'setState' on 'WebAudioTestAPI'

    \tThis API is removed. Please use WebAudioTestAPI.getBrowserVersions();
  `) + "\n");
}

const WebAudioTestAPI = {
  get VERSION() {
    return testapi.version;
  },
  get sampleRate() {
    return testapi.sampleRate;
  },
  dom,
  setBrowserVersions(spec) {
    testapi.setBrowserVersions(spec);
  },
  getBrowserVersions() {
    return testapi.getBrowserVersions();
  },
  use,
  unuse,
  /* DEPRECATED */
  getState,
  setState
};

Object.keys(WebAudioAPI.testAPI).forEach((key) => {
  WebAudioTestAPI[key] = WebAudioAPI.testAPI[key];
});

global.WebAudioTestAPI = WebAudioTestAPI;

module.exports = WebAudioTestAPI;
