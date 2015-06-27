import Formatter from "./Formatter";

export default class Inspector {
  constructor(instance) {
    this.instance = instance;
  }

  describe(methodName, args, callback) {
    if (typeof args === "function") {
      [ args, callback ] = [ null, args ];
    }

    let formatter = new Formatter(this.instance, methodName, args);
    let _this = this;

    function assert(test, callback) {
      if (test) {
        return;
      }

      callback.call(_this.instance, formatter);
    }

    assert.throwReadOnlyTypeError = () => {
      throw new TypeError(formatter.plain `
        ${formatter.form};
        attempt to write a readonly property: "${methodName}"
      `);
    };

    callback.call(this.instance, assert);
  }
}
