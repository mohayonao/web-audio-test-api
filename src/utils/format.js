module.exports = function format(text) {
  text = text.trim();
  text = text.replace(/\$a (\w)/g, (_, a) => {
    if (/[aiueo]/i.test(a)) {
      return "an " + a;
    }
    return "a " + a;
  });
  text = text.replace(/{{(\w+)}}/g, "$1");
  text = text.replace(/^ +/gm, "");
  return text;
};
