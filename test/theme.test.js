// Behaviour of the light/dark toggle in assets/js/theme.js.
// The DOM, storage and system preference are injected, so these run in Node.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readStoredTheme, effectiveTheme, applyTheme, bindThemeToggle } from "../assets/js/theme.js";

function fakeStorage(initial = {}) {
  const data = { ...initial };
  return {
    data,
    getItem: (k) => (k in data ? data[k] : null),
    setItem: (k, v) => { data[k] = String(v); },
  };
}

const brokenStorage = {
  getItem() { throw new Error("blocked"); },
  setItem() { throw new Error("blocked"); },
};

function fakeButton() {
  const attrs = {};
  let onClick;
  return {
    attrs,
    textContent: "",
    setAttribute: (k, v) => { attrs[k] = v; },
    addEventListener: (type, fn) => { if (type === "click") onClick = fn; },
    click: () => onClick(),
  };
}

test("readStoredTheme returns a saved light or dark choice", () => {
  assert.equal(readStoredTheme(fakeStorage({ theme: "dark" })), "dark");
  assert.equal(readStoredTheme(fakeStorage({ theme: "light" })), "light");
});

test("readStoredTheme ignores missing or unrecognised values", () => {
  assert.equal(readStoredTheme(fakeStorage()), null);
  assert.equal(readStoredTheme(fakeStorage({ theme: "sepia" })), null);
});

test("readStoredTheme returns null when storage is unavailable", () => {
  assert.equal(readStoredTheme(brokenStorage), null);
});

test("effectiveTheme prefers the saved choice over the system setting", () => {
  assert.equal(effectiveTheme("light", true), "light");
  assert.equal(effectiveTheme("dark", false), "dark");
});

test("effectiveTheme follows the system setting when nothing is saved", () => {
  assert.equal(effectiveTheme(null, true), "dark");
  assert.equal(effectiveTheme(null, false), "light");
});

test("applyTheme sets data-theme on the root and remembers the choice", () => {
  const root = { dataset: {} };
  const storage = fakeStorage();
  applyTheme("dark", { root, storage });
  assert.equal(root.dataset.theme, "dark");
  assert.equal(storage.data.theme, "dark");
});

test("applyTheme still switches the page when storage is unavailable", () => {
  const root = { dataset: {} };
  applyTheme("light", { root, storage: brokenStorage });
  assert.equal(root.dataset.theme, "light");
});

test("toggle button labels itself with the theme it will switch to", () => {
  const button = fakeButton();
  bindThemeToggle(button, { root: { dataset: {} }, storage: fakeStorage(), systemPrefersDark: () => true });
  assert.equal(button.textContent, "light");
  assert.equal(button.attrs["aria-label"], "Switch to light theme");
});

test("clicking the toggle flips the theme, saves it, and updates the label", () => {
  const button = fakeButton();
  const root = { dataset: {} };
  const storage = fakeStorage();
  bindThemeToggle(button, { root, storage, systemPrefersDark: () => false });

  button.click();
  assert.equal(root.dataset.theme, "dark");
  assert.equal(storage.data.theme, "dark");
  assert.equal(button.textContent, "light");

  button.click();
  assert.equal(root.dataset.theme, "light");
  assert.equal(storage.data.theme, "light");
  assert.equal(button.textContent, "dark");
});

test("a saved choice wins over the system setting when the toggle starts", () => {
  const button = fakeButton();
  bindThemeToggle(button, {
    root: { dataset: {} },
    storage: fakeStorage({ theme: "light" }),
    systemPrefersDark: () => true,
  });
  assert.equal(button.textContent, "dark");
});
