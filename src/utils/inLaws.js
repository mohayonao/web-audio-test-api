module.exports = function inLaws(superClass) {
  function ctor() {
  }

  ctor.prototype = Object.create(superClass.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true }
  });

  return ctor;
};
