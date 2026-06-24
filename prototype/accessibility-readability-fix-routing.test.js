"use strict";

// Guards accessibility readability hand-off links (#583): open review issues route
// to the screen that owns each caption, title, or on-screen text fix.
// Run with: `node prototype/accessibility-readability-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, "accessibility-readability-checks.html"), "utf8");

assert.ok(html.includes('openLink = document.createElement("a")'), "readability issues render an open-fix-screen link");
assert.ok(html.includes("openLink.href = issue.fixScreen"), "open link routes to the owning fix screen");

const checkBlock = html.match(/const checks = \{([\s\S]*?)\};/);
assert.ok(checkBlock, "readability checks are declared");
const fixScreens = [...checkBlock[1].matchAll(/fixScreen:\s*"([a-z0-9-]+\.html)"/g)].map((m) => m[1]);
assert.ok(fixScreens.length >= 5, "readability checks declare fix screens");
for (const file of fixScreens) {
  assert.ok(fs.existsSync(path.join(dir, file)), `fix screen exists: ${file}`);
}

assert.ok(fixScreens.includes("layout-safe-areas.html"), "caption readability issues route to layout safe areas");

console.log(`accessibility readability: ${fixScreens.length} checks open their owning fix screen`);
