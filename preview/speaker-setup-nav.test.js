"use strict";

// Guards speaker-setup prototype navigation (#582 / #583 / #584).
// Run with: `node preview/speaker-setup-nav.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const vm = require("vm");
const {
  renderPathNav,
  assertPathNavStructure,
  assertRendersOnce,
} = require("./nav-test-helpers");

const root = path.join(__dirname, "..");
const navScript = fs.readFileSync(path.join(__dirname, "speaker-setup-nav.js"), "utf8");

new vm.Script(navScript);
assert.ok(navScript.includes('home.href = "../preview/"'), "speaker setup nav links back to the preview shell");
assert.ok(navScript.includes("episode-flow.html"), "speaker setup nav links to the guided episode flow");
assert.ok(navScript.includes("source-media-health.html"), "speaker setup nav hands off to source media health");
assert.ok(navScript.includes('document.querySelector(".speaker-setup-nav")'), "speaker setup nav guards against double render");
assert.ok(navScript.includes('setAttribute("aria-current", "step")'), "speaker setup nav exposes aria-current on the step label");
assert.ok(!/innerHTML/.test(navScript), "speaker setup nav builds the DOM without innerHTML");

const setupScreens = [
  "speaker-attribution-review.html",
  "guest-profile-reuse.html",
  "speaker-visual-match.html",
  "speaker-eye-line-coherence.html",
];

for (const file of setupScreens) {
  const html = fs.readFileSync(path.join(root, "prototype", file), "utf8");
  assert.ok(html.includes("../preview/speaker-setup-nav.js"), `${file} loads speaker setup navigation`);
  assert.ok(!html.includes("../preview/tools-nav.js"), `${file} uses speaker setup nav instead of tools nav`);
  assert.ok(html.includes("data-setup-step="), `${file} declares its speaker setup step`);
}

const firstNav = renderPathNav({
  navScript,
  fileName: "speaker-attribution-review.html",
  datasetKey: "setupStep",
  datasetValue: "speaker-attribution-review",
});
assertPathNavStructure({
  nodes: firstNav.nodes,
  navClass: "speaker-setup-nav",
  position: "first",
  pathName: "speaker setup",
});

const middleNav = renderPathNav({
  navScript,
  fileName: "speaker-visual-match.html",
  datasetKey: "setupStep",
  datasetValue: "speaker-visual-match",
});
assertPathNavStructure({
  nodes: middleNav.nodes,
  navClass: "speaker-setup-nav",
  position: "middle",
  pathName: "speaker setup",
});

const lastNav = renderPathNav({
  navScript,
  fileName: "speaker-eye-line-coherence.html",
  datasetKey: "setupStep",
  datasetValue: "speaker-eye-line-coherence",
});
assertPathNavStructure({
  nodes: lastNav.nodes,
  navClass: "speaker-setup-nav",
  position: "last",
  pathName: "speaker setup",
});

assertRendersOnce({
  navScript,
  rendered: middleNav,
  navClass: "speaker-setup-nav",
  fileName: "speaker-visual-match.html",
  pathName: "speaker setup",
});

console.log("speaker setup nav: speaker-setup screens connected with creator-facing copy");
