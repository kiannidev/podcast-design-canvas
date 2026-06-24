"use strict";

// Smoke test for the browser preview shell (#581 / #584).
// Run with: `node preview/preview.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const shellPath = path.join(__dirname, "index.html");
const html = fs.readFileSync(shellPath, "utf8");

const flowSteps = [
  "prototype/source-media-health.html",
  "prototype/speaker-sync-repair.html",
  "prototype/audio-cleanup-controls.html",
  "prototype/audio-caption-quality-review.html",
  "prototype/export-readiness-review.html",
];

assert.match(html, /<title>Podcast Design Canvas — Preview<\/title>/, "preview shell has product title");
assert.match(html, /aria-label="Podcast Design Canvas preview shell"/, "preview shell exposes landmark label");

for (const step of flowSteps) {
  assert.ok(html.includes(step), `preview shell links to ${step}`);
  assert.ok(fs.existsSync(path.join(root, step)), `${step} exists for preview routing`);
}

console.log("preview shell (episode flow smoke): all assertions passed");
