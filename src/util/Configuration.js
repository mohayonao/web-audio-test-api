import api from "./api.json";

export default class Configuration {
  constructor() {
    this._states = {};
    Object.keys(api).forEach((key) => {
      this._states[key] = api[key].states[0];
    });
  }

  getState(name) {
    if (!this._states.hasOwnProperty(name)) {
      throw new TypeError(`invalid state name ${name}`);
    }
    return this._states[name];
  }

  setState(name, value) {
    if (name && typeof name === "object") {
      let dict = name;

      Object.keys(dict).forEach((name) => {
        this.setState(name, dict[name]);
      });
      return;
    }
    if (!this._states.hasOwnProperty(name)) {
      throw new TypeError(`invalid state name ${name}`);
    }
    if (api[name].states.indexOf(value) === -1) {
      throw new TypeError(`invalid state value ${value} on ${name}`);
    }
    this._states[name] = value;
  }
}
