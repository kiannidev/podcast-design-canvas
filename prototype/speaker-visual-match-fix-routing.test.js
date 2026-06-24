"use strict";

// Guards speaker visual match hand-off links (#583): mismatched guest tracks
// open preset comparison preview where side-by-side looks are reviewed.
// Run with: `node prototype/speaker-visual-match-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(__dirname, "speaker-visual-match.html"), "utf8");
const shell = fs.readFileSync(path.join(root, "preview", "index.html"), "utf8");
const speakerSetupNav = fs.readFileSync(path.join(root, "preview", "speaker-setup-nav.js"), "utf8");
const styleNav = fs.readFileSync(path.join(root, "preview", "style-nav.js"), "utf8");

assert.ok(
  shell.includes("../prototype/speaker-visual-match.html"),
  "speaker visual match is reachable from the preview shell",
);
assert.ok(
  speakerSetupNav.includes('id: "speaker-visual-match"'),
  "speaker visual match is part of the connected speaker setup path",
);
assert.ok(
  shell.includes("../prototype/preset-comparison-preview.html"),
  "preset comparison preview is reachable from the preview shell",
);
assert.ok(
  styleNav.includes('id: "preset-comparison-preview"'),
  "preset comparison preview is part of the connected visual direction path",
);

assert.ok(
  html.includes('fixScreen: "preset-comparison-preview.html"'),
  "mismatched guest reviews route to preset comparison preview",
);
assert.ok(
  html.includes('fixLabel: "preset comparison"'),
  "mismatched guest reviews name the fix screen in creator-facing copy",
);
assert.ok(
  fs.existsSync(path.join(__dirname, "preset-comparison-preview.html")),
  "preset comparison preview exists as a real screen",
);
assert.ok(html.includes("issue.fixScreen && issue.fixLabel"), "fix link rendering requires target and label");
assert.ok(html.includes('openLink.className = "fix-link"'), "speaker visual match renders fix links with shared styling");

console.log("speaker visual match: mismatched guest tracks open preset comparison preview");
