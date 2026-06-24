"use strict";

// Guards sensitive moment review hand-off links (#583): unreviewed confidentiality
// flags open social context intake, where guest and client context is owned.
// Run with: `node prototype/sensitive-moment-review-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(__dirname, "sensitive-moment-review.html"), "utf8");
const shell = fs.readFileSync(path.join(root, "preview", "index.html"), "utf8");
const visualsNav = fs.readFileSync(path.join(root, "preview", "visuals-nav.js"), "utf8");

assert.ok(
  shell.includes("../prototype/sensitive-moment-review.html"),
  "sensitive moment review is reachable from the preview shell",
);
assert.ok(
  visualsNav.includes('id: "sensitive-moment-review"'),
  "sensitive moment review is part of the connected contextual visuals path",
);
assert.ok(
  shell.includes("../prototype/social-context-intake.html"),
  "social context intake is reachable from the preview shell",
);

assert.ok(
  html.includes('fixScreen: "social-context-intake.html"'),
  "unreviewed confidentiality flags route to social context intake",
);
assert.ok(
  html.includes('fixLabel: "social context intake"'),
  "confidentiality flags name the fix screen in creator-facing copy",
);
assert.ok(
  fs.existsSync(path.join(__dirname, "social-context-intake.html")),
  "social context intake exists as a real screen",
);
assert.ok(html.includes('openLink.className = "fix-link"'), "sensitive moment review renders fix links with shared styling");
assert.ok(html.includes("result.fixScreen && result.fixLabel"), "fix link rendering requires target and label");

console.log("sensitive moment review: confidentiality flags open social context intake");
