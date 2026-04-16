export class View {
  public show(): void {
    const tab = document.getElementById("tab-tasks");
    const panel = document.getElementById("panel-tasks");
    if (!tab || !panel) {
      return;
    }

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");
    panel.style.display = "";
  }

  public hide(): void {
    const tab = document.getElementById("tab-tasks");
    const panel = document.getElementById("panel-tasks");
    if (!tab || !panel) {
      return;
    }

    tab.classList.remove("active");
    tab.setAttribute("aria-selected", "false");
    panel.style.display = "none";
  }
}
