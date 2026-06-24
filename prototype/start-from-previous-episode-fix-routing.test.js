"use strict";

// Guards start-from-previous-episode hand-off links (#583): unconfirmed speaker roles
// open the connected ingest screen that owns role mapping.
// Run with: `node prototype/start-from-previous-episode-fix-routing.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(__dirname, "start-from-previous-episode.html"), "utf8");

assert.ok(html.includes("../preview/reuse-nav.js"), "start from previous episode loads reuse path navigation");
assert.ok(
  html.includes('fixScreen = "speaker-role-mapping.html?path=ingest"'),
  "unconfirmed roles route to speaker role mapping on the ingest path",
);
assert.ok(
  html.includes('fixLabel = "speaker role mapping"'),
  "role confirmation issue names the fix screen in creator-facing copy",
);
assert.ok(html.includes('openLink.className = "fix-link"'), "role confirmation renders a fix link");
assert.ok(html.includes("openLink.href = issue.fixScreen"), "fix link routes to the owning screen");
assert.ok(
  fs.existsSync(path.join(__dirname, "speaker-role-mapping.html")),
  "speaker role mapping exists as a real screen",
);

console.log("start from previous episode: role confirmation opens speaker role mapping");
