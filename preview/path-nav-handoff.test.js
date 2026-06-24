"use strict";

// Path nav terminal handoffs must point at real prototype screens (#583 / #584).
// Run with: `node preview/path-nav-handoff.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const previewDir = __dirname;

const pathNavScripts = [
  "ingest-nav.js",
  "speaker-setup-nav.js",
  "style-nav.js",
  "publish-nav.js",
  "visuals-nav.js",
  "reuse-nav.js",
];

function handoffTargets(source) {
  const targets = [];
  const patterns = [
    /start\.href\s*=\s*"([^"]+)"/g,
    /finish\.href\s*=\s*"([^"]+)"/g,
  ];
  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(source)) !== null) {
      targets.push(match[1]);
    }
  }
  return targets;
}

for (const file of pathNavScripts) {
  const source = fs.readFileSync(path.join(previewDir, file), "utf8");
  const targets = handoffTargets(source);
  assert.ok(targets.length > 0, `${file} declares a terminal handoff link`);

  for (const target of targets) {
    if (target.startsWith("../preview/")) {
      const rel = target.replace("../preview/", "");
      assert.ok(
        fs.existsSync(path.join(previewDir, rel)) || fs.existsSync(path.join(previewDir, rel, "index.html")),
        `${file} handoff ${target} resolves under preview/`,
      );
      continue;
    }
    assert.ok(
      fs.existsSync(path.join(root, "prototype", target)),
      `${file} handoff ${target} resolves to a prototype screen`,
    );
  }
}

console.log(`path nav handoff: ${pathNavScripts.length} path nav scripts hand off to real screens`);
