// The palette lives as CSS custom properties in assets/css/style.css.
// These tests read it straight from the stylesheet, so any future colour
// tweak that hurts readability fails here before it ships.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../assets/css/style.css", import.meta.url), "utf8");

// Returns the custom properties declared in the first block opened by `selector`.
function tokens(selector) {
  const start = css.indexOf(`${selector} {`);
  assert.notEqual(start, -1, `expected a "${selector}" block in style.css`);
  const body = css.slice(start, css.indexOf("}", start));
  return Object.fromEntries(
    [...body.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(([, name, value]) => [name, value.trim()])
  );
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const COLOR_TOKENS = ["bg", "fg", "muted", "accent", "border", "code-bg", "card-bg"];

const light = tokens(":root");
const dark = tokens(':root[data-theme="dark"]');
const systemDark = tokens(':root:not([data-theme="light"])');

test("dark theme is identical whether chosen by toggle or by system preference", () => {
  for (const name of COLOR_TOKENS) {
    assert.equal(systemDark[name], dark[name], `--${name} differs between the two dark blocks`);
  }
});

for (const [mode, t] of [["light", light], ["dark", dark]]) {
  test(`${mode}: every colour token is defined as a hex value`, () => {
    for (const name of COLOR_TOKENS) {
      assert.match(t[name] ?? "", /^#[0-9a-f]{6}$/i, `--${name} should be a 6-digit hex colour`);
    }
  });

  test(`${mode}: body text meets WCAG AAA (7:1) on page, card and code backgrounds`, () => {
    for (const surface of ["bg", "card-bg", "code-bg"]) {
      assert.ok(contrast(t.fg, t[surface]) >= 7, `fg on --${surface} is ${contrast(t.fg, t[surface]).toFixed(2)}:1`);
    }
  });

  test(`${mode}: body text stops short of pure black-on-white glare (under 15:1)`, () => {
    assert.ok(contrast(t.fg, t.bg) < 15, `fg on bg is ${contrast(t.fg, t.bg).toFixed(2)}:1`);
  });

  test(`${mode}: accent and muted text meet WCAG AA (4.5:1) on page and card backgrounds`, () => {
    for (const ink of ["accent", "muted"]) {
      for (const surface of ["bg", "card-bg"]) {
        const ratio = contrast(t[ink], t[surface]);
        assert.ok(ratio >= 4.5, `--${ink} on --${surface} is ${ratio.toFixed(2)}:1`);
      }
    }
  });
}
