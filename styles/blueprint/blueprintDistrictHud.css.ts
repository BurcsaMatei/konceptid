// styles/blueprint/blueprintDistrictHud.css.ts

// ==============================
// Imports
// ==============================
import { style } from "@vanilla-extract/css";

// ==============================
// Constante
// ==============================
const LEFT = 12;
const TOP = 86; // sub hint-ul din colț (≈ din screenshot)
const PANEL_W = "clamp(160px, 14vw, 210px)";

// ==============================
// Classes
// ==============================
const dockBase = style({
  position: "absolute",
  left: LEFT,
  top: TOP,

  width: PANEL_W,
  maxHeight: "calc(100svh - 110px)",

  padding: 10,
  borderRadius: 16,
  border: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(255,255,255,0.92)",
  boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
  backdropFilter: "blur(10px)",

  overflow: "auto",
  zIndex: 40,
  pointerEvents: "auto",
});

const innerBase = style({
  display: "grid",
  gap: 10,
});

const resetBase = style({
  appearance: "none",
  border: "1px solid rgba(0,0,0,0.14)",
  background: "#fff",
  borderRadius: 999,
  padding: "8px 12px",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  width: "fit-content",
});

const listBase = style({
  display: "grid",
  gap: 10,
});

const groupBase = style({
  display: "grid",
  gap: 6,
});

const teleportBtnBase = style({
  appearance: "none",
  border: "1px solid rgba(0,0,0,0.14)",
  background: "#fff",
  borderRadius: 12,
  padding: "10px 12px",
  fontSize: 13,
  fontWeight: 700,
  cursor: "pointer",
  width: "100%",
  textAlign: "center",
});

const openLinkBase = style({
  fontSize: 12,
  color: "rgba(0,0,0,0.65)",
  textDecoration: "underline",
  width: "fit-content",
});

// ==============================
// Exporturi (cu alias-uri pentru compat)
// ==============================
export const dock = dockBase;
export const dockInner = innerBase;
export const resetButton = resetBase;
export const districtsList = listBase;

export const districtGroup = groupBase;
export const teleportButton = teleportBtnBase;
export const openPageLink = openLinkBase;

// alias-uri uzuale (ca să nu-ți pice importurile)
export const hud = dockBase;
export const hudInner = innerBase;
export const hudResetButton = resetBase;
export const hudList = listBase;
export const district = groupBase;
export const districtButton = teleportBtnBase;
export const districtLink = openLinkBase;
