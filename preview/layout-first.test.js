"use strict";

// Smoke tests for the layout-first landing (#1026).
// Run with: `node preview/layout-first.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");

const html = fs.readFileSync(path.join(__dirname, "layout-first.html"), "utf8");
const shell = fs.readFileSync(path.join(__dirname, "index.html"), "utf8");

assert.match(html, /Choose your podcast layout/, "layout-first landing opens with layout selection");
assert.match(html, /data-layout="interview"/, "layout-first offers an interview layout");
assert.match(html, /data-layout="solo"/, "layout-first offers a solo layout");
assert.match(html, /data-layout="panel"/, "layout-first offers a panel layout");
assert.match(html, /Host video slot/, "layout-first exposes a host video slot");
assert.match(html, /Guest video slot/, "layout-first exposes a guest video slot");
assert.match(html, /B-roll drop zone/, "layout-first reserves a b-roll slot");
assert.match(html, /Caption area/, "layout-first reserves a caption area");
assert.ok(html.includes("applyLayout"), "layout-first switches slot visibility when the layout changes");
assert.match(html, /Reset videos/, "layout-first lets creators reset placed videos");
assert.match(html, /layout-slot-status/, "layout-first reports video slot fill status");
assert.ok(html.includes("placeVideoFile"), "layout-first accepts dropped video files into layout slots");
assert.ok(html.includes('file.type.startsWith("video/")'), "layout-first rejects non-video drops with creator-facing feedback");
assert.ok(shell.includes("layout-first.html"), "preview shell links to the layout-first landing");

console.log("layout-first landing: layout picker and placement slots are wired");
