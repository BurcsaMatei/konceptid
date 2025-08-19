// styles/header.css.ts
import { style } from "@vanilla-extract/css";

/* container general */
export const headerRoot = style({
  position: "sticky",
  top: 0,
  zIndex: 50,
  background: "#fff",
  boxShadow: "0 8px 18px -16px rgba(0,0,0,0.32)", // umbră doar jos
});

/* conținut pe orizontală */
export const headerInner = style({
  display: "grid",
  gridTemplateColumns: "auto 1fr auto",
  alignItems: "center",
  gap: "12px",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "10px clamp(16px, 4vw, 24px)",
});

/* nav desktop */
export const navDesktop = style({
  display: "none",
  "@media": {
    "screen and (min-width: 900px)": {
      display: "flex",
      gap: "18px",
    },
  },
});

export const navLink = style({
  textDecoration: "none",
  color: "#111",
  fontWeight: 600,
  lineHeight: 1,
  padding: "10px 8px",
  borderRadius: 10,
  ":focus-visible": { outline: "2px solid #111", outlineOffset: 2 },
  selectors: { "&:hover": { background: "rgba(0,0,0,0.04)" } },
});

/* buton mobil (hamburger) */
export const mobileBtn = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "#fff",
  cursor: "pointer",
  ":focus-visible": { outline: "2px solid #111", outlineOffset: 2 },
  "@media": { "screen and (min-width: 900px)": { display: "none" } },
});

/* overlay + panou mobil */
export const overlay = style({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  opacity: 0,
  pointerEvents: "none",
  transition: "opacity .18s ease",
});
export const overlayOpen = style({ opacity: 1, pointerEvents: "auto" });

export const panel = style({
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "min(82vw, 420px)",
  background: "#fff",
  transform: "translateX(100%)",
  transition: "transform .22s ease",
  boxShadow: "-10px 0 24px rgba(0,0,0,.18)",
  padding: "16px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});
export const panelOpen = style({ transform: "translateX(0)" });

export const panelNav = style({ display: "grid", gap: "6px", marginTop: "12px" });
export const panelLink = style({
  textDecoration: "none",
  color: "#111",
  fontWeight: 700,
  padding: "12px",
  borderRadius: 12,
  ":focus-visible": { outline: "2px solid #111", outlineOffset: 2 },
  selectors: { "&:hover": { background: "rgba(0,0,0,0.05)" } },
});
