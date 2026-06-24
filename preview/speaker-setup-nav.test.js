"use strict";

// Guards speaker-setup prototype navigation (#582 / #583 / #584).
// Run with: `node preview/speaker-setup-nav.test.js`

const fs = require("fs");
const path = require("path");
const assert = require("assert");
const vm = require("vm");

const root = path.join(__dirname, "..");
const navScript = fs.readFileSync(path.join(__dirname, "speaker-setup-nav.js"), "utf8");

new vm.Script(navScript);
assert.ok(navScript.includes('home.href = "../preview/"'), "speaker setup nav links back to the preview shell");
assert.ok(navScript.includes("episode-flow.html"), "speaker setup nav links to the guided episode flow");
assert.ok(navScript.includes("source-media-health.html"), "speaker setup nav hands off to source media health");
assert.ok(navScript.includes('document.querySelector(".speaker-setup-nav")'), "speaker setup nav guards against double render");
assert.ok(navScript.includes('setAttribute("aria-current", "step")'), "speaker setup nav exposes aria-current on the step label");
assert.ok(!/innerHTML/.test(navScript), "speaker setup nav builds the DOM without innerHTML");

const setupScreens = [
  "speaker-attribution-review.html",
  "guest-profile-reuse.html",
  "speaker-visual-match.html",
  "speaker-eye-line-coherence.html",
];

for (const file of setupScreens) {
  const html = fs.readFileSync(path.join(root, "prototype", file), "utf8");
  assert.ok(html.includes("../preview/speaker-setup-nav.js"), `${file} loads speaker setup navigation`);
  assert.ok(!html.includes("../preview/tools-nav.js"), `${file} uses speaker setup nav instead of tools nav`);
  assert.ok(html.includes("data-setup-step="), `${file} declares its speaker setup step`);
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

function renderNavFor(fileName, setupStep) {
  const head = createElement("head");
  const body = createElement("body");
  if (setupStep) {
    body.dataset = { setupStep };
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

const firstNav = renderNavFor("speaker-attribution-review.html", "speaker-attribution-review");
assert.ok(firstNav.nodes.some((node) => node.className === "speaker-setup-nav"), "speaker setup nav renders on first screen");
assert.ok(
  !firstNav.nodes.some((node) => node.textContent && node.textContent.startsWith("Previous:")),
  "first speaker setup screen does not render a previous link",
);
assert.ok(
  firstNav.nodes.some((node) => node.textContent === "Next: Guest profile reuse"),
  "first speaker setup screen renders next link",
);

const middleNav = renderNavFor("speaker-visual-match.html", "speaker-visual-match");
assert.ok(
  middleNav.nodes.some((node) => node.textContent === "Previous: Guest profile reuse"),
  "middle speaker setup screen renders previous link",
);
const currentStep = middleNav.nodes.find((node) =>
  node.textContent === "Speaker setup step 3 of 4 · Speaker visual match",
);
assert.ok(currentStep, "middle speaker setup screen renders visible step label");
assert.equal(currentStep.attributes["aria-current"], "step", "current speaker setup step exposes aria-current");

const lastNav = renderNavFor("speaker-eye-line-coherence.html", "speaker-eye-line-coherence");
assert.ok(
  lastNav.nodes.some((node) => node.textContent === "Continue: Source media health"),
  "last speaker setup screen hands off to source media health",
);
assert.ok(
  !lastNav.nodes.some((node) => node.textContent && node.textContent.startsWith("Next:")),
  "last speaker setup screen does not render a next link",
);

const duplicateNav = renderNavFor("speaker-visual-match.html", "speaker-visual-match");
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
  window: { location: { pathname: "/prototype/speaker-visual-match.html" } },
});
assert.equal(
  flatten(duplicateNav.body).filter((node) => node.className === "speaker-setup-nav").length,
  1,
  "speaker setup nav renders once if the script runs twice",
);

console.log("speaker setup nav: speaker-setup screens connected with creator-facing copy");
