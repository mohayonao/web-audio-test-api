global.assert = require("power-assert");
global.sinon = require("sinon");
global.closeTo = (actual, expected, delta) => Math.abs(actual - expected) <= delta;
global.window = global;
global._ = require("lodash");

require("../../src");
