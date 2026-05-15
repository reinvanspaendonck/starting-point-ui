// Starting Point UI Combobox Module

import { type Placement } from "@floating-ui/dom";
import {
  closeAnchor,
  closeAnchorIfOutside,
  getAnchorTrigger,
  getOpenAnchor,
  getTargetContent,
  openAnchor,
  positionFloating,
  toggleAnchor,
  type AnchorOptions,
} from "./floating";
import { isDisabled } from "./utils";

const TRIGGER_SELECTOR = "[data-sp-toggle='combobox']";
const CONTENT_SELECTOR = ".combobox";

function getVisibleItems(menu: HTMLElement): HTMLElement[] {
  return [...menu.querySelectorAll<HTMLElement>(".combobox-item")].filter(
    (item) => !item.hidden && !isDisabled(item),
  );
}

export function filter(menu: HTMLElement, query: string) {
  const normalizedQuery = query.trim().toLowerCase();
  const items = menu.querySelectorAll<HTMLElement>(".combobox-item");
  let visibleCount = 0;

  items.forEach((item) => {
    const text = (item.dataset.label ?? item.textContent ?? "")
      .trim()
      .toLowerCase();
    const matches = !normalizedQuery || text.includes(normalizedQuery);
    item.hidden = !matches;
    if (matches) visibleCount++;
  });

  const emptyEl = menu.querySelector<HTMLElement>(".combobox-empty");
  if (emptyEl) {
    emptyEl.classList.toggle("visible", visibleCount === 0);
  }
}

// Build a stable key from the currently-checked items so we can detect
// whether selections changed between open and close.
function getSelectionKey(menu: HTMLElement): string {
  return [
    ...menu.querySelectorAll<HTMLInputElement>(".combobox-item input:checked"),
  ]
    .map((input) => `${input.name}:${input.value}`)
    .sort()
    .join("|");
}

// Snapshot the selection state per trigger; only used by the on-close submit
// path to decide whether selections changed since open. The on-change path
// submits unconditionally and doesn't need a snapshot.
const openSnapshots = new WeakMap<HTMLElement, string>();

function findFormFor(trigger: HTMLElement, attr: string): HTMLFormElement | null {
  const formId = trigger.getAttribute(attr);
  if (formId) {
    const el = document.getElementById(formId);
    return el instanceof HTMLFormElement ? el : null;
  }
  return trigger.closest("form");
}

function submitForm(form: HTMLFormElement) {
  if (typeof form.requestSubmit === "function") form.requestSubmit();
  else form.submit();
}

function submitFormForTrigger(trigger: HTMLElement, attr: string) {
  const form = findFormFor(trigger, attr);
  if (form) submitForm(form);
}

const OPTS: AnchorOptions = {
  contentSelector: CONTENT_SELECTOR,
  triggerSelector: TRIGGER_SELECTOR,
  position: async (trigger, menu) => {
    // Match menu width to trigger so options align with the value they populate.
    menu.style.width = `${trigger.offsetWidth}px`;
    await positionFloating(trigger, menu, {
      placement: (trigger.dataset.spPlacement as Placement) || "bottom-start",
      offset: parseInt(trigger.dataset.spOffset || "4", 10),
    });
  },
  onAfterOpen: (trigger, menu) => {
    if (trigger.hasAttribute("data-sp-submit-on-close")) {
      openSnapshots.set(trigger, getSelectionKey(menu));
    }
  },
  onAfterClose: (trigger, menu) => {
    filter(menu, "");
    const input = menu.querySelector<HTMLInputElement>(".combobox-input");
    if (input) input.value = "";

    // If the trigger opts in and the selection changed since open, submit
    // the associated form (explicit id via attribute value, or the
    // enclosing form when value is empty).
    if (trigger.hasAttribute("data-sp-submit-on-close")) {
      const before = openSnapshots.get(trigger);
      openSnapshots.delete(trigger);
      const after = getSelectionKey(menu);
      if (before !== undefined && before !== after) {
        submitFormForTrigger(trigger, "data-sp-submit-on-close");
      }
    }
  },
};

export const open = (trigger: HTMLElement) => {
  const menu = getTargetContent(trigger);
  if (menu) openAnchor(trigger, menu, OPTS, { viaClick: true });
};
export const close = (menu: HTMLElement) => closeAnchor(menu, OPTS);
export const toggle = (trigger: HTMLElement) => {
  const menu = getTargetContent(trigger);
  if (menu) toggleAnchor(trigger, menu, OPTS, { viaClick: true });
};

function getItemLabel(input: HTMLInputElement): string {
  return (
    input.closest<HTMLElement>(".combobox-item")?.textContent?.trim() ?? ""
  );
}

function makeValueItem(text: string): HTMLSpanElement {
  const el = document.createElement("span");
  el.textContent = text;
  return el;
}

