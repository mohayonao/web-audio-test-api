export default class Immigration {
  constructor() {
    this._admissions = [];
  }

  apply(fn) {
    let admission1 = { token: {}, count: 0 };

    this._admissions.push(admission1);

    let result = fn(admission1.token);

    let admission2 = this._admissions.pop();

    if (admission1 !== admission2 || admission2.count !== 1) {
      throw new Error("invalid admission");
    }

    return result;
  }

  check(token, errorCallback) {
    let lastAdmission = this._admissions.pop();

    if (!lastAdmission || lastAdmission.token !== token || lastAdmission.count++ !== 0) {
      errorCallback();
    }

    this._admissions.push(lastAdmission);
  }
}
