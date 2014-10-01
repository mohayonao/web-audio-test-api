(function(global) {
  "use strict";

  var _ = require("./utils");

  /* istanbul ignore if */
  if (global.WEB_AUDIO_TEST_API_IGNORE) {
    return;
  }

  function ILLEGAL_CONSTRUCTOR(superCtor, shouldUse) {
    var err = "Illegal constructor";
    if (shouldUse) {
      err += ": should use ctx." + shouldUse;
    }
    function ctor() {
      throw new TypeError(err);
    }
    if (superCtor) {
      _.inherits(ctor, superCtor);
    }
    return ctor;
  }

  global.Event = ILLEGAL_CONSTRUCTOR();
  global.EventTarget = ILLEGAL_CONSTRUCTOR();

  global.OfflineAudioCompletionEvent = ILLEGAL_CONSTRUCTOR(Event);

  global.AudioNode = ILLEGAL_CONSTRUCTOR();

  var AudioNode = require("./AudioNode");

  global.AudioDestinationNode = ILLEGAL_CONSTRUCTOR(AudioNode);

  global.AudioParam = ILLEGAL_CONSTRUCTOR();

  global.GainNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createGain()"
  );

  global.DelayNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createDelay()"
  );

  global.AudioBuffer = ILLEGAL_CONSTRUCTOR(
    null, "createBuffer(numberOfChannels, length, sampleRate)"
  );

  global.AudioBufferSourceNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createBufferSource()"
  );

  global.MediaElementAudioSourceNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createMediaElementSource(mediaElement)"
  );

  global.AudioProcessingEvent = ILLEGAL_CONSTRUCTOR(Event);

  global.ScriptProcessorNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createScriptProcessor(bufferSize, numberOfInputChannels, numberOfOutputChannels)"
  );

  global.PannerNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createPanner()"
  );

  global.AudioListener = ILLEGAL_CONSTRUCTOR();

  global.ConvolverNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createConvolver()"
  );

  global.AnalyserNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createAnalyser()"
  );

  global.ChannelSplitterNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createChannelSplitter(numberOfOutputs)"
  );

  global.ChannelMergerNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createChannelMerger(numberOfInputs)"
  );

  global.DynamicsCompressorNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createDynamicsCompressor()"
  );

  global.BiquadFilterNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createBiquadFilter()"
  );

  global.WaveShaperNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createWaveShaper()"
  );

  global.OscillatorNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createOscillator()"
  );

  global.PeriodicWave = ILLEGAL_CONSTRUCTOR(
    null, "createPeriodicWave(real, imag)"
  );

  global.MediaStreamAudioSourceNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createMediaStreamSource(mediaStream)"
  );

  global.MediaStreamAudioDestinationNode = ILLEGAL_CONSTRUCTOR(
    AudioNode, "createMediaStreamDestination()"
  );

  global.AudioContext = require("./AudioContext");
  global.OfflineAudioContext = require("./OfflineAudioContext");

})(this.self || global);
