document.addEventListener("DOMContentLoaded", () => {

  const sidebar = document.querySelector("nav.TOC");
  const root = document.documentElement;
  const offset = 12; // pixels from the right edge to start resizing
  const minWidth = 150; // minimum width in pixels
  // Load saved width from localStorage. If not present, default CSS will apply.
  // This ensures the sidebar retains its size across page reloads and when navigating 
  // to other pages within the same site.
  const savedWidth = localStorage.getItem("sidebar-width");
  if (savedWidth) {
    root.style.setProperty("--maintoc-width", savedWidth + "px");
  }


  let resizing = false;

  sidebar.addEventListener("mousedown", (e) => {
    // react only if clicked near the right edge
    if (e.offsetX > sidebar.clientWidth - offset) {
      resizing = true;
      document.body.style.userSelect = "none";
    }
  });

  document.addEventListener("mousemove", (e) => {
    if (!resizing) return;

    const newWidth = Math.max(minWidth, e.clientX); 
    root.style.setProperty("--maintoc-width", newWidth + "px");
    localStorage.setItem("sidebar-width", newWidth);
  });

  document.addEventListener("mouseup", () => {
    resizing = false;
    document.body.style.userSelect = "";
  });
});
