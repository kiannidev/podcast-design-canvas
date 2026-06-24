"use strict";

// Guards speaker role mapping hand-off links (#583): low-confidence role reviews
// open the screen that owns speaker identity context.
// Run with: `node prototype/speaker-role-mapping-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, "speaker-role-mapping.html"), "utf8");

assert.ok(html.includes('openLink = document.createElement("a")'), "role mapping issues render an open-fix-screen link");
assert.ok(html.includes("openLink.href = issue.fixScreen"), "open link routes to the owning fix screen");

const fixScreens = [...html.matchAll(/fixScreen:\s*"([a-z0-9-]+\.html)"/g)].map((m) => m[1]);
assert.ok(fixScreens.length >= 1, "role mapping issues declare fix screens");
for (const file of fixScreens) {
  assert.ok(fs.existsSync(path.join(dir, file)), `fix screen exists: ${file}`);
}

assert.ok(
  fixScreens.includes("social-context-intake.html"),
  "low-confidence role review routes to social context intake",
);

console.log(`speaker role mapping: ${fixScreens.length} issue paths open their owning fix screen`);
