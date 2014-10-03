"use strict";

global.chai   = require("chai");
global.expect = global.chai.expect;
global.window = global;

global.WEB_AUDIO_TEST_API_VERSION = require("../../package").version;

require("../../");
