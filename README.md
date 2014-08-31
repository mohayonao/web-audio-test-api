# web-audio-mock.js
[![NPM Version](http://img.shields.io/npm/v/web-audio-mock.svg?style=flat)](https://www.npmjs.org/package/web-audio-mock)
[![Build Status](http://img.shields.io/travis/mohayonao/web-audio-mock.svg?style=flat)](https://travis-ci.org/mohayonao/web-audio-mock)
[![Coverage Status](http://img.shields.io/coveralls/mohayonao/web-audio-mock.svg?style=flat)](https://coveralls.io/r/mohayonao/web-audio-mock?branch=master)
[![Dependency Status](http://img.shields.io/david/mohayonao/web-audio-mock.svg?style=flat)](https://david-dm.org/mohayonao/web-audio-mock)
[![devDependency Status](http://img.shields.io/david/dev/mohayonao/web-audio-mock.svg?style=flat)](https://david-dm.org/mohayonao/web-audio-mock)

> Web Audio API mock library for node.js

## Installation

##### browser

  - [web-audio-mock.js](http://mohayonao.github.io/web-audio-mock/web-audio-mock.js)

```html
<script src="/path/to/web-audio-mock.js"></script>
```

##### node.js

```sh
% npm install web-audio-mock
```

## Online Test Suites

  - [web-audio-mock.js - online test suites](http://mohayonao.github.io/web-audio-mock/)

## Usage

##### Module Routing

```javascript
require("web-audio-mock");

var ctx = new AudioContext();
var osc = ctx.createOscillator();
var amp = ctx.createGain();

osc.type = "sawtooth";
osc.frequency.value = 220;

osc.connect(amp);
amp.connect(ctx.destination);

// ctx.VERBOSE_JSON = true;

ctx.toJSON();

{
  "name": "AudioDestinationNode",
  "inputs": [
    {
      "name": "GainNode",
      "gain": {
        "value": 1,
        "inputs": []
      },
      "inputs": [
        {
          "name": "OscillatorNode",
          "type": "sawtooth",
          "frequency": {
            "value": 220,
            "inputs": []
          },
          "detune": {
            "value": 0,
            "inputs": []
          },
          "inputs": []
        }
      ]
    }
  ]
}
```

##### DecodeAudioData

```javascript
var ctx = new AudioContext();

it("AudioContext#decodeAudioData", function(done) {

  // ctx.DECIDE_AUDIO_DATA_RESULT = customResult;
  // ctx.DECODE_AUDIO_DATA_FAILED = true;

  ctx.decodeAudioData(buffer, function(result) {
    // successCallback
    expect(result).to.be.instanceOf(AudioBuffer);
    done();
  }, function() {
    // errorCallback
  });

});
```

##### AudioParam

```javascript
var ctx = new AudioContext();

it("AudioParam", function() {
  var osc = ctx.createOsillator();

  osc.frequency.setValueAtTime(880, ctx.currentTime + 0.5);

  expect(osc.frequency.value).to.equal(440);
  ctx.process(0.25); // advance processing: 0.25sec
  expect(osc.frequency.value).to.equal(440);
  ctx.process(0.25);
  expect(osc.frequency.value).to.equal(880);

  osc.frequency.linearRampToValueAtTime(440, ctx.currentTime + 1);

  ctx.process(0.25);
  expect(osc.frequency.value).to.equal(770);
  ctx.process(0.25);
  expect(osc.frequency.value).to.equal(660);
  ctx.process(0.25);
  expect(osc.frequency.value).to.equal(550);
  ctx.process(0.25);
  expect(osc.frequency.value).to.equal(440);
  ctx.process(0.25);
  expect(osc.frequency.value).to.equal(440);
});
```

##### ScriptProcessing

```javascript
var ctx = new AudioContext();

it("ScriptProcessorNode#onaudioprocess", function() {
  var scp = ctx.createScriptProcessor(1024, 2, 2);
  var count = 0;

  scp.onaudioprocess = function(e) {
    count += 1;
  };

  ctx.process(0.5); // advance processing: 0.5sec
  expect(count).to.equal(22); // 22times call (0.5 / (1024 / 44100) = 21.5332)
});
```

## License

web-audio-mock.js is available under the The MIT License.
