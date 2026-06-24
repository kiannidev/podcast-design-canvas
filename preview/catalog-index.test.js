"use strict";

// Smoke test for the root screen catalog routing (#584).
// Run with: `node preview/catalog-index.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.join(__dirname, "..");
const catalog = fs.readFileSync(path.join(root, "index.html"), "utf8");

const screenSlugs = [
  ...new Set(
    [...catalog.matchAll(/\["([a-z0-9-]+)",\s*"[^"]+",\s*"[^"]+"\]/g)].map((match) => match[1]),
  ),
];

assert.ok(screenSlugs.length > 0, "root catalog declares prototype screens");

for (const slug of screenSlugs) {
  const file = `${slug}.html`;
  assert.ok(
    fs.existsSync(path.join(root, "prototype", file)),
    `root catalog screen ${slug} resolves to prototype/${file}`,
  );
}

assert.match(catalog, /href="preview\/"/, "root catalog links to the preview shell");
assert.match(catalog, /href="preview\/episode-flow\.html"/, "root catalog links to the guided episode flow");

console.log(
  `root catalog smoke: ${screenSlugs.length} catalog screens verified, preview entry points present`,
);
