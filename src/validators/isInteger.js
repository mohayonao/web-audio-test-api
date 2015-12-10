export default {
  name: "integer",
  test: (value) => value === (value|0),
};
