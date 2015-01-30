"use strict";

var _ = {};

_.VERSION = "0.1.16";
_.SAMPLERATE  = 44100;
_.BUFFER_SIZE = 128;
_.CURRENT_TIME_INCR = _.BUFFER_SIZE / _.SAMPLERATE;
_.NOP = /* istanbul ignore next */ function() {};

_.inherits = require("./inherits");

_.format = require("./format");

_.defaults = require("./defaults");

_.article = require("./article");

_.check = require("./check");

_.toS = require("./toS");

_.id = require("./id");

_.caption = require("./caption");

_.jsonCircularCheck = require("./jsonCircularCheck");

_.$read = require("./read");

_.$type = require("./type");

_.$enum = require("./enum");

_.typeCheck = require("./typeCheck");

_.formatter = require("./formatter");

module.exports = _;
