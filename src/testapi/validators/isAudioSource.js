module.exports = {
  description: "AudioNode or an AudioParam",
  typeName: "AudioNode|AudioParam",
  test: (value) => value instanceof global.AudioNode || value instanceof global.AudioParam
};
