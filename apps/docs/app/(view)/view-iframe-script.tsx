"use client";

import { useEffect } from "react";

// Runs inside the example preview iframe. Sets up:
// - Disables browser scrollbar gutter so the iframe fits flush
// - Blocks all link clicks (previews are not navigable)
// - Auto-resizes the iframe height to its content
// - Hides the loading spinner once the iframe is ready
// - Mirrors the parent's theme (font + colors) and dark mode class
// - Auto-opens dialogs when the page uses the "dialog" preset

function blockLinkClicks() {
  document.addEventListener("click", (e) => {
    if ((e.target as HTMLElement | null)?.closest("a")) e.preventDefault();
  });
}

function setupIframeSizing() {
  if (!window.frameElement) return;
  const f = window.frameElement as HTMLElement;
  f.style.opacity = "1";
  const spinner = f.previousElementSibling as HTMLElement | null;
  if (spinner) spinner.style.display = "none";

  const sync = () => {
    f.style.height = `${document.body.scrollHeight}px`;
  };
  sync();
  new ResizeObserver(sync).observe(document.body);
}

function autoOpenDialogs() {
  if (!document.querySelector('[data-preset="dialog"]')) return;
  document.querySelectorAll<HTMLDialogElement>("dialog.dialog").forEach((d) => {
    d.setAttribute("open", "");
    d.querySelectorAll<HTMLElement>(".dialog-backdrop, .dialog-panel").forEach((el) => {
      el.setAttribute("data-state", "open");
    });
  });
}

function syncParentTheme() {
  let parentDoc: Document;
  try {
    parentDoc = window.parent.document;
  } catch {
    return; // cross-origin parent
  }

  const syncTheme = () => {
    const parentStyle = parentDoc.getElementById("sp-theme");
    let s = document.getElementById("sp-theme");
    if (parentStyle) {
      if (!s) {
        s = document.createElement("style");
        s.id = "sp-theme";
        document.head.appendChild(s);
      }
      s.textContent = parentStyle.textContent;
    } else if (s) {
      s.remove();
    }

    const fonts = parentDoc.querySelectorAll<HTMLLinkElement>('link[id^="sp-font-"]');
    const have: Record<string, string> = {};
    fonts.forEach((l) => {
      have[l.id] = l.href;
      if (!document.getElementById(l.id)) {
        const c = document.createElement("link");
        c.id = l.id;
        c.rel = "stylesheet";
        c.href = l.href;
        document.head.appendChild(c);
      }
    });
    document.querySelectorAll<HTMLLinkElement>('link[id^="sp-font-"]').forEach((l) => {
      if (!have[l.id]) l.remove();
    });
  };

  const syncAppearance = () => {
    document.documentElement.classList.toggle(
      "dark",
      parentDoc.documentElement.classList.contains("dark"),
    );
  };

  syncTheme();
  syncAppearance();
  new MutationObserver(syncTheme).observe(parentDoc.head, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  new MutationObserver(syncAppearance).observe(parentDoc.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

export function ViewIframeScript() {
  useEffect(() => {
    document.documentElement.style.scrollbarGutter = "auto";
    blockLinkClicks();
    setupIframeSizing();
    autoOpenDialogs();
    syncParentTheme();
  }, []);

  return null;
}
