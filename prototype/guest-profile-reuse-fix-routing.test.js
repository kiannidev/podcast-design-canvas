"use strict";

// Guards guest profile reuse hand-off links (#583): possible-match reviews open
// the screen that owns speaker identity context.
// Run with: `node prototype/guest-profile-reuse-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, "guest-profile-reuse.html"), "utf8");

assert.ok(html.includes('openLink = document.createElement("a")'), "guest reuse issues render an open-fix-screen link");
assert.ok(html.includes("openLink.href = issue.fixScreen"), "open link routes to the owning fix screen");

const fixScreens = [...html.matchAll(/fixScreen:\s*"([a-z0-9-]+\.html)"/g)].map((m) => m[1]);
assert.ok(fixScreens.length >= 1, "guest reuse issues declare fix screens");
for (const file of fixScreens) {
  assert.ok(fs.existsSync(path.join(dir, file)), `fix screen exists: ${file}`);
}

assert.ok(
  fixScreens.includes("social-context-intake.html"),
  "possible-match guest review routes to social context intake",
);

console.log(`guest profile reuse: ${fixScreens.length} issue paths open their owning fix screen`);
