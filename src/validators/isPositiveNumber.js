export default {
  name: "positive number",
  test: (value) => value === +value && 0 <= value,
};
