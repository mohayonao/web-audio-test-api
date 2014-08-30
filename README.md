# web-audio-mock
[![NPM Version](http://img.shields.io/npm/v/web-audio-mock.svg?style=flat)](https://www.npmjs.org/package/web-audio-mock)
[![Build Status](http://img.shields.io/travis/mohayonao/web-audio-mock.svg?style=flat)](https://travis-ci.org/mohayonao/web-audio-mock)
[![Coverage Status](http://img.shields.io/coveralls/mohayonao/web-audio-mock.svg?style=flat)](https://coveralls.io/r/mohayonao/web-audio-mock?branch=master)
[![Dependency Status](http://img.shields.io/david/mohayonao/web-audio-mock.svg?style=flat)](https://david-dm.org/mohayonao/web-audio-mock)
[![devDependency Status](http://img.shields.io/david/dev/mohayonao/web-audio-mock.svg?style=flat)](https://david-dm.org/mohayonao/web-audio-mock)

> Web Audio API mock library for node.js

## Installing

##### browser

  - [web-audio-mock](http://mohayonao.github.io/web-audio-mock/web-audio-mock.js)

```html
<script src="/path/to/web-audio-mock.js"></script>
```

##### node.js

```sh
% npm install web-audio-mock
```

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

  // ctx.DECODE_AUDIO_DATA_FAILED = true;

  ctx.decodeAudioData(buffer, function(e) {
    done();
  }, function() {
    // failed
  });

});
```

##### ScriptProcessing

```javascript
var ctx = new AudioContext();

it("ScriptProcessorNode#onaudioprocess", function(done) {
  var scp = ctx.createScriptProcessor(1024, 2, 2);
  var count = 0;

  scp.onaudioprocess = function(e) {
    count += 1;
    if (count === 5) {
      done();
    }
  };

  ctx.process(0.5); // process 0.5sec
});
```

## License

web-audio-mock is available under the The MIT License.
