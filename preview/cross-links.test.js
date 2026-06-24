"use strict";

// Smoke test for preview shell ↔ catalog cross-links (#583 / #584).
// Run with: `node preview/cross-links.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const shell = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");
const catalog = fs.readFileSync(path.join(root, "index.html"), "utf8");

assert.match(shell, /href="\.\.\/index\.html"/, "preview shell links to the root catalog");
assert.match(shell, /href="\.\/episode-flow\.html"/, "preview shell links to the guided episode flow");
assert.match(catalog, /href="preview\/"/, "root catalog links to the preview shell");
assert.match(catalog, /href="preview\/episode-flow\.html"/, "root catalog links to the guided episode flow");

assert.ok(
  fs.existsSync(path.join(__dirname, "episode-flow.html")),
  "guided episode flow page exists for routing",
);

const flowPage = fs.readFileSync(path.join(__dirname, "episode-flow.html"), "utf8");
assert.match(flowPage, /href="\.\/index\.html"/, "guided flow links back to the preview shell");

console.log("preview cross-links: shell, catalog, and guided flow routes verified");
