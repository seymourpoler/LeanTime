export class View {
  public subscribeWhenChangeThemeIsRequested(handler: () => void): void {
    document
      .getElementById("theme-toggle")
      ?.addEventListener("click", (event: Event) => {
        event.preventDefault();

        handler();
      });
  }

  public subscribeWhenShowTasksIsRequested(handler: () => void): void {
    document
      .getElementById("tab-tasks")
      ?.addEventListener("click", (event: Event) => {
        event.preventDefault();

        handler();
      });
  }

  public subscribeWhenShowTimerIsRequested(handler: () => void): void {
    document
      .getElementById("tab-timer")
      ?.addEventListener("click", (event: Event) => {
        event.preventDefault();

        handler();
      });
  }

  public changeTheme(): void {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      body.classList.add("dark");
      if (themeToggle) {
        themeToggle.textContent = "☀️";
      }
    }
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    if (themeToggle) {
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    }
  }
}
