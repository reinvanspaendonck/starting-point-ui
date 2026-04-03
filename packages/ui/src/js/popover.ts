// Starting Point UI Popover Module

import {
  computePosition,
  flip,
  shift,
  offset,
  type Placement,
} from "@floating-ui/dom";
import { getFocusableElements, waitForAnimations } from "./utils";

function getContent(popover: HTMLElement): HTMLElement | null {
  return popover.querySelector(".popover-content");
}

function getTrigger(popover: HTMLElement): HTMLElement | null {
  return popover.querySelector("[data-sp-toggle='popover']");
}

function getOpenPopover(): HTMLElement | null {
  const openContent = document.querySelector(".popover-content.open");
  return openContent?.closest(".popover") ?? null;
}

async function positionContent(popover: HTMLElement) {
  const trigger = getTrigger(popover);
  const content = getContent(popover);
  if (!trigger || !content) return;

  const placement =
    (popover.dataset.spPlacement as Placement) || "bottom";

  const { x, y } = await computePosition(trigger, content, {
    placement,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
  });

  Object.assign(content.style, {
    left: `${x}px`,
    top: `${y}px`,
  });
}

function open(popover: HTMLElement) {
  const content = getContent(popover);
  if (!content || content.classList.contains("open")) return;

  const openPopover = getOpenPopover();
  if (openPopover && openPopover !== popover) {
    close(openPopover);
  }

  const trigger = getTrigger(popover);

  content.classList.add("open");
  trigger?.setAttribute("aria-expanded", "true");
  content.setAttribute("data-state", "open");

  positionContent(popover);

  const focusable = getFocusableElements(content);
  if (focusable.length > 0) {
    focusable[0].focus();
  }
}

async function close(popover: HTMLElement) {
  const content = getContent(popover);
  if (!content || !content.classList.contains("open")) return;

  const trigger = getTrigger(popover);

  trigger?.setAttribute("aria-expanded", "false");
  content.setAttribute("data-state", "closed");

  await waitForAnimations([content]);

  content.classList.remove("open");
  content.removeAttribute("data-state");

  trigger?.focus();
}

function toggle(popover: HTMLElement) {
  const content = getContent(popover);
  if (content?.classList.contains("open")) {
    close(popover);
  } else {
    open(popover);
  }
}

function handleClick(e: MouseEvent) {
  const target = e.target as HTMLElement;

  const toggleBtn = target.closest<HTMLElement>("[data-sp-toggle='popover']");
  if (toggleBtn) {
    const popover = toggleBtn.closest<HTMLElement>(".popover");
    if (popover) {
      e.preventDefault();
      toggle(popover);
    }
    return;
  }

  const openPopover = getOpenPopover();
  if (openPopover && !openPopover.contains(target)) {
    close(openPopover);
  }
}

function handleKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement;
  const popover = target.closest<HTMLElement>(".popover");

  const openPopover = getOpenPopover();
  if (e.key === "Escape" && openPopover) {
    e.preventDefault();
    close(openPopover);
    return;
  }

  if (
    (e.key === "Enter" || e.key === " ") &&
    target.matches("[data-sp-toggle='popover']")
  ) {
    e.preventDefault();
    if (popover) {
      toggle(popover);
    }
    return;
  }

  if (e.key === "Tab" && openPopover) {
    const content = getContent(openPopover);
    if (!content) return;

    const focusable = getFocusableElements(content);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
}

// Initialize global listeners
let initialized = false;

(function init() {
  if (typeof document === "undefined" || initialized) return;
  initialized = true;

  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeydown);
})();
