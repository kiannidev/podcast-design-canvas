"use strict";

// Guards publish prep prototype navigation (#583 / #584).
// Run with: `node preview/publish-nav.test.js`

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
const navScript = fs.readFileSync(path.join(__dirname, "publish-nav.js"), "utf8");

new vm.Script(navScript);
assert.ok(navScript.includes('home.href = "../preview/"'), "publish nav links back to the preview shell");
assert.ok(navScript.includes("episode-flow.html"), "publish nav links to the guided episode flow");
assert.ok(navScript.includes("show-notes-assembly.html"), "publish nav includes show notes assembly");
assert.ok(navScript.includes('document.querySelector(".publish-nav")'), "publish nav guards against double render");
assert.ok(navScript.includes('setAttribute("aria-current", "step")'), "publish nav exposes aria-current on the step label");
assert.ok(!/innerHTML/.test(navScript), "publish nav builds the DOM without innerHTML");

const publishScreens = [
  "episode-watch-through-preview.html",
  "destination-crop-preview.html",
  "thumbnail-cover-frame.html",
  "show-notes-assembly.html",
  "export-package-handoff.html",
  "publish-checklist.html",
];

for (const file of publishScreens) {
  const html = fs.readFileSync(path.join(root, "prototype", file), "utf8");
  assert.ok(html.includes("../preview/publish-nav.js"), `${file} loads publish navigation`);
  assert.ok(!html.includes("../preview/tools-nav.js"), `${file} uses publish nav instead of tools nav`);
  assert.ok(html.includes("data-publish-step="), `${file} declares its publish step`);
}

const firstNav = renderPathNav({
  navScript,
  fileName: "episode-watch-through-preview.html",
  datasetKey: "publishStep",
  datasetValue: "episode-watch-through-preview",
});
assertPathNavStructure({
  nodes: firstNav.nodes,
  navClass: "publish-nav",
  position: "first",
  pathName: "publish",
});

const middleNav = renderPathNav({
  navScript,
  fileName: "thumbnail-cover-frame.html",
  datasetKey: "publishStep",
  datasetValue: "thumbnail-cover-frame",
});
assertPathNavStructure({
  nodes: middleNav.nodes,
  navClass: "publish-nav",
  position: "middle",
  pathName: "publish",
});

const lastNav = renderPathNav({
  navScript,
  fileName: "publish-checklist.html",
  datasetKey: "publishStep",
  datasetValue: "publish-checklist",
});
assertPathNavStructure({
  nodes: lastNav.nodes,
  navClass: "publish-nav",
  position: "last",
  pathName: "publish",
});

assertRendersOnce({
  navScript,
  rendered: middleNav,
  navClass: "publish-nav",
  fileName: "export-package-handoff.html",
  pathName: "publish",
});

console.log("publish nav: publish prep screens connected with creator-facing copy");
