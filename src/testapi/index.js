import * as methods from "../decorators/methods";
import * as props from "../decorators/props";
import versions from "../decorators/versions";
import * as validators from "../validators";

const api = { methods, props, versions };

Object.keys(validators).forEach((key) => {
  api[key] = validators[key];
});

export default api;
