export default {
  description: "integer",
  typeName: "number",
  test: (value) => value === (value|0)
};
