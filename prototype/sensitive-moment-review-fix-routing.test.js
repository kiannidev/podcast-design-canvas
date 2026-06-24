"use strict";

// Guards sensitive moment review hand-off links (#583): confidentiality flags that
// need guest or client context open the connected social context screen.
// Run with: `node prototype/sensitive-moment-review-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, "sensitive-moment-review.html"), "utf8");

assert.ok(html.includes("../preview/visuals-nav.js"), "sensitive moment review loads visuals path navigation");
assert.ok(
  html.includes("needsSocialContext: true"),
  "confidentiality flags declare social context routing metadata",
);
assert.ok(
  html.includes("if (state === \"flagged\" && moment.needsSocialContext)"),
  "routing attaches when a flagged moment needs social context review",
);
assert.ok(
  html.includes('fixScreen = "social-context-intake.html"'),
  "social context flags route to social context intake",
);
assert.ok(
  html.includes('fixLabel = "social context intake"'),
  "social context flags name the fix screen in creator-facing copy",
);
assert.ok(html.includes("function renderConsequence(result, index)"), "consequences render through one helper");
assert.ok(
  html.includes("if (result.fixScreen && result.fixLabel)"),
  "fix link renders only when routing metadata is present",
);
assert.ok(html.includes("openLink.href = result.fixScreen"), "fix link routes to the owning screen");
assert.ok(
  fs.existsSync(path.join(dir, "social-context-intake.html")),
  "social context intake exists as a real screen",
);

console.log("sensitive moment review: confidentiality flags open social context intake");
