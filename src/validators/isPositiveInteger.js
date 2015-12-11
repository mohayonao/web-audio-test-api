export default {
  name: "positive integer",
  test: (value) => value === (value|0) && 0 <= value
};
