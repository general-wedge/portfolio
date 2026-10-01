// Light/dark theme toggle.
//
// With no saved choice the page follows the system setting via CSS. Once a
// visitor clicks the toggle, their choice is stored and set as data-theme on
// <html>. An inline script in _includes/head.html applies a saved choice
// before first paint, so there's no flash of the wrong theme.

const STORAGE_KEY = "theme";
const THEMES = ["light", "dark"];

export function readStoredTheme(storage) {
  try {
    const value = storage.getItem(STORAGE_KEY);
    return THEMES.includes(value) ? value : null;
  } catch {
    return null;
  }
}

export function effectiveTheme(stored, systemPrefersDark) {
  return stored ?? (systemPrefersDark ? "dark" : "light");
}

export function applyTheme(theme, { root, storage }) {
  root.dataset.theme = theme;
  try {
    storage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode, etc.): the switch still applies for this page.
  }
}

export function bindThemeToggle(button, { root, storage, systemPrefersDark }) {
  let current = effectiveTheme(readStoredTheme(storage), systemPrefersDark());

  const label = () => {
    const next = current === "dark" ? "light" : "dark";
    button.textContent = next;
    button.setAttribute("aria-label", `Switch to ${next} theme`);
  };

  button.addEventListener("click", () => {
    current = current === "dark" ? "light" : "dark";
    applyTheme(current, { root, storage });
    label();
  });

  label();
}

if (typeof document !== "undefined") {
  const button = document.querySelector("[data-theme-toggle]");
  if (button) {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    let storage;
    try {
      storage = window.localStorage; // merely reading this can throw when storage is blocked
    } catch {
      storage = { getItem: () => null, setItem() {} };
    }
    bindThemeToggle(button, {
      root: document.documentElement,
      storage,
      systemPrefersDark: () => query.matches,
    });
    button.hidden = false; // hidden in the markup so it never shows without JS
  }
}
