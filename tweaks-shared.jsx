/* ============================================================================
   tweaks-shared.jsx — site-wide Tweaks used by every page.
   ----------------------------------------------------------------------------
   • useSiteTheme(tweaks)  — pushes the shared tweak values onto <body> as
     data-attributes that styles.css keys off (accent, corners, texture).
   • <SiteTweaks tweaks setTweak>  — the common Tweaks panel. Page-specific
     sections are passed as children and render ABOVE the shared ones.

   Load order (after React, after tweaks-panel.jsx, before the page script):
     tweaks-panel.jsx → tweaks-shared.jsx → kit.jsx → sections.jsx → <page>.jsx

   Requires from tweaks-panel.jsx: TweaksPanel, TweakSection, TweakColor,
   TweakRadio, TweakToggle.
============================================================================ */
/* global React, TweaksPanel, TweakSection, TweakColor, TweakRadio, TweakToggle */

const { useEffect: useEffectShared } = React;

/* Accent swatches → the data-emphasis keyword styles.css themes on.
   Keys are lowercase hex so lookups survive TweakColor's lowercasing. */
const ACCENT_HEX = {
  coral:   "#FF6F3C",
  amber:   "#FFAA00",
  baltic:  "#0A9CCC",
  seafoam: "#2EC4A6",
};
const HEX_TO_EMPHASIS = Object.fromEntries(
  Object.entries(ACCENT_HEX).map(([k, v]) => [v.toLowerCase(), k])
);

/* Apply the shared tweaks to <body>. All theming lives in CSS; this only
   toggles the data-attributes those rules select on. Pass setTweak so the
   nav's sun/moon button (kit.jsx ModeToggle) can flip the mode tweak via
   the "rusalka:toggle-mode" window event. */
function useSiteTheme(tweaks, setTweak) {
  useEffectShared(() => {
    const b = document.body;
    b.dataset.emphasis = HEX_TO_EMPHASIS[String(tweaks.accent).toLowerCase()] || "coral";
    b.dataset.corners  = tweaks.corners || "soft";
    b.dataset.texture  = tweaks.texture === false ? "off" : "on";
    b.dataset.mode     = tweaks.mode === "dark" ? "dark" : "light";
    window.dispatchEvent(new CustomEvent("rusalka:modechange"));
  }, [tweaks.accent, tweaks.corners, tweaks.texture, tweaks.mode]);
  useEffectShared(() => {
    if (!setTweak) return;
    const onToggle = () =>
      setTweak("mode", document.body.dataset.mode === "dark" ? "light" : "dark");
    window.addEventListener("rusalka:toggle-mode", onToggle);
    return () => window.removeEventListener("rusalka:toggle-mode", onToggle);
  }, [setTweak]);
}

/* Shared panel. `children` = optional page-specific sections (shown first). */
function SiteTweaks({ tweaks, setTweak, children }) {
  return (
    <TweaksPanel title="Tweaks">
      {children}

      <TweakSection label="Wygląd">
        <TweakRadio
          label="Motyw"
          value={tweaks.mode || "light"}
          onChange={(v) => setTweak("mode", v)}
          options={[
            { value: "light", label: "Jasny" },
            { value: "dark",  label: "Ciemny" },
          ]}
        />
        <TweakColor
          label="Akcent"
          value={tweaks.accent}
          onChange={(v) => setTweak("accent", v)}
          options={[ACCENT_HEX.coral, ACCENT_HEX.amber, ACCENT_HEX.baltic, ACCENT_HEX.seafoam]}
        />
        <TweakRadio
          label="Rogi"
          value={tweaks.corners}
          onChange={(v) => setTweak("corners", v)}
          options={[
            { value: "soft",  label: "Miękkie" },
            { value: "sharp", label: "Kanciaste" },
          ]}
        />
        <TweakToggle
          label="Tekstura tła"
          value={tweaks.texture}
          onChange={(v) => setTweak("texture", v)}
        />
      </TweakSection>

      <TweakSection label="Mobile">
        <TweakToggle
          label="Sticky CTA"
          value={tweaks.stickyCta}
          onChange={(v) => setTweak("stickyCta", v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

Object.assign(window, { useSiteTheme, SiteTweaks, ACCENT_HEX });
