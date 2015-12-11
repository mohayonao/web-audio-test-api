export default {
  "AnalyserNode#getFloatTimeDomainData": {
    states: [ "disabled", "enabled" ]
  },
  "AudioBuffer#copyToChannel": {
    states: [ "disabled", "enabled" ]
  },
  "AudioBuffer#copyFromChannel": {
    states: [ "disabled", "enabled" ]
  },
  "AudioContext#createAudioWorker": {
    states: [ "disabled", "enabled" ]
  },
  "AudioContext#createStereoPanner": {
    states: [ "disabled", "enabled" ]
  },
  "AudioContext#decodeAudioData": {
    states: [ "void", "promise" ]
  },
  "AudioContext#close": {
    states: [ "disabled", "enabled" ]
  },
  "AudioContext#suspend": {
    states: [ "disabled", "enabled" ]
  },
  "AudioContext#resume": {
    states: [ "disabled", "enabled" ]
  },
  "OfflineAudioContext#startRendering": {
    states: [ "void", "promise" ]
  },
  "AudioNode#disconnect": {
    states: [ "channel", "selective" ]
  }
};