function updateTriggerText(trigger: HTMLElement, menu: HTMLElement) {
  const valueEl = trigger.querySelector<HTMLElement>(".combobox-value");
  if (!valueEl || valueEl.hasAttribute("data-sp-static")) return;

  const checked = menu.querySelectorAll<HTMLInputElement>(
    ".combobox-item input:checked",
  );
  valueEl.replaceChildren(
    ...[...checked].map((input) => makeValueItem(getItemLabel(input))),
  );
}

export function select(trigger: HTMLElement, menu: HTMLElement, item: HTMLElement) {
  const input = item.querySelector<HTMLInputElement>("input");
  if (!input) return;

  const isMultiple = input.type === "checkbox";

  // Radio behavior: clear sibling items' selected state before flipping this one on.
  if (!isMultiple) {
    menu.querySelectorAll<HTMLElement>(".combobox-item").forEach((el) => {
      el.setAttribute("aria-selected", "false");
    });
  }

  input.checked = isMultiple ? !input.checked : true;
  input.dispatchEvent(new Event("change", { bubbles: true }));
  item.setAttribute("aria-selected", String(input.checked));
  updateTriggerText(trigger, menu);

  if (!isMultiple) closeAnchor(menu, OPTS);
}

function handleClick(e: MouseEvent) {
  const target = e.target as HTMLElement;

  const trigger = target.closest<HTMLElement>(TRIGGER_SELECTOR);
  if (trigger) {
    const menu = getTargetContent(trigger);
    if (menu) {
      e.preventDefault();
      toggleAnchor(trigger, menu, OPTS, { viaClick: true });
    }
    return;
  }

  const item = target.closest<HTMLElement>(".combobox-item");
  if (item) {
    if (isDisabled(item)) {
      e.preventDefault();
      return;
    }
    const menu = item.closest<HTMLElement>(CONTENT_SELECTOR);
    if (menu) {
      const associatedTrigger = getAnchorTrigger(menu);
      if (associatedTrigger) select(associatedTrigger, menu, item);
    }
    return;
  }

  closeAnchorIfOutside(target, OPTS);
}

function handleKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement;

  const openMenu = getOpenAnchor(OPTS);
  if (e.key === "Escape" && openMenu) {
    e.preventDefault();
    const trigger = getAnchorTrigger(openMenu);
    closeAnchor(openMenu, OPTS);
    trigger?.focus();
    return;
  }

  if (
    (e.key === "Enter" || e.key === " ") &&
    target.matches(TRIGGER_SELECTOR)
  ) {
    e.preventDefault();
    const menu = getTargetContent(target);
    if (menu) toggleAnchor(target, menu, OPTS, { viaClick: true });
    return;
  }

  const menu =
    target.closest<HTMLElement>(CONTENT_SELECTOR) ??
    (target.matches(TRIGGER_SELECTOR) ? getTargetContent(target) : null);
  if (!menu?.classList.contains("open")) return;

  if (
    (e.key === "Enter" || e.key === " ") &&
    target.matches(".combobox-item")
  ) {
    e.preventDefault();
    if (!isDisabled(target)) {
      const trigger = getAnchorTrigger(menu);
      if (trigger) select(trigger, menu, target);
    }
    return;
  }

  if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) {
    e.preventDefault();
    const items = getVisibleItems(menu);
    if (!items.length) return;

    const currentIndex = items.indexOf(target);
    let nextItem: HTMLElement | null = null;

    switch (e.key) {
      case "ArrowDown":
        nextItem =
          currentIndex < 0 ? items[0] : items[currentIndex + 1] ?? items[0];
        break;
      case "ArrowUp":
        nextItem =
          currentIndex < 0
            ? items[items.length - 1]
            : items[currentIndex - 1] ?? items[items.length - 1];
        break;
      case "Home":
        nextItem = items[0];
        break;
      case "End":
        nextItem = items[items.length - 1];
        break;
    }

    nextItem?.focus();
  }
}

function handleFocusOut(e: FocusEvent) {
  closeAnchorIfOutside(e.relatedTarget as HTMLElement | null, OPTS);
}

function handleInput(e: Event) {
  const input = e.target as HTMLInputElement;
  if (!input.matches(".combobox-input")) return;

  const menu = input.closest<HTMLElement>(CONTENT_SELECTOR);
  if (menu) filter(menu, input.value);
}

function handleChange(e: Event) {
  const input = e.target as HTMLElement | null;
  if (!(input instanceof HTMLInputElement)) return;
  if (!input.closest(".combobox-item")) return;

  const menu = input.closest<HTMLElement>(CONTENT_SELECTOR);
  if (!menu) return;

  const trigger = getAnchorTrigger(menu);
  if (!trigger?.hasAttribute("data-sp-submit-on-change")) return;

  submitFormForTrigger(trigger, "data-sp-submit-on-change");
}

let initialized = false;

(function init() {
  if (typeof document === "undefined" || initialized) return;
  initialized = true;

  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener("focusout", handleFocusOut);
  document.addEventListener("input", handleInput);
  document.addEventListener("change", handleChange);
})();
