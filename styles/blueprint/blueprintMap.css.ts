// styles/blueprint/blueprintMap.css.ts

// ==============================
// Imports
// ==============================
import { style } from "@vanilla-extract/css";

import { mq, vars } from "../theme.css";

// ==============================
// Types
// ==============================
type Kind = "shop" | "venue" | "ngo";

// ==============================
// Helpers
// ==============================
const poiKindVars: Record<Kind, { accent: string; fill: string }> = {
  shop: { accent: vars.color.primary, fill: "rgba(85, 97, 242, 0.12)" },
  venue: { accent: vars.color.secondary, fill: "rgba(168, 213, 186, 0.16)" },
  ngo: { accent: "rgba(170, 176, 255, 1)", fill: "rgba(170, 176, 255, 0.14)" },
};

// ==============================
// Classes
// ==============================
export const root = style({
  position: "relative",
  width: "100%",

  // ✅ eliminăm “zona albă” — mapa ocupă tot viewport-ul rămas (sub header)
  height: "calc(100svh - var(--bp-header-h, 0px))",
  minHeight: 560,

  borderTop: `1px solid ${vars.color.border}`,
  borderBottom: `1px solid ${vars.color.border}`,
  overflow: "hidden",
});

export const stage = style({
  position: "absolute",
  inset: 0,
  cursor: "grab",
  userSelect: "none",
  touchAction: "none",
  overscrollBehavior: "none",

  // blueprint background: dots + fine grid
  backgroundImage: `
    radial-gradient(circle at 1px 1px, rgba(127,127,127,0.22) 1px, transparent 0),
    linear-gradient(rgba(127,127,127,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(127,127,127,0.08) 1px, transparent 1px)
  `,
  backgroundSize: "20px 20px, 80px 80px, 80px 80px",
  backgroundPosition: "0 0, 0 0, 0 0",
});

export const stageGrabbing = style({
  cursor: "grabbing",
});

export const layer = style({
  position: "absolute",
  inset: 0,
  transformOrigin: "0 0",
  willChange: "transform",
});

export const hint = style({
  position: "absolute",
  top: vars.space.md,
  left: vars.space.md,
  zIndex: vars.z.overlay,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  padding: `${vars.space.sm} ${vars.space.md}`,
  boxShadow: vars.shadow.sm,
  maxWidth: "46ch",
  fontSize: vars.typography.size.sm,
  lineHeight: vars.typography.leading.normal,
  opacity: 0.96,
});

export const hintTitle = style({
  margin: 0,
  fontWeight: 800,
  fontSize: vars.typography.size.sm,
});

export const hintText = style({
  margin: `${vars.space.xs} 0 0`,
  opacity: 0.78,
});

/** HUD (dock) — stânga viewport-ului */
export const hud = style({
  position: "absolute",
  left: vars.space.md,
  bottom: vars.space.md,
  zIndex: vars.z.overlay,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  background: vars.color.surface,
  boxShadow: vars.shadow.sm,
  width: "min(520px, calc(100vw - 32px))",
});

export const hudInner = style({
  display: "grid",
  gap: vars.space.md,
  padding: `${vars.space.sm} ${vars.space.md}`,

  "@media": {
    [mq.md]: {
      padding: `${vars.space.md} ${vars.space.lg}`,
    },
  },
});

export const hudDistricts = style({
  display: "grid",
  gridAutoFlow: "row",
  gap: vars.space.sm,
});

/** Reset btn */
export const hudBtn = style({
  justifySelf: "start",
  border: `1px solid ${vars.color.border}`,
  borderRadius: 999,
  padding: "8px 12px",
  background: "transparent",
  color: "inherit",
  fontWeight: 800,
  lineHeight: 1,
  cursor: "pointer",
  transition: `transform ${vars.motion.fast} ${vars.motion.easing.standard}, background-color ${vars.motion.fast} ${vars.motion.easing.standard}`,
  selectors: {
    "&:hover": {
      transform: "translateY(-1px)",
      backgroundColor: "rgba(127,127,127,0.10)",
    },
    "&:active": {
      transform: "translateY(0px)",
      backgroundColor: "rgba(127,127,127,0.14)",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.focus}`,
      outlineOffset: 2,
    },
  },
});

// ---------- District Hub (building) ----------
export const districtHub = style({
  position: "absolute",
  transform: "translate3d(var(--hub-x), var(--hub-y), 0)",
  width: 220,
  height: 110,
  display: "grid",
  placeItems: "end center",
});

export const districtHubLink = style({
  width: "100%",
  height: "100%",
  display: "block",
  position: "relative",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.xl,
  background: "rgba(127,127,127,0.06)",
  boxShadow: vars.shadow.sm,
  textDecoration: "none",
  color: "inherit",
  overflow: "hidden",
  transition: `transform ${vars.motion.fast} ${vars.motion.easing.standard}, box-shadow ${vars.motion.fast} ${vars.motion.easing.standard}`,

  selectors: {
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: vars.shadow.md,
    },
    "&:active": {
      transform: "translateY(0px)",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.focus}`,
      outlineOffset: 2,
    },
  },
});

export const districtHubRoof = style({
  position: "absolute",
  left: 24,
  right: 24,
  top: 18,
  height: 20,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  background: "rgba(127,127,127,0.10)",
});

export const districtHubBody = style({
  position: "absolute",
  left: 16,
  right: 16,
  bottom: 14,
  height: 56,
  borderRadius: vars.radius.lg,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.cardBg,
});

export const districtHubBadge = style({
  position: "absolute",
  left: 12,
  top: 10,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 10px",
  borderRadius: 999,
  border: `1px solid ${vars.color.border}`,
  background: "rgba(127,127,127,0.10)",
  fontSize: vars.typography.size.sm,
  fontWeight: 900,
  letterSpacing: "0.02em",
});

