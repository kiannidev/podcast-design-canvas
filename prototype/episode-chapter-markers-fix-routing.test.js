"use strict";

// Guards episode chapter marker hand-off links (#583): mid-sentence chapter starts
// open transcript search navigation where line boundaries are reviewed.
// Run with: `node prototype/episode-chapter-markers-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(__dirname, "episode-chapter-markers.html"), "utf8");
const shell = fs.readFileSync(path.join(root, "preview", "index.html"), "utf8");
const reuseNav = fs.readFileSync(path.join(root, "preview", "reuse-nav.js"), "utf8");
const cleanupNav = fs.readFileSync(path.join(root, "preview", "cleanup-nav.js"), "utf8");

assert.ok(
  shell.includes("../prototype/episode-chapter-markers.html"),
  "episode chapter markers is reachable from the preview shell",
);
assert.ok(
  reuseNav.includes('id: "episode-chapter-markers"'),
  "episode chapter markers is part of the connected reuse path",
);
assert.ok(
  shell.includes("../prototype/transcript-search-navigation.html"),
  "transcript search navigation is reachable from the preview shell",
);
assert.ok(
  cleanupNav.includes('id: "transcript-search-navigation"'),
  "transcript search navigation is part of the connected cleanup path",
);

assert.ok(
  html.includes('fixScreen: "transcript-search-navigation.html"'),
  "mid-sentence chapter reviews route to transcript search navigation",
);
assert.ok(
  html.includes('fixLabel: "transcript search"'),
  "mid-sentence chapter reviews name the fix screen in creator-facing copy",
);
assert.ok(
  fs.existsSync(path.join(__dirname, "transcript-search-navigation.html")),
  "transcript search navigation exists as a real screen",
);
assert.ok(html.includes("issue.fixScreen && issue.fixLabel"), "fix link rendering requires target and label");

console.log("episode chapter markers: mid-sentence starts open transcript search navigation");
