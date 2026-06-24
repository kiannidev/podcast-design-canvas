"use strict";

// Guards chapter marker review issues (#583): mid-sentence starts open transcript search.
// Run with: `node prototype/episode-chapter-markers-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const html = fs.readFileSync(path.join(__dirname, "episode-chapter-markers.html"), "utf8");

assert.ok(html.includes("../preview/reuse-nav.js"), "chapter markers load reuse path navigation");
assert.ok(
  html.includes('fixScreen: "transcript-search-navigation.html"'),
  "mid-sentence chapter issues route to transcript search",
);
assert.ok(
  html.includes('fixLabel: "transcript search"'),
  "mid-sentence issues name the fix screen in creator-facing copy",
);
assert.ok(html.includes("issue.fixScreen && issue.fixLabel"), "fix link renders only with routing metadata");
assert.ok(html.includes('attrs: { href: issue.fixScreen }'), "fix link routes to the owning screen");
assert.ok(
  fs.existsSync(path.join(__dirname, "transcript-search-navigation.html")),
  "transcript search navigation exists as a real screen",
);

console.log("episode chapter markers: mid-sentence starts open transcript search");
