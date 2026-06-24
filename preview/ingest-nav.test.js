"use strict";

// Smoke tests for ingest prototype navigation (#582 / #584).
// Run with: `node preview/ingest-nav.test.js`

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
const navPath = path.join(__dirname, "ingest-nav.js");
const navSource = fs.readFileSync(navPath, "utf8");

new vm.Script(navSource);
assert.ok(navSource.includes('home.href = "../preview/"'), "ingest nav links back to the preview shell");
assert.ok(navSource.includes("episode-flow.html"), "ingest nav links to the guided episode flow");
assert.ok(navSource.includes("source-media-health.html"), "ingest nav hands off to source media health");
assert.ok(navSource.includes('document.querySelector(".ingest-nav")'), "ingest nav guards against double render");
assert.ok(!/innerHTML/.test(navSource), "ingest nav builds the DOM without innerHTML");

const ingestScreens = [
  "episode-readiness.html",
  "speaker-role-mapping.html",
  "social-context-intake.html",
];

const forbidden = [
  /which surface owns/i,
  /owning surface/i,
  /opens the surface/i,
  /surface that owns/i,
  /\bpipeline\b/i,
];

for (const file of ingestScreens) {
  const html = fs.readFileSync(path.join(root, "prototype", file), "utf8");
  assert.ok(html.includes("../preview/ingest-nav.js"), `${file} loads ingest navigation`);
  assert.ok(!html.includes("../preview/tools-nav.js"), `${file} uses ingest nav instead of tools nav`);
  assert.ok(html.includes("data-ingest-step="), `${file} declares its ingest step`);

  for (const pattern of forbidden) {
    const match = html.match(pattern);
    assert.ok(!match, `${file} must not include internal copy: ${match && match[0]}`);
  }
}

const firstNav = renderPathNav({
  navScript: navSource,
  fileName: "episode-readiness.html",
  datasetKey: "ingestStep",
  datasetValue: "episode-readiness",
});
assertPathNavStructure({
  nodes: firstNav.nodes,
  navClass: "ingest-nav",
  position: "first",
  pathName: "ingest",
});

const middleNav = renderPathNav({
  navScript: navSource,
  fileName: "speaker-role-mapping.html",
  datasetKey: "ingestStep",
  datasetValue: "speaker-role-mapping",
});
assertPathNavStructure({
  nodes: middleNav.nodes,
  navClass: "ingest-nav",
  position: "middle",
  pathName: "ingest",
});

const lastNav = renderPathNav({
  navScript: navSource,
  fileName: "social-context-intake.html",
  datasetKey: "ingestStep",
  datasetValue: "social-context-intake",
});
assertPathNavStructure({
  nodes: lastNav.nodes,
  navClass: "ingest-nav",
  position: "last",
  pathName: "ingest",
});

assertRendersOnce({
  navScript: navSource,
  rendered: middleNav,
  navClass: "ingest-nav",
  fileName: "speaker-role-mapping.html",
  pathName: "ingest",
});

console.log("ingest nav: ingest screens connected with creator-facing copy");
