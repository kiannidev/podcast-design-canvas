"use strict";
const fs = require("fs");
const n = fs.readFileSync(`${__dirname}/episode-flow-nav.js`, "utf8");
require("assert").ok(n.includes('app.textContent = "Preview app"'));
