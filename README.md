# web-audio-test-api
[![Build Status](http://img.shields.io/travis/mohayonao/web-audio-test-api.svg?style=flat-square)](https://travis-ci.org/mohayonao/web-audio-test-api)
[![NPM Version](http://img.shields.io/npm/v/web-audio-test-api.svg?style=flat-square)](https://www.npmjs.org/package/web-audio-test-api)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

> Web Audio API test library for CI

## Installation

### node.js

```
$ npm install --save-dev web-audio-test-api
```

Install Web Audio API interfaces to global scope

```javascript
import "web-audio-test-api";
```

### browser

- [web-audio-test-api.js](http://mohayonao.github.io/web-audio-test-api/build/web-audio-test-api.js)

Replace existing Web Audio API with web-audio-test-api

```html
<script src="/path/to/web-audio-test-api.js"></script>
```

if you won't use web-audio-test-api

```javascript
WebAudioTestAPI.unuse();
```

## Online Test Suite

  - [web-audio-test-api.js - online test suite](http://mohayonao.github.io/web-audio-test-api/)

## Documents

  - [Web Audio API Specification](http://www.w3.org/TR/webaudio/)
  - [Test API Reference](https://github.com/mohayonao/web-audio-test-api/wiki)

## Features

- Strict type check more than original Web Audio API

```javascript
var audioContext = new AudioContext();
var osc = audioContext.createOsillator();

// correct
osc.frequency.value = 880;

// wrong
assert.throws(function() {
  osc.frequency = 880;
}, function(e) {
  return e instanceof TypeError &&
    e.message === "OscillatorNode#frequency is readonly";
});

assert.throws(function() {
  osc.type = 2;
}, function(e) {
  return e instanceof TypeError &&
    e.message === "OscillatorNode#type should be an enum { sine, square, sawtooth, triangle }, but got: 2";
});
});
```

- Convert to JSON from audio graph

```javascript
var audioContext = new AudioContext();
var osc = audioContext.createOscillator();
var lfo = audioContext.createOscillator();
var amp = audioContext.createGain();

lfo.$id = "LFO"; // name for debugging

osc.type = "sawtooth";
osc.frequency.value = 880;

lfo.frequency.value = 2;

lfo.connect(amp.gain);
osc.connect(amp);
amp.connect(audioContext.destination);

assert.deepEqual(audioContext.toJSON(), {
  name: "AudioDestinationNode"            // +------------------+
  inputs: [                               // | OscillatorNode   |
    {                                     // | - type: sawtooth |
      name: "GainNode",                   // | - frequency: 220 |
      gain: {                             // | - detune: 0      |
        value: 1,                         // +------------------+
        inputs: [                         //   |
          {                               // +-----------+  +--------------------+
            name: "OscillatorNode#LFO",   // | GainNode  |  | OscillatorNode#LFO |
            type: "sine",                 // | - gain: 1 |--| - frequency: 2     |
            frequency: {                  // +-----------+  | - detune: 0        |
              value: 2,                   //   |            +--------------------+
              inputs: []                  //   |
            },                            // +----------------------+
            detune: {                     // | AudioDestinationNode |
              value: 0,                   // +----------------------+
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
```

- OscillatorNode/BufferSourceNode state

```javascript
var audioContext = new AudioContext();
var node = audioContext.createOscillator();

assert(node.$state === "UNSCHEDULED");

node.start(0.100);
node.stop(0.150);
node.connect(audioContext.destination);

audioContext.$processTo("00:00.000");
assert(node.$state === "SCHEDULED", "00:00.000");

audioContext.$processTo("00:00.099");
assert(node.$state === "SCHEDULED", "00:00.099");

audioContext.$processTo("00:00.100");
assert(node.$state === "PLAYING", "00:00.100");

audioContext.$processTo("00:00.149");
assert(node.$state === "PLAYING", "00:00.149");

audioContext.$processTo("00:00.150");
assert(node.$state === "FINISHED", "00:00.150");

// other way
assert(node.$stateAtTime("00:00.000") === "SCHEDULED");
assert(node.$stateAtTime("00:00.099") === "SCHEDULED");
assert(node.$stateAtTime("00:00.100") === "PLAYING");
assert(node.$stateAtTime("00:00.149") === "PLAYING");
assert(node.$stateAtTime("00:00.150") === "FINISHED");
```

- AudioParam simulation

```javascript
var audioContext = new AudioContext();
var node = audioContext.createOscillator();

node.frequency.setValueAtTime(880, 0.500);
node.frequency.linearRampToValueAtTime(440, 1.500);
node.connect(audioContext.destination);

audioContext.$processTo("00:00.000");
assert(node.frequency.value === 440, "00:00.000");

audioContext.$processTo("00:00.250");
assert(node.frequency.value === 440, "00:00.250");

audioContext.$processTo("00:00.500");
assert(node.frequency.value === 880, "00:00.500"); // <- setValueAtTime
                                                   //  ^
audioContext.$processTo("00:00.750");              //  |
assert(node.frequency.value === 770, "00:00.750"); //  |
                                                   //  |
audioContext.$processTo("00:01.000");              //  |
assert(node.frequency.value === 660, "00:01.000"); //  | linearRampToValueAtTime
                                                   //  |
audioContext.$processTo("00:01.250");              //  |
assert(node.frequency.value === 550, "00:01.250"); //  |
                                                   //  |
audioContext.$processTo("00:01.500");              //  v
assert(node.frequency.value === 440, "00:01.500"); //

audioContext.$processTo("00:01.750");
assert(node.frequency.value === 440, "00:01.750");

// other way
assert(node.frequency.$valueAtTime("00:00.000" === 440);
assert(node.frequency.$valueAtTime("00:00.250" === 440);
assert(node.frequency.$valueAtTime("00:00.500" === 880); // <- setValueAtTime
assert(node.frequency.$valueAtTime("00:00.750" === 770); //  ^
assert(node.frequency.$valueAtTime("00:01.000" === 660); //  | linearRampToValueAtTime
assert(node.frequency.$valueAtTime("00:01.250" === 550); //  v
assert(node.frequency.$valueAtTime("00:01.500" === 440); //
assert(node.frequency.$valueAtTime("00:01.750" === 440);
```

- ScriptProcessing simulation

```javascript
var audioContext = new AudioContext();
var node = audioContext.createScriptProcessor(1024, 2, 2);

node.onaudioprocess = sinon.spy();
node.connect(audioContext.destination);

audioContext.$processTo("00:00.500");
assert(node.onaudioprocess.callCount === 22);
// 22times call (0.5 / (1024 / 44100) = 21.5332)
```

- DecodeAudioData simulation

```javascript
var audioContext = new AudioContext();

// audioContext.DECODE_AUDIO_DATA_RESULT = customResult;
// audioContext.DECODE_AUDIO_DATA_FAILED = true;

audioContext.decodeAudioData(audioData, function(result) {
  // successCallback
  assert(result instanceof AudioBuffer);
}, function() {
  // errorCallback
  throw new ERROR("NOT REACHED");
});
```

- New API support

```javascript
WebAudioTestAPI.setState({
  "AudioContext#createStereoPanner": "enabled",
});

var audioContext = new AudioContext();

var node = audioContext.createStereoPanner();

console.log(WebAudioTestAPI.getState("AudioContext#createStereoPanner")); // "enabled"
```

| API Name                              | states                       |
|---------------------------------------|------------------------------|
| `AnalyserNode#getFloatTimeDomainData` | "enabled" or **"disabled"**  |
| `AudioBuffer#copyToChannel`           | "enabled" or **"disabled"**  |
| `AudioBuffer#copyFromChannel`         | "enabled" or **"disabled"**  |
| `AudioContext#createAudioWorker`      | **"disabled"**               |
| `AudioContext#createStereoPanner`     | "enabled" or **"disabled"**  |
| `AudioContext#close`                  | "enabled" or **"disabled"**  |
| `AudioContext#suspend`                | "enabled" or **"disabled"**  |
| `AudioContext#resume`                 | "enabled" or **"disabled"**  |
| `AudioContext#decodeAudioData`        | "promise" or **"void"**      |
| `OfflineAudioContext#startRendering`  | "promise" or **"void"**      |
| `AudioNode#disconnect`                | "selective" or **"channel"** |

## License

web-audio-test-api.js is available under the The MIT License.
