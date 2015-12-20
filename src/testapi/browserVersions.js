const versions = require("./decorators/versions");

function getRecentBrowserVersions() {
  return { chrome: 47, firefox: 42, safari: 9 };
}

function setBrowserVersions(spec) {
  switch (spec) {
  case Infinity:
    versions.browserVersions = { chrome: Infinity, firefox: Infinity, safari: Infinity };
    break;
  case 0:
    versions.browserVersions = { chrome: 0, firefox: 0, safari: 0 };
    break;
  case "recent":
    versions.browserVersions = getRecentBrowserVersions();
    break;
  default:
    const recentbrowserVersions = getRecentBrowserVersions();
    const browserVersions = {};

    Object.keys(recentbrowserVersions).forEach((key) => {
      let version = spec[key];

      if (version === "recent") {
        version = recentbrowserVersions[key];
      }

      browserVersions[key] = +version;
    });

    versions.browserVersions = browserVersions;
  }
}

function getBrowserVersions() {
  return versions.browserVersions;
}

versions.browserVersions = getRecentBrowserVersions();

module.exports = { setBrowserVersions, getBrowserVersions };
