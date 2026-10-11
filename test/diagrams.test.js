// Behaviour of Mermaid diagram rendering in assets/js/diagrams.js.
// The DOM, computed styles, Mermaid itself and the theme-change signal are
// injected, so these run in Node without a browser or a network.
import { test } from "node:test";
import assert from "node:assert/strict";
import { themeVariables, renderDiagrams } from "../assets/js/diagrams.js";

const LIGHT = {
  "--bg": "#f0f0f7", "--fg": "#202233", "--muted": "#5e6078", "--accent": "#4a52a3",
  "--border": "#dadbea", "--code-bg": "#e4e5f0", "--card-bg": "#f7f7fb",
  "--font-sans": '"IBM Plex Sans", sans-serif', "color-scheme": "light",
};
const DARK = { ...LIGHT, "--bg": "#181a26", "--fg": "#d4d6e6", "--code-bg": "#222536", "color-scheme": "dark" };

// Stands in for the live object getComputedStyle returns: `use` swaps the theme under it.
function fakeStyles(initial) {
  let values = initial;
  return {
    use: (next) => { values = next; },
    getPropertyValue: (name) => ` ${values[name] ?? ""} `, // browsers keep the declared whitespace
  };
}

function fakeElement(tagName) {
  const attrs = {};
  return {
    tagName,
    attrs,
    className: "",
    textContent: "",
    setAttribute: (k, v) => { attrs[k] = v; },
    removeAttribute: (k) => { delete attrs[k]; },
  };
}

// What Jekyll emits for a ```mermaid fence: <pre><code class="language-mermaid">source</code></pre>.
function fakePage(...sources) {
  const fences = sources.map((source) => {
    const pre = { replacedWith: null, replaceWith(el) { this.replacedWith = el; } };
    return { pre, code: { textContent: source, parentElement: pre } };
  });
  return {
    fences,
    diagrams: () => fences.map((f) => f.pre.replacedWith),
    document: {
      querySelectorAll: (selector) => (selector === "code.language-mermaid" ? fences.map((f) => f.code) : []),
      createElement: fakeElement,
    },
  };
}

// Records how it was configured and, like Mermaid, swaps each node's source for an SVG.
function fakeMermaid() {
  const mermaid = {
    configs: [],
    runs: [],
    initialize: (config) => { mermaid.configs.push(config); },
    run: async (options) => {
      mermaid.runs.push({ ...options, sources: options.nodes.map((n) => n.textContent) });
      for (const node of options.nodes) {
        node.textContent = "<svg>";
        node.setAttribute("data-processed", "true");
      }
    },
  };
  return mermaid;
}

function setup(page, { styles = fakeStyles(LIGHT), mermaid = fakeMermaid() } = {}) {
  const deps = {
    document: page.document,
    styles,
    loads: 0,
    loadMermaid: async () => { deps.loads += 1; return mermaid; },
    changeTheme: () => {},
    onThemeChange: (redraw) => { deps.changeTheme = redraw; },
  };
  return { deps, styles, mermaid };
}

test("themeVariables colours diagrams from the site palette and reading font", () => {
  assert.deepEqual(themeVariables(fakeStyles(LIGHT)), {
    darkMode: false,
    background: "#f0f0f7",
    primaryColor: "#e4e5f0",
    primaryTextColor: "#202233",
    primaryBorderColor: "#5e6078",
    lineColor: "#5e6078",
    secondaryColor: "#f7f7fb",
    tertiaryColor: "#f0f0f7",
    edgeLabelBackground: "#f0f0f7",
    fontFamily: '"IBM Plex Sans", sans-serif',
  });
});

test("themeVariables tells Mermaid when the page is in its dark scheme", () => {
  const variables = themeVariables(fakeStyles(DARK));
  assert.equal(variables.darkMode, true);
  assert.equal(variables.background, "#181a26");
});

test("a page without diagrams never downloads Mermaid", async () => {
  const { deps } = setup(fakePage());
  await renderDiagrams(deps);
  assert.equal(deps.loads, 0);
});

test("each mermaid code fence is replaced by a diagram drawn from its source", async () => {
  const page = fakePage("flowchart LR\n  A --> B\n", "sequenceDiagram\n  A->>B: hi\n");
  const { deps, mermaid } = setup(page);
  await renderDiagrams(deps);

  const diagrams = page.diagrams();
  assert.deepEqual(diagrams.map((d) => [d.tagName, d.className]), [["div", "diagram"], ["div", "diagram"]]);
  assert.equal(deps.loads, 1);
  assert.deepEqual(mermaid.runs[0].nodes, diagrams);
  assert.deepEqual(mermaid.runs[0].sources, ["flowchart LR\n  A --> B", "sequenceDiagram\n  A->>B: hi"]);
});

test("Mermaid is configured with the site theme and told not to scan the page itself", async () => {
  const { deps, mermaid, styles } = setup(fakePage("flowchart LR\n  A --> B"));
  await renderDiagrams(deps);
  assert.deepEqual(mermaid.configs, [
    { startOnLoad: false, theme: "base", themeVariables: themeVariables(styles) },
  ]);
});

test("one diagram with a syntax error does not stop the others rendering", async () => {
  const { deps, mermaid } = setup(fakePage("flowchart LR\n  A --> B"));
  await renderDiagrams(deps);
  assert.equal(mermaid.runs[0].suppressErrors, true);
});

test("switching theme redraws every diagram from its source in the new colours", async () => {
  const page = fakePage("flowchart LR\n  A --> B");
  const { deps, mermaid, styles } = setup(page);
  await renderDiagrams(deps);

  styles.use(DARK);
  await deps.changeTheme();

  assert.equal(mermaid.configs.length, 2);
  assert.equal(mermaid.configs[1].themeVariables.darkMode, true);
  assert.equal(mermaid.configs[1].themeVariables.background, "#181a26");
  // Mermaid skips nodes it has already processed, so the redraw must hand it fresh source.
  assert.deepEqual(mermaid.runs[1].sources, ["flowchart LR\n  A --> B"]);
  assert.deepEqual(mermaid.runs[1].nodes, page.diagrams());
});

test("if Mermaid cannot be loaded the source stays on the page as a code block", async () => {
  const page = fakePage("flowchart LR\n  A --> B");
  const { deps } = setup(page);
  deps.loadMermaid = async () => { throw new Error("offline"); };
  await renderDiagrams(deps);
  assert.deepEqual(page.diagrams(), [null]);
});
