export default {
  name: "AudioNode|AudioParam",
  test: (value) => value instanceof global.AudioNode || value instanceof global.AudioParam
};
