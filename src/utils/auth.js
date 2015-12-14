const tokens = [];

function request(fn) {
  const token1 = { token: {}, count: 0 };

  tokens.push(token1);

  const result = fn(token1.token);

  const token2 = tokens.pop();

  if (token1 !== token2 || token2.count !== 1) {
    throw new Error("Invalid token ??");
  }

  return result;
}

function grant(token, errorCallback) {
  const lastToken = tokens.pop();

  if (!lastToken || lastToken.token !== token || lastToken.count++ !== 0) {
    errorCallback();
  }

  tokens.push(lastToken);
}

export default { request, grant };
