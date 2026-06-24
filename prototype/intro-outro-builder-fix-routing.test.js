"use strict";

// Guards intro and outro builder hand-off links (#583): sponsor disclosure
// reviews open social context intake where approved links are owned.
// Run with: `node prototype/intro-outro-builder-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(__dirname, "intro-outro-builder.html"), "utf8");
const shell = fs.readFileSync(path.join(root, "preview", "index.html"), "utf8");
const reuseNav = fs.readFileSync(path.join(root, "preview", "reuse-nav.js"), "utf8");

assert.ok(
  shell.includes("../prototype/intro-outro-builder.html"),
  "intro and outro builder is reachable from the preview shell",
);
assert.ok(
  reuseNav.includes('id: "intro-outro-builder"'),
  "intro and outro builder is part of the connected reuse path",
);
assert.ok(
  shell.includes("../prototype/social-context-intake.html"),
  "social context intake is reachable from the preview shell",
);

assert.ok(
  html.includes('item.id === "music-cue"'),
  "sponsor cue reviews declare a fix route",
);
assert.ok(
  html.includes('fixScreen: "social-context-intake.html"'),
  "sponsor cue reviews route to social context intake",
);
assert.ok(
  html.includes('fixLabel: "social context intake"'),
  "sponsor cue reviews name the fix screen in creator-facing copy",
);
assert.ok(
  fs.existsSync(path.join(__dirname, "social-context-intake.html")),
  "social context intake exists as a real screen",
);
assert.ok(html.includes("issue.fixScreen && issue.fixLabel"), "fix link rendering requires target and label");
assert.ok(html.includes('openLink.className = "fix-link"'), "intro outro builder renders fix links with shared styling");

console.log("intro outro builder: sponsor cue reviews open social context intake");
