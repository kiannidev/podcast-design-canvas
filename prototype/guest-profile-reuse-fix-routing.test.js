"use strict";

// Guards guest profile reuse hand-off links (#583): possible-match and profile-change
// reviews open the connected screen that owns speaker identity context.
// Run with: `node prototype/guest-profile-reuse-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(__dirname, "guest-profile-reuse.html"), "utf8");
const shell = fs.readFileSync(path.join(root, "preview", "index.html"), "utf8");
const speakerSetupNav = fs.readFileSync(path.join(root, "preview", "speaker-setup-nav.js"), "utf8");

assert.ok(
  shell.includes("../prototype/guest-profile-reuse.html"),
  "guest profile reuse is reachable from the preview shell",
);
assert.ok(
  speakerSetupNav.includes('id: "guest-profile-reuse"'),
  "guest profile reuse is part of the connected speaker setup path",
);

assert.ok(
  html.includes('fixScreen: "social-context-intake.html"'),
  "guest profile reviews route to social context intake",
);
assert.ok(
  html.includes('fixLabel: "social context intake"'),
  "guest profile reviews name the fix screen in creator-facing copy",
);
assert.ok(
  html.includes("guest.change !== \"none\" && guest.decision === \"reuse\""),
  "profile change reviews declare a fix screen alongside possible-match reviews",
);
assert.ok(
  fs.existsSync(path.join(__dirname, "social-context-intake.html")),
  "social context intake exists as a real screen",
);
assert.ok(html.includes("function renderFixLink(issue)"), "guest reuse renders fix links with one helper");
assert.ok(html.includes("!issue.fixScreen || !issue.fixLabel"), "fix link helper requires target and label");
assert.ok(html.includes("openLink.href = issue.fixScreen"), "fix link uses the issue fix-screen target");
assert.ok(html.includes('openLink.className = "fix-link"'), "fix link keeps shared focus styling");

console.log("guest profile reuse: possible-match and profile-change reviews open social context intake");
