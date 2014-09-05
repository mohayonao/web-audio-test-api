# web-audio-mock.js
[![NPM Version](http://img.shields.io/npm/v/web-audio-mock.svg?style=flat)](https://www.npmjs.org/package/web-audio-mock)
[![Build Status](http://img.shields.io/travis/mohayonao/web-audio-mock.svg?style=flat)](https://travis-ci.org/mohayonao/web-audio-mock)
[![Coverage Status](http://img.shields.io/coveralls/mohayonao/web-audio-mock.svg?style=flat)](https://coveralls.io/r/mohayonao/web-audio-mock?branch=master)
[![Dependency Status](http://img.shields.io/david/mohayonao/web-audio-mock.svg?style=flat)](https://david-dm.org/mohayonao/web-audio-mock)
[![devDependency Status](http://img.shields.io/david/dev/mohayonao/web-audio-mock.svg?style=flat)](https://david-dm.org/mohayonao/web-audio-mock)

> Web Audio API mock object library for CI

## Installation

  - [web-audio-mock.js](http://mohayonao.github.io/web-audio-mock/web-audio-mock.js)

#### browser

replace existing Web Audio API with web-audio-mock

```html
<script src="/path/to/web-audio-mock.js"></script>
```

set `WEB_AUDIO_MOCK_IGNORE` flag if you won't use web-audio-mock
```html
WEB_AUDIO_MOCK_IGNORE = true;
<script src="/path/to/web-audio-mock.js"></script>
```

#### node.js

```sh
% npm install web-audio-mock
```

install Web Audio API interfaces as global variables

```javascript
require("web-audio-mock");
```

## Online Test Suites

  - [web-audio-mock.js - online test suites](http://mohayonao.github.io/web-audio-mock/)

## Features

#### Strict type check more than original Web Audio API

```javascript
describe("Strict Type Check", function() {
  var ctx = new AudioContext();
  var osc = ctx.createOsillator();

  it("throw error if uses wrong", function() {
    expect(function() {
      osc.frequency = 880;
    }, "uses wrong").to.throw(Error, "OscillatorNode#frequency is readonly");
    expect(function() {
      osc.frequency.value = 880;
    }, "uses correctly").to.not.throw();
  });

  it("throw error if receives an invalid value", function() {
    expect(function() {
      osc.type = 2;
    }).to.throw(Error,
      "OscillatorNode#type should be any [ sine, square, sawtooth, triangle, custom ], but got 2"
    );
  });

});
```

#### Convert to JSON from modular routing

```javascript
describe("Modular Routine", function() {
  var ctx = new AudioContext();
  var osc = ctx.createOscillator();
  var lfo = ctx.createOscillator();
  var amp = ctx.createGain();

  lfo.$id = "LFO"; // name for debugging

  osc.type = "sawtooth";
  osc.frequency.value = 880;

  lfo.frequency.value = 2;

  lfo.connect(amp.gain);
  osc.connect(amp);
  amp.connect(ctx.destination);

  it("should generate audio graph", function() {

    // ctx.VERBOSE_JSON = true; // set this flag if you need more detailed data

    expect(ctx.toJSON()).to.eql({
      name: "AudioDestinationNode"          // +------------------+
      inputs: [                             // | OscillatorNode   |
        {                                   // | - type: sawtooth |
          name: "GainNode",                 // | - frequency: 220 |
          gain: {                           // | - detune: 0      |
            value: 1,                       // +------------------+
            inputs: [                       //   |
              {                             // +-----------+  +--------------------+
                name: "OscillatorNode#LFO", // | GainNode  |  | OscillatorNode#LFO |
                type: "sine",               // | - gain: 1 |--| - frequency: 2     |
                frequency: {                // +-----------+  | - detune: 0        |
                  value: 2,                 //   |            +--------------------+
                  inputs: []                //   |
                },                          // +----------------------+
                detune: {                   // | AudioDestinationNode |
                  value: 0,                 // +----------------------+
                  inputs: []
                },
                inputs: []
              }
            ]
          },
          inputs: [
            {
              name: "OscillatorNode",
              type: "sawtooth",
              frequency: {
                value: 880,
                inputs: []
              },
              detune: {
                value: 0,
                inputs: []
              },
              inputs: []
            }
          ]
        }
      ]
    });
  });

});
```

#### AudioParam simulation

```javascript
var ctx = new AudioContext();

describe("AudioParam", function() {
  var osc = ctx.createOsillator();

  osc.frequency.setValueAtTime(880, ctx.currentTime + 0.5);
  osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 1);

  it("should have been scheduled the value change", function() {
    expect(osc.frequency.value, "00:00.000").to.equal(440);
    ctx.$process(0.25); // advance 0.25 sec
    expect(osc.frequency.value, "00:00.250").to.equal(440);
    ctx.$process(0.25);
    expect(osc.frequency.value, "00:00.500").to.equal(880); // <- setValueAtTime
    ctx.$process(0.25);                                     //  ^
    expect(osc.frequency.value, "00:00.750").to.equal(770); //  |
    ctx.$process(0.25);                                     //  |
    expect(osc.frequency.value, "00:01.000").to.equal(660); //  | linearRampToValueAtTime
    ctx.$process(0.25);                                     //  |
    expect(osc.frequency.value, "00:01.250").to.equal(550); //  |
    ctx.$process(0.25);                                     //  v
    expect(osc.frequency.value, "00:01.500").to.equal(440); //
    ctx.$process(0.25);
    expect(osc.frequency.value, "00:01.750").to.equal(440);
  });

});
```

#### ScriptProcessing simulation

```javascript
var ctx = new AudioContext();

describe("ScriptProcessorNode#onaudioprocess(e)", function() {
  var scp = ctx.createScriptProcessor(1024, 2, 2);

  it("should have been called", function() {
    var count = 0;

    scp.onaudioprocess = function(e) {
      count += 1;
    };

    ctx.$process(0.5);           // advance 0.5 sec
    expect(count).to.equal(22); // 22times call (0.5 / (1024 / 44100) = 21.5332)
  });

});
```

#### DecodeAudioData simulation

```javascript
var ctx = new AudioContext();

describe("AudioContext#decodeAudioData()", function() {
  it("should return decoded buffer in async", function(done) {

    // ctx.DECODE_AUDIO_DATA_RESULT = customResult;
    // ctx.DECODE_AUDIO_DATA_FAILED = true;

    ctx.decodeAudioData(audioData, function(result) {
      // successCallback
      expect(result).to.be.instanceOf(AudioBuffer);
      done();
    }, function() {
      // errorCallback
      throw new ERROR("NOT REACHED");
    });

  });
});
```

## License

web-audio-mock.js is available under the The MIT License.