export const districtHubDot = style({
  width: 10,
  height: 10,
  borderRadius: 999,
  background: vars.color.focus,
});

export const districtHubLabel = style({
  position: "absolute",
  left: 12,
  right: 12,
  bottom: 14,
  display: "grid",
  gap: 2,
});

export const districtHubTitle = style({
  margin: 0,
  fontSize: vars.typography.size.sm,
  fontWeight: 900,
  lineHeight: vars.typography.leading.tight,
});

export const districtHubHint = style({
  margin: 0,
  fontSize: vars.typography.size.xs,
  opacity: 0.78,
  lineHeight: vars.typography.leading.normal,
});

// ---------- POI ----------
export const poi = style({
  position: "absolute",
  transform: "translate3d(var(--poi-x), var(--poi-y), 0)",
  width: 140,
  height: 120,
  display: "grid",
  placeItems: "end center",
  cursor: "pointer",
});

export const poiHit = style({
  width: "100%",
  height: "100%",
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.lg,
  background: "rgba(127,127,127,0.06)",
  boxShadow: vars.shadow.sm,
  position: "relative",
  overflow: "hidden",
  transition: `transform ${vars.motion.fast} ${vars.motion.easing.standard}, box-shadow ${vars.motion.fast} ${vars.motion.easing.standard}`,
  cursor: "pointer",
  selectors: {
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: vars.shadow.md,
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.focus}`,
      outlineOffset: 2,
    },
  },
});

export const poiBody = style({
  position: "absolute",
  left: 14,
  right: 14,
  bottom: 12,
  height: 54,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  background: "rgba(255,255,255,0.4)",
  selectors: {
    [`${poiHit} &`]: {
      background: vars.color.cardBg,
    },
  },
});

export const poiRoof = style({
  position: "absolute",
  left: 22,
  right: 22,
  bottom: 58,
  height: 20,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  background: "rgba(127,127,127,0.10)",
});

export const poiFlag = style({
  position: "absolute",
  left: 12,
  top: 10,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "6px 10px",
  borderRadius: 999,
  border: `1px solid ${vars.color.border}`,
  background: "rgba(127,127,127,0.10)",
  fontSize: vars.typography.size.sm,
  fontWeight: 900,
  letterSpacing: "0.06em",
});

export const poiFlagDot = style({
  width: 10,
  height: 10,
  borderRadius: 999,
  background: "var(--poi-accent)",
});

export const poiMeta = style({
  position: "absolute",
  left: 12,
  right: 12,
  bottom: 10,
  display: "grid",
  gap: 2,
});

export const poiTitle = style({
  margin: 0,
  fontSize: vars.typography.size.sm,
  fontWeight: 900,
  lineHeight: vars.typography.leading.tight,
});

export const poiTagline = style({
  margin: 0,
  fontSize: vars.typography.size.xs,
  opacity: 0.78,
  lineHeight: vars.typography.leading.normal,
});

// kind variants (via CSS vars)
export const poiKind = {
  shop: style({
    vars: { "--poi-accent": poiKindVars.shop.accent, "--poi-fill": poiKindVars.shop.fill },
  }),
  venue: style({
    vars: { "--poi-accent": poiKindVars.venue.accent, "--poi-fill": poiKindVars.venue.fill },
  }),
  ngo: style({
    vars: { "--poi-accent": poiKindVars.ngo.accent, "--poi-fill": poiKindVars.ngo.fill },
  }),
} satisfies Record<Kind, string>;

export const poiFill = style({
  position: "absolute",
  inset: 0,
  background: "var(--poi-fill)",
});

// ---------- Modal ----------
export const modalOverlay = style({
  position: "absolute",
  inset: 0,
  zIndex: vars.z.modal,
  display: "grid",
  placeItems: "center",
  padding: vars.space.md,
});

export const modalBackdrop = style({
  position: "absolute",
  inset: 0,
  border: 0,
  padding: 0,
  margin: 0,
  background: vars.color.overlay,
  cursor: "pointer",
});

export const modal = style({
  width: "min(560px, 92vw)",
  borderRadius: vars.radius.xl,
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  boxShadow: vars.shadow.md,
  padding: vars.space.lg,
  position: "relative",
  zIndex: 1,
});

export const modalClose = style({
  position: "absolute",
  top: 10,
  right: 10,
  width: 40,
  height: 40,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  background: "transparent",
  color: "inherit",
  cursor: "pointer",
  fontSize: 20,
  lineHeight: 1,
  selectors: {
    "&:hover": { background: "rgba(127,127,127,0.10)" },
    "&:focus-visible": { outline: `2px solid ${vars.color.focus}`, outlineOffset: 2 },
  },
});

export const modalTitle = style({
  margin: 0,
  fontSize: vars.typography.size.xl,
  fontWeight: 900,
  lineHeight: vars.typography.leading.tight,
});

export const modalText = style({
  marginTop: vars.space.sm,
  marginBottom: 0,
  opacity: 0.82,
});

export const modalActions = style({
  marginTop: vars.space.md,
  display: "flex",
  gap: vars.space.sm,
  flexWrap: "wrap",
});

export const modalAction = style({
  textDecoration: "none",
  borderRadius: 999,
  border: `1px solid ${vars.color.border}`,
  padding: "10px 14px",
  fontWeight: 900,
  lineHeight: 1,
  selectors: {
    "&:hover": { background: "rgba(127,127,127,0.10)" },
    "&:active": { background: "rgba(127,127,127,0.14)" },
  },
});
