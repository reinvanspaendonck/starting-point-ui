// Starting Point UI Checkbox Module

export {};

const MASTER_SELECTOR = "input[type='checkbox'][data-sp-toggle-all]";

function getTargetsFor(master: HTMLInputElement): HTMLInputElement[] {
  const formAttr = master.getAttribute("form");
  const all = [
    ...document.querySelectorAll<HTMLInputElement>("input[type='checkbox']"),
  ];

  return all.filter((cb) => {
    if (cb === master) return false;
    if (cb.hasAttribute("data-sp-toggle-all")) return false;
    if (cb.disabled) return false;
    if (formAttr) return cb.getAttribute("form") === formAttr;
    // No form attr on the master: group by closest form ancestor.
    return cb.closest("form") === master.closest("form");
  });
}

function syncMaster(master: HTMLInputElement) {
  const targets = getTargetsFor(master);
  const checkedCount = targets.filter((t) => t.checked).length;
  const total = targets.length;

  const allChecked = total > 0 && checkedCount === total;
  const someChecked = checkedCount > 0 && checkedCount < total;

  master.checked = allChecked;
  master.indeterminate = someChecked;
  // Mirror state into the attribute value so CSS can render it without JS at
  // first paint (server can pre-render the right value to avoid flicker).
  master.setAttribute(
    "data-sp-toggle-all",
    allChecked ? "all" : someChecked ? "some" : "none",
  );
}

function handleChange(e: Event) {
  const target = e.target as HTMLElement;
  if (!(target instanceof HTMLInputElement) || target.type !== "checkbox") {
    return;
  }

  // Master toggled: flip every target to match, then sync the master state.
  if (target.matches(MASTER_SELECTOR)) {
    const checked = target.checked;
    getTargetsFor(target).forEach((cb) => {
      cb.checked = checked;
    });
    syncMaster(target);
    return;
  }

  // A target toggled: find its master(s) and re-sync.
  const formAttr = target.getAttribute("form");
  const masters = [
    ...document.querySelectorAll<HTMLInputElement>(MASTER_SELECTOR),
  ].filter((m) => {
    const masterFormAttr = m.getAttribute("form");
    if (masterFormAttr) return masterFormAttr === formAttr;
    return m.closest("form") === target.closest("form");
  });
  masters.forEach(syncMaster);
}

function scanForMasters(root: Node) {
  if (!(root instanceof Element)) return;
  if (root.matches?.(MASTER_SELECTOR)) {
    syncMaster(root as HTMLInputElement);
  }
  root.querySelectorAll<HTMLInputElement>(MASTER_SELECTOR).forEach(syncMaster);
}

let initialized = false;

function init() {
  if (typeof document === "undefined" || initialized) return;
  initialized = true;

  const start = () => {
    document.addEventListener("change", handleChange);
    // Initial sync for masters in the SSR-rendered DOM
    scanForMasters(document.body);
    // Catch masters added later (client-side routing, modal mounts, htmx swaps)
    new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) scanForMasters(node);
      }
    }).observe(document.body, { childList: true, subtree: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
}

init();
