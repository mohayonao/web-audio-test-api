export default function caniuse(expected, actual) {
  return Object.keys(expected).every((key) => test(expected[key], actual[key]));
}

function test(expected, actual) {
  if (actual === Infinity) {
    return true;
  }

  const matches = /^(\d+)?-(\d+)?$/.exec(expected);

  if (matches === null) {
    return false;
  }

  if (matches[1] && matches[2]) {
    return +matches[1] <= actual && actual <= +matches[2];
  }

  if (matches[1]) {
    return +matches[1] <= actual;
  }

  if (matches[2]) {
    return actual <= +matches[2];
  }

  return false;
}
