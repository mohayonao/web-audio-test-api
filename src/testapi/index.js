const methods = require("./decorators/methods");
const props = require("./decorators/props");
const versions = require("./decorators/versions");
const validators = require("./validators");

const api = { methods, props, versions };

Object.keys(validators).forEach((key) => {
  api[key] = validators[key];
});

module.exports = api;
