import utils from "./";

function getFunctionDeclaration(fn) {
  return /^function (\w+\([^)]*\))/.exec(fn.toString())[1];
}

export default class Formatter {
  constructor(instance, methodName, args) {
    this.instance = instance;
    this.methodName = methodName;
    this.args = args;
  }

  get form() {
    let result = this.instance.constructor.name;

    if (this.methodName === "constructor") {
      if (this.args) {
        result = `new ${result}(${this.args.join(", ")})`;
      } else {
        result = "new " + getFunctionDeclaration(this.instance.constructor);
      }
    } else if (this.methodName) {
      if (this.args) {
        result += `#${this.methodName}(${this.args.join(", ")})`;
      } else {
        let descriptor = Object.getOwnPropertyDescriptor(this.instance, this.methodName)
          || Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this.instance), this.methodName);

        if (descriptor && typeof descriptor.value === "function") {
          result += "#" + getFunctionDeclaration(descriptor.value);
        }
      }
    }

    return result;
  }

  plain(strings, ...values) {
    let msg = strings[0];

    for (let i = 0; i < values.length; i++) {
      msg += values[i] + strings[i + 1];
    }

    return msg.trim().replace(/\s+/g, " ");
  }

  butGot(value, name, type) {
    return `"${name}" should be ${utils.article(type)} ${type}, but got: ${utils.prettyPrint(value)}`;
  }
}
