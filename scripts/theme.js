document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  const themeMeta = document.getElementById("theme-color-meta");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
  const buttons = Array.from(
    document.querySelectorAll(".theme-toggle button[data-theme]"),
  );

  function isDark(mode) {
    return mode === "dark" || (mode === "system" && systemPrefersDark.matches);
  }

  function applyTheme(mode) {
    const dark = isDark(mode);
    root.setAttribute("data-color-mode", dark ? "dark" : "light");
    if (themeMeta) {
      themeMeta.setAttribute("content", dark ? "#0d1117" : "#ffffff");
    }
    buttons.forEach((btn) => {
      btn.setAttribute("aria-pressed", String(btn.dataset.theme === mode));
    });
  }

  let current = localStorage.getItem("theme") || "system";
  applyTheme(current);

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      current = btn.dataset.theme;
      localStorage.setItem("theme", current);
      applyTheme(current);
    });
  });

  // Follow the OS only while in "system" mode.
  systemPrefersDark.addEventListener("change", () => {
    if (current === "system") applyTheme("system");
  });
});
