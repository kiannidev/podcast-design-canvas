"use strict";

// Guards layout safe areas hand-off links (#583): review-watermark overlap reviews
// open the client review copy flow that owns the review watermark toggle.
// Run with: `node prototype/layout-safe-areas-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(__dirname, "layout-safe-areas.html"), "utf8");
const shell = fs.readFileSync(path.join(root, "preview", "index.html"), "utf8");
const styleNav = fs.readFileSync(path.join(root, "preview", "style-nav.js"), "utf8");
const publishNav = fs.readFileSync(path.join(root, "preview", "publish-nav.js"), "utf8");

assert.ok(
  shell.includes("../prototype/layout-safe-areas.html"),
  "layout safe areas is reachable from the preview shell",
);
assert.ok(
  styleNav.includes('id: "layout-safe-areas"'),
  "layout safe areas is part of the connected visual direction path",
);
assert.ok(
  shell.includes("../prototype/client-review-copy-flow.html"),
  "client review copy flow is reachable from the preview shell",
);
assert.ok(
  publishNav.includes('id: "client-review-copy-flow"'),
  "client review copy flow is part of the connected publish prep path",
);

assert.ok(
  html.includes('fixScreen: "client-review-copy-flow.html"'),
  "review watermark overlap routes to the review copy flow",
);
assert.ok(
  html.includes('fixLabel: "review copy flow"'),
  "review watermark overlap names the fix screen in creator-facing copy",
);
assert.ok(
  fs.existsSync(path.join(__dirname, "client-review-copy-flow.html")),
  "client review copy flow exists as a real screen",
);
assert.ok(html.includes('openLink.className = "fix-link"'), "layout safe areas renders fix links with shared styling");
assert.ok(html.includes("issue.fixScreen && issue.fixLabel"), "fix link rendering requires target and label");

console.log("layout safe areas: review watermark overlap opens the review copy flow");
