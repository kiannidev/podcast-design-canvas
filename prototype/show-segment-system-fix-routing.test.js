"use strict";

// Guards show segment system hand-off links (#583): sponsor and guest-intro
// segment reviews open social context intake where show identity is owned.
// Run with: `node prototype/show-segment-system-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(__dirname, "show-segment-system.html"), "utf8");
const shell = fs.readFileSync(path.join(root, "preview", "index.html"), "utf8");
const reuseNav = fs.readFileSync(path.join(root, "preview", "reuse-nav.js"), "utf8");

assert.ok(
  shell.includes("../prototype/show-segment-system.html"),
  "show segment system is reachable from the preview shell",
);
assert.ok(
  reuseNav.includes('id: "show-segment-system"'),
  "show segment system is part of the connected reuse path",
);
assert.ok(
  shell.includes("../prototype/social-context-intake.html"),
  "social context intake is reachable from the preview shell",
);

assert.ok(
  html.includes('fixScreen: "social-context-intake.html"'),
  "sponsor and guest-intro segment reviews route to social context intake",
);
assert.ok(
  fs.existsSync(path.join(__dirname, "social-context-intake.html")),
  "social context intake exists as a real screen",
);
assert.ok(html.includes("issue.fixScreen && issue.fixLabel"), "fix link rendering requires target and label");

console.log("show segment system: sponsor and guest-intro reviews open social context intake");
