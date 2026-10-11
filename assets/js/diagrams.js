// Mermaid diagrams in posts.
//
// A ```mermaid fence comes out of Jekyll as an ordinary code block. This swaps
// each one for a rendered diagram, coloured from the palette tokens in
// style.css and redrawn when the theme changes. Mermaid is only downloaded on
// pages that contain a diagram; if it can't be, the source stays readable as
// code.

const MERMAID_URL = "https://cdn.jsdelivr.net/npm/mermaid@12.1.0/dist/mermaid.esm.min.mjs";
const SOURCE_SELECTOR = "code.language-mermaid";

export function themeVariables(styles) {
  const value = (name) => styles.getPropertyValue(name).trim();
  return {
    darkMode: value("color-scheme") === "dark",
    background: value("--bg"),
    primaryColor: value("--code-bg"),
    primaryTextColor: value("--fg"),
    primaryBorderColor: value("--muted"),
    lineColor: value("--muted"),
    secondaryColor: value("--card-bg"),
    tertiaryColor: value("--bg"),
    edgeLabelBackground: value("--bg"),
    fontFamily: value("--font-sans"),
  };
}

function mountDiagram(code, document) {
  const source = code.textContent.trim();
  const node = document.createElement("div");
  node.className = "diagram";
  node.textContent = source;
  code.parentElement.replaceWith(node);
  return { node, source };
}

export async function renderDiagrams({ document, styles, loadMermaid, onThemeChange }) {
  const fences = [...document.querySelectorAll(SOURCE_SELECTOR)];
  if (fences.length === 0) return;

  let mermaid;
  try {
    mermaid = await loadMermaid();
  } catch {
    return; // Offline or CDN blocked: leave the code blocks as they are.
  }

  const diagrams = fences.map((code) => mountDiagram(code, document));

  const draw = async () => {
    mermaid.initialize({ startOnLoad: false, theme: "base", themeVariables: themeVariables(styles) });
    for (const { node, source } of diagrams) {
      node.removeAttribute("data-processed"); // Mermaid skips nodes it has already drawn
      node.textContent = source;
    }
    await mermaid.run({ nodes: diagrams.map((d) => d.node), suppressErrors: true });
  };

  await draw();
  onThemeChange(draw);
}

if (typeof document !== "undefined") {
  const root = document.documentElement;
  renderDiagrams({
    document,
    styles: getComputedStyle(root),
    loadMermaid: async () => (await import(MERMAID_URL)).default,
    onThemeChange: (redraw) => {
      // The toggle sets data-theme on <html>; without a saved choice the page follows the system.
      new MutationObserver(redraw).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", redraw);
    },
  });
}
