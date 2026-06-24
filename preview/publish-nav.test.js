"use strict";

// Guards publish prep prototype navigation (#583 / #584).
// Run with: `node preview/publish-nav.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const vm = require("vm");

const root = path.join(__dirname, "..");
const navScript = fs.readFileSync(path.join(__dirname, "publish-nav.js"), "utf8");

new vm.Script(navScript);
assert.ok(navScript.includes('home.href = "../preview/"'), "publish nav links back to the preview shell");
assert.ok(navScript.includes("episode-flow.html"), "publish nav links to the guided episode flow");
assert.ok(navScript.includes("show-notes-assembly.html"), "publish nav includes show notes assembly");
assert.ok(navScript.includes('document.querySelector(".publish-nav")'), "publish nav guards against double render");
assert.ok(navScript.includes('setAttribute("aria-current", "step")'), "publish nav exposes aria-current on the step label");
assert.ok(!/innerHTML/.test(navScript), "publish nav builds the DOM without innerHTML");

const publishScreens = [
  "episode-watch-through-preview.html",
  "destination-crop-preview.html",
  "thumbnail-cover-frame.html",
  "show-notes-assembly.html",
  "export-package-handoff.html",
  "publish-checklist.html",
];

for (const file of publishScreens) {
  const html = fs.readFileSync(path.join(root, "prototype", file), "utf8");
  assert.ok(html.includes("../preview/publish-nav.js"), `${file} loads publish navigation`);
  assert.ok(!html.includes("../preview/tools-nav.js"), `${file} uses publish nav instead of tools nav`);
  assert.ok(html.includes("data-publish-step="), `${file} declares its publish step`);
}

function createElement(tagName) {
  return {
    tagName,
    attributes: {},
    children: [],
    className: "",
    href: "",
    id: "",
    textContent: "",
    setAttribute(name, value) {
      this.attributes[name] = value;
      if (name === "id") this.id = value;
      if (name === "class") this.className = value;
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
  };
}

function flatten(node) {
  return [node, ...node.children.flatMap(flatten)];
}

function renderNavFor(fileName, publishStep) {
  const head = createElement("head");
  const body = createElement("body");
  if (publishStep) {
    body.dataset = { publishStep };
  }
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
          node.className.split(" ").includes(className),
        ) || null
      );
    },
  };

  vm.runInNewContext(navScript, {
    document,
    window: { location: { pathname: `/prototype/${fileName}` } },
  });

  return { head, body, nodes: [...flatten(head), ...flatten(body)] };
}

const firstNav = renderNavFor("episode-watch-through-preview.html", "episode-watch-through-preview");
assert.ok(firstNav.nodes.some((node) => node.className === "publish-nav"), "publish nav renders on first screen");
assert.ok(
  !firstNav.nodes.some((node) => node.textContent && node.textContent.startsWith("Previous:")),
  "first publish screen does not render a previous link",
);
assert.ok(
  firstNav.nodes.some((node) => node.textContent === "Next: Destination crop preview"),
  "first publish screen renders next link",
);

const middleNav = renderNavFor("thumbnail-cover-frame.html", "thumbnail-cover-frame");
assert.ok(
  middleNav.nodes.some((node) => node.textContent === "Previous: Destination crop preview"),
  "middle publish screen renders previous link",
);
const currentStep = middleNav.nodes.find((node) =>
  node.textContent === "Publish step 3 of 6 · Thumbnail cover frame",
);
assert.ok(currentStep, "middle publish screen renders visible step label");
assert.equal(currentStep.attributes["aria-current"], "step", "current publish step exposes aria-current");

const lastNav = renderNavFor("publish-checklist.html", "publish-checklist");
assert.ok(
  lastNav.nodes.some((node) => node.textContent === "Finish: back to the preview shell"),
  "last publish screen hands off back to the preview shell",
);
assert.ok(
  !lastNav.nodes.some((node) => node.textContent && node.textContent.startsWith("Next:")),
  "last publish screen does not render a next link",
);

const duplicateNav = renderNavFor("export-package-handoff.html", "export-package-handoff");
vm.runInNewContext(navScript, {
  document: {
    readyState: "complete",
    head: duplicateNav.head,
    body: duplicateNav.body,
    createElement,
    getElementById(id) {
      return duplicateNav.nodes.find((node) => node.id === id) || null;
    },
    querySelector(selector) {
      if (!selector.startsWith(".")) return null;
      const className = selector.slice(1);
      return duplicateNav.nodes.find((node) => node.className.split(" ").includes(className)) || null;
    },
  },
  window: { location: { pathname: "/prototype/export-package-handoff.html" } },
});
assert.equal(
  flatten(duplicateNav.body).filter((node) => node.className === "publish-nav").length,
  1,
  "publish nav renders once if the script runs twice",
);

console.log("publish nav: publish prep screens connected with creator-facing copy");
