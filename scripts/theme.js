document.addEventListener("DOMContentLoaded", function () {
  const themeSelect = document.getElementById("theme-select");
  const html = document.documentElement;
  const themeMeta = document.getElementById("theme-color-meta");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(mode) {
    const isDark = mode === "dark" || (mode === "system" && systemPrefersDark.matches);
    html.setAttribute("data-color-mode", isDark ? "dark" : "light");
    if (themeMeta) {
      themeMeta.setAttribute("content", isDark ? "#0d1117" : "#ffffff");
    }
  }

  // 1. Initialize from localStorage or fallback to system
  const savedTheme = localStorage.getItem("theme") || "system";
  if (themeSelect) {
    themeSelect.value = savedTheme; // Sync UI
    
    // 2. Listen for dropdown changes
    themeSelect.addEventListener("change", (e) => {
      const selected = e.target.value;
      localStorage.setItem("theme", selected);
      applyTheme(selected);
    });
  }

  // 3. React to system preference changes if 'system' is currently selected
  systemPrefersDark.addEventListener("change", () => {
    if (localStorage.getItem("theme") === "system" || !localStorage.getItem("theme")) {
      applyTheme("system");
    }
  });

  // Apply initially (if not already applied by head script)
  applyTheme(savedTheme);
});
