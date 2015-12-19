const WebAudioAPI = require("./WebAudioAPI");
const versions = require("./testapi/decorators/versions");
const testapi = require("./testapi");
const utils = require("./utils");
const dom = require("./dom");

const recentTargetVersions = { chrome: 47, firefox: 42, safari: 9 };

versions.targetVersions = recentTargetVersions;

function setTargetVersions(spec) {
  switch (spec) {
  case Infinity:
    versions.targetVersions = { chrome: Infinity, firefox: Infinity, safari: Infinity };
    break;
  case 0:
    versions.targetVersions = { chrome: 0, firefox: 0, safari: 0 };
    break;
  case "recent":
    versions.targetVersions = recentTargetVersions;
    break;
  default:
    const targetVersions = {};

    Object.keys(recentTargetVersions).forEach((key) => {
      let version = spec[key];

      if (version === "recent") {
        version = recentTargetVersions[key];
      }

      targetVersions[key] = +version;
    });

    versions.targetVersions = targetVersions;
  }
}

function getTargetVersions() {
  return versions.targetVersions;
}

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

    \tThis API is removed. Please use WebAudioTestAPI.setTargetVersions();
  `) + "\n");
}

function setState() {
  throw new Error(utils.format(`
    Failed to execute 'setState' on 'WebAudioTestAPI'

    \tThis API is removed. Please use WebAudioTestAPI.getTargetVersions();
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
  setTargetVersions,
  getTargetVersions,
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
