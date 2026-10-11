// Markdown tables render as bare <table> markup, which browsers draw with no
// borders or padding. These tests read style.css and check that tables are
// styled from the palette, so they follow the light/dark themes like the rest.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../assets/css/style.css", import.meta.url), "utf8");

// Returns the declarations of the rule whose selector list is exactly `selector`.
function rule(selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = css.match(new RegExp(`(?:^|})\\s*${escaped}\\s*{([^}]*)}`, "m"));
  assert.ok(match, `expected a "${selector}" rule in style.css`);
  return match[1];
}

test("tables fill the reading column with collapsed borders", () => {
  const table = rule("table");
  assert.match(table, /width:\s*100%/);
  assert.match(table, /border-collapse:\s*collapse/);
});

test("cells are padded and separated by a rule in the palette's border colour", () => {
  const cells = rule("th, td");
  assert.match(cells, /padding:/);
  assert.match(cells, /border-bottom:[^;]*var\(--border\)/);
});

test("header cells are set apart in the mono chrome face and muted ink", () => {
  const header = rule("th");
  assert.match(header, /font-family:\s*var\(--font-mono\)/);
  assert.match(header, /color:\s*var\(--muted\)/);
});
