"use client";
import React from "react";

/* Theme and site options.
   The prototype drove these from a design-time "Tweaks" panel. In production
   the options are fixed (see the *_DEFAULTS in each page) and only the
   light/dark mode is interactive: the nav button fires "rusalka:toggle-mode",
   the choice is kept in localStorage, and <html data-theme> switches the
   design-system tokens. app/layout.jsx sets the attribute before first paint. */

const STORAGE_KEY = "rusalka-theme";
const ACCENT_HEX = { "#ff6f3c": "coral", "#ffaa00": "amber", "#0a9ccc": "baltic", "#2ec4a6": "seafoam" };

function currentTheme() {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function applyTheme(mode) {
  document.documentElement.dataset.theme = mode;
  try { localStorage.setItem(STORAGE_KEY, mode); } catch (e) { /* private mode */ }
  window.dispatchEvent(new CustomEvent("rusalka:modechange"));
}

export function useTweaks(defaults) {
  const [tweaks, setTweaks] = React.useState(defaults);
  const setTweak = React.useCallback((key, value) => {
    setTweaks((t) => ({ ...t, [key]: value }));
  }, []);
  return [tweaks, setTweak];
}

export function useSiteTheme(tweaks) {
  React.useEffect(() => {
    const b = document.body;
    b.dataset.emphasis = ACCENT_HEX[String(tweaks.accent).toLowerCase()] || "coral";
    b.dataset.corners = tweaks.corners || "soft";
    b.dataset.texture = tweaks.texture === false ? "off" : "on";
  }, [tweaks.accent, tweaks.corners, tweaks.texture]);

  React.useEffect(() => {
    const onToggle = () => applyTheme(currentTheme() === "dark" ? "light" : "dark");
    window.addEventListener("rusalka:toggle-mode", onToggle);
    return () => window.removeEventListener("rusalka:toggle-mode", onToggle);
  }, []);
}

/* The Tweaks panel is a prototype tool; these render nothing in production. */
const Nothing = () => null;
export const SiteTweaks = Nothing;
export const TweaksPanel = Nothing;
export const TweakSection = Nothing;
export const TweakRadio = Nothing;
export const TweakToggle = Nothing;
export const TweakColor = Nothing;
