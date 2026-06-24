"use strict";

// Connects secondary prototype screens back to the preview shell (#583).
// Include from prototype/*.html with:
//   <script src="../preview/tools-nav.js" defer></script>

function renderPreviewToolsNav() {
  if (document.querySelector(".preview-tools-nav")) {
    return;
  }

  if (!document.getElementById("preview-tools-nav-styles")) {
    const style = document.createElement("style");
    style.id = "preview-tools-nav-styles";
    style.textContent = `
      .preview-tools-nav {
        border-bottom: 1px solid #d9e0dd;
        background: #f7faf8;
        color: #16211f;
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }

      .preview-tools-nav .wrap {
        max-width: 1180px;
        margin: 0 auto;
        padding: 10px 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 10px 16px;
        align-items: center;
      }

      .preview-tools-nav a {
        color: #075246;
        font-size: 13px;
        font-weight: 700;
        text-decoration: none;
      }

      .preview-tools-nav a:hover,
      .preview-tools-nav a:focus-visible {
        text-decoration: underline;
        outline: none;
      }

      .preview-tools-nav .label {
        margin-left: auto;
        color: #5e6b67;
        font-size: 13px;
        font-weight: 700;
      }

      @media (max-width: 640px) {
        .preview-tools-nav .label {
          margin-left: 0;
          width: 100%;
        }
      }
    `;
    document.head.appendChild(style);
  }

  const nav = document.createElement("nav");
  nav.className = "preview-tools-nav";
  nav.setAttribute("aria-label", "Preview navigation");

  const wrap = document.createElement("div");
  wrap.className = "wrap";

  const home = document.createElement("a");
  home.href = "../preview/";
  home.textContent = "Preview home";

  const flow = document.createElement("a");
  flow.href = "../preview/episode-flow.html";
  flow.textContent = "Guided episode flow";

  const label = document.createElement("span");
  label.className = "label";
  label.textContent = "Secondary tool screen";

  wrap.append(home, flow, label);
  nav.appendChild(wrap);
  document.body.insertBefore(nav, document.body.firstChild);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderPreviewToolsNav);
} else {
  renderPreviewToolsNav();
}
