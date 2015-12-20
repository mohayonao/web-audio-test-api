const methods = require("./decorators/methods");
const props = require("./decorators/props");
const versions = require("./decorators/versions");
const validators = require("./validators");
const browserVersions = require("./browserVersions");
const caniuse = require("./caniuse");
const sampleRate = require("./sampleRate");
const version = require("./version");

const api = { version, methods, props, versions, caniuse, sampleRate };

Object.keys(browserVersions).forEach((key) => {
  api[key] = browserVersions[key];
});

Object.keys(validators).forEach((key) => {
  api[key] = validators[key];
});

module.exports = api;
