"use strict";

// Guards layout safe area hand-off links (#583): each flagged safe-area check opens
// the screen that owns the underlying fix.
// Run with: `node prototype/layout-safe-areas-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, "layout-safe-areas.html"), "utf8");

assert.ok(html.includes('openLink = document.createElement("a")'), "safe area issues render an open-fix-screen link");
assert.ok(html.includes("openLink.href = issue.fixScreen"), "open link routes to the owning fix screen");

const checkBlock = html.match(/const checks = \{([\s\S]*?)\};/);
assert.ok(checkBlock, "layout safe area checks are declared");
const fixScreens = [...checkBlock[1].matchAll(/fixScreen:\s*"([a-z0-9-]+\.html)"/g)].map((m) => m[1]);
assert.ok(fixScreens.length >= 3, "safe area checks declare fix screens");
for (const file of fixScreens) {
  assert.ok(fs.existsSync(path.join(dir, file)), `fix screen exists: ${file}`);
}

assert.ok(
  fixScreens.includes("speaker-framing-safety.html"),
  "face-area overlap routes to speaker framing safety",
);
assert.ok(
  fixScreens.includes("destination-crop-preview.html"),
  "outside-crop routes to destination crop preview",
);
assert.ok(
  fixScreens.includes("accessibility-readability-checks.html"),
  "unreadable element routes to accessibility readability checks",
);

console.log(`layout safe areas: ${fixScreens.length} safe-area checks open their owning fix screen`);
