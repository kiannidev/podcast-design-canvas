"use strict";

// Shared DOM stubs for preview path nav smoke tests (#583 / #584).
// Required by ingest-nav.test.js, speaker-setup-nav.test.js, and publish-nav.test.js.

const assert = require("assert");
const vm = require("vm");

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

function nodesFrom(head, body) {
  return [...flatten(head), ...flatten(body)];
}

function querySelectorAll(nodes, selector) {
  if (!selector.startsWith(".")) {
    return [];
  }
  const className = selector.slice(1);
  return nodes.filter((node) => node.className.split(" ").includes(className));
}

function createDocumentStub() {
  const head = createElement("head");
  const body = createElement("body");

  const document = {
    readyState: "complete",
    head,
    body,
    createElement,
    getElementById(id) {
      return nodesFrom(head, body).find((node) => node.id === id) || null;
    },
    querySelector(selector) {
      return querySelectorAll(nodesFrom(head, body), selector)[0] || null;
    },
  };

  return document;
}

function renderPathNav({ navScript, fileName, datasetKey, datasetValue }) {
  const document = createDocumentStub();
  if (datasetKey && datasetValue) {
    document.body.dataset = { [datasetKey]: datasetValue };
  }

  vm.runInNewContext(navScript, {
    document,
    window: { location: { pathname: `/prototype/${fileName}`, search: "" } },
    URLSearchParams,
  });

  const nodes = nodesFrom(document.head, document.body);
  return { document, head: document.head, body: document.body, nodes };
}

function stepLabel(nodes) {
  return nodes.find((node) => node.className === "step");
}

function assertPathNavStructure({ nodes, navClass, position, pathName }) {
  assert.ok(
    nodes.some((node) => node.className === navClass),
    `${pathName} nav renders on screen`,
  );

  const hasPrevious = nodes.some((node) => node.textContent && node.textContent.startsWith("Previous:"));
  const hasNext = nodes.some((node) => node.textContent && node.textContent.startsWith("Next:"));
  const hasHandoff = nodes.some(
    (node) =>
      node.textContent &&
      (node.textContent.startsWith("Continue:") || node.textContent.startsWith("Finish:")),
  );
  const currentStep = stepLabel(nodes);

  if (position === "first") {
    assert.ok(!hasPrevious, `${pathName} first screen does not render a previous link`);
    assert.ok(hasNext, `${pathName} first screen renders a next link`);
  } else if (position === "middle") {
    assert.ok(hasPrevious, `${pathName} middle screen renders a previous link`);
    assert.ok(hasNext, `${pathName} middle screen renders a next link`);
    assert.ok(currentStep, `${pathName} middle screen renders a step label`);
    assert.equal(currentStep.attributes["aria-current"], "step", `${pathName} step label exposes aria-current`);
  } else if (position === "last") {
    assert.ok(!hasNext, `${pathName} last screen does not render a next link`);
    assert.ok(hasHandoff, `${pathName} last screen renders a terminal handoff link`);
    assert.ok(currentStep, `${pathName} last screen renders a step label`);
    assert.equal(currentStep.attributes["aria-current"], "step", `${pathName} step label exposes aria-current`);
  } else {
    throw new Error(`unknown nav position: ${position}`);
  }
}

function assertRendersOnce({ navScript, rendered, navClass, fileName, pathName }) {
  vm.runInNewContext(navScript, {
    document: {
      readyState: "complete",
      head: rendered.head,
      body: rendered.body,
      createElement,
      getElementById(id) {
        return rendered.nodes.find((node) => node.id === id) || null;
      },
      querySelector(selector) {
        return querySelectorAll(rendered.nodes, selector)[0] || null;
      },
    },
    window: { location: { pathname: `/prototype/${fileName}`, search: "" } },
    URLSearchParams,
  });

  assert.equal(
    flatten(rendered.body).filter((node) => node.className === navClass).length,
    1,
    `${pathName} nav renders once if the script runs twice`,
  );
}

module.exports = {
  createElement,
  flatten,
  renderPathNav,
  assertPathNavStructure,
  assertRendersOnce,
};
