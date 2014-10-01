"use strict";

var _ = {};

_.VERSION = "0.1.11";
_.SAMPLERATE  = 44100;
_.BUFFER_SIZE = 128;
_.CURRENT_TIME_INCR = _.BUFFER_SIZE / _.SAMPLERATE;


_.inherits = function(ctor, superCtor) {
  ctor.prototype = Object.create(superCtor.prototype, {
    constructor: { value: ctor, enumerable: false, writable: true, configurable: true }
  });
};

_.format = function(fmt, dict) {
  var msg = fmt;

  Object.keys(dict).forEach(function(key) {
    msg = msg.replace(new RegExp("#\\{" + key + "\\}", "g"), dict[key]);
  });

  return msg;
};

_.defaults = function(value, defaultValue) {
  return typeof value !== "undefined" ? value : defaultValue;
};

_.article = function(str) {
  return (/[aeiou]/i.test(str.charAt(0)) ? "an " : "a ") + str;
};

_.check = function(caption, spec) {
  Object.keys(spec).forEach(function(argName) {
    var type = spec[argName].type;
    var given = spec[argName].given;

    if (!_.check[type](given)) {
      throw new TypeError(_.format(
        "#{caption}: '#{name}' should be #{type}, but got #{given}", {
          caption: caption,
          name   : argName,
          type   : _.article(type),
          given  : _.toS(given)
        }
      ));
    }
  });
};
_.check.number = function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
};
_.check.function = function isNumber(value) {
  return typeof value === "function";
};
_.check.ArrayBuffer = function(value) {
  return value instanceof ArrayBuffer;
};
_.check.Uint8Array = function isUint8Array(value) {
  return value instanceof Uint8Array;
};
_.check.Float32Array = function isFloat32Array(value) {
  return value instanceof Float32Array;
};
_.check.PeriodicWave = function(value) {
  return value instanceof PeriodicWave;
};

_.toS = function(value) {
  var type = typeof value;

  if (type === "string") {
    return "'" + value + "'";
  }
  if (type === "function") {
    return "function";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  if (!value || type === "number" || type === "boolean") {
    return String(value);
  }
  if (value.constructor && value.constructor.name) {
    return value.constructor.name;
  }

  return Object.prototype.toString.call(value).slice(8, -1);
};

_.id = function(obj, wrapping) {
  if (obj.hasOwnProperty("$id")) {
    if (wrapping) {
      return "(" + obj.name + "#" + obj.$id + ")";
    }
    return obj.name + "#" + obj.$id;
  }
  return obj.name;
};

_.caption = function(obj, method) {
  return _.format(
    "#{object}##{method}", {
      object: _.id(obj, true),
      method: method
    }
  );
};

_.jsonCircularCheck = function(node, func, memo) {
  if (memo.indexOf(node) !== -1) {
    return "<circular:" + _.id(node) + ">";
  }
  memo.push(node);

  var result = func.call(node, memo);

  memo.pop();

  return result;
};

_.$read = function(obj, name, value) {
  Object.defineProperty(obj, name, {
    get: typeof value === "function" ? value : function() {
      return value;
    },
    set: function() {
      throw new Error(_.format(
        "#{object}##{property} is readonly", {
          object  : _.id(obj, true),
          property: name
        }
      ));
    },
    enumerable: true
  });
};

_.$type = function(obj, name, type, value) {
  var _value;
  Object.defineProperty(obj, name, {
    get: function() {
      return _value;
    },
    set: function(newValue) {
      var err = false;

      if (typeof type === "string") {
        if (typeof newValue !== type) {
          err = true;
        }
      } else if (newValue !== null && !(newValue instanceof type)) {
        err = true;
        type = type.constructor.name;
      }

      if (err) {
        throw new TypeError(_.format(
          "#{object}##{property} should be #{type}, but got #{given}", {
            object  : _.id(obj, true),
            property: name,
            type    : _.article(type),
            given   : _.toS(newValue)
          }
        ));
      }

      _value = newValue;
    },
    enumerable: true
  });
  if (typeof value === "undefined") {
    value = null;
  }
  obj[name] = value;
};

_.$enum = function(obj, name, list, value) {
  var _value;
  var strList = "[ " + list.join(", ") + " ]";
  Object.defineProperty(obj, name, {
    get: function() {
      return _value;
    },
    set: function(newValue) {
      if (list.indexOf(newValue) === -1) {
        throw new TypeError(_.format(
          "#{object}##{property} should be any #{list}, but got #{given}", {
            object  : _.id(obj, true),
            property: name,
            list    : strList,
            given   : _.toS(newValue)
          }
        ));
      }
      _value = newValue;
    },
    enumerable: true
  });
  obj[name] = value;
};

_.NOP = /* istanbul ignore next */ function() {};

module.exports = _;
