"use strict";

// Smoke test for secondary tool preview navigation (#583 / #584).
// Run with: `node preview/tools-nav.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const vm = require("vm");

const root = path.join(__dirname, "..");
const navSource = fs.readFileSync(path.join(__dirname, "tools-nav.js"), "utf8");

const connectedTools = [
  "prototype/pause-crosstalk-cleanup.html",
];

for (const tool of connectedTools) {
  const html = fs.readFileSync(path.join(root, tool), "utf8");
  assert.ok(html.includes("../preview/tools-nav.js"), `${tool} loads preview tools navigation`);
}

function createElement(tagName) {
  return {
    tagName,
    attributes: {},
    children: [],
    className: "",
    textContent: "",
    setAttribute(name, value) {
      this.attributes[name] = value;
    },
    appendChild(child) {
      this.children.push(child);
      return child;
    },
    insertBefore(child, before) {
      const index = this.children.indexOf(before);
      if (index === -1) {
        this.children.unshift(child);
      } else {
        this.children.splice(index, 0, child);
      }
      return child;
    },
    append(...nodes) {
      for (const node of nodes) {
        this.appendChild(node);
      }
    },
  };
}

function flatten(node) {
  return [node, ...node.children.flatMap(flatten)];
}

function renderToolsNav() {
  const head = createElement("head");
  const body = createElement("body");
  const document = {
    readyState: "complete",
    head,
    body,
    createElement,
    getElementById(id) {
      return [...flatten(head), ...flatten(body)].find((node) => node.id === id) || null;
    },
    querySelector(selector) {
      if (!selector.startsWith(".")) return null;
      const className = selector.slice(1);
      return (
        [...flatten(head), ...flatten(body)].find((node) =>
          node.className.split(" ").includes(className)
        ) || null
      );
    },
  };

  vm.runInNewContext(navSource, { document });
  return { head, body, nodes: [...flatten(head), ...flatten(body)] };
}

const nav = renderToolsNav();
assert.ok(nav.nodes.some((node) => node.id === "preview-tools-nav-styles"), "tools nav injects styles");
assert.ok(nav.nodes.some((node) => node.textContent === "Preview home"), "tools nav renders preview home link");
assert.ok(nav.nodes.some((node) => node.textContent === "Guided episode flow"), "tools nav renders guided flow link");
assert.ok(nav.nodes.some((node) => node.textContent === "Secondary tool screen"), "tools nav labels secondary screens");

vm.runInNewContext(navSource, {
  document: {
    readyState: "complete",
    head: nav.head,
    body: nav.body,
    createElement,
    getElementById(id) {
      return nav.nodes.find((node) => node.id === id) || null;
    },
    querySelector(selector) {
      if (!selector.startsWith(".")) return null;
      const className = selector.slice(1);
      return nav.nodes.find((node) => node.className.split(" ").includes(className)) || null;
    },
  },
});
assert.equal(
  flatten(nav.body).filter((node) => node.className === "preview-tools-nav").length,
  1,
  "tools nav renders once if the script runs twice",
);

console.log("preview tools nav (secondary screen smoke): all assertions passed");
