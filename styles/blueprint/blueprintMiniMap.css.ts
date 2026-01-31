// styles/blueprint/blueprintMiniMap.css.ts

// ==============================
// Imports
// ==============================
import { style } from "@vanilla-extract/css";

// ==============================
// Classes
// ==============================
export const wrap = style({
  position: "absolute",
  top: 14,
  right: 14,
  zIndex: 30,
  pointerEvents: "none", // nu fură drag-ul
});

export const card = style({
  width: 150,
  height: 110,
  borderRadius: 16,
  border: "1px solid rgba(0,0,0,0.08)",
  background: "rgba(255,255,255,0.92)",
  boxShadow: "0 10px 28px rgba(0,0,0,0.12)",
  backdropFilter: "blur(10px)",
  padding: 10,
});

export const map = style({
  position: "relative",
  width: "100%",
  height: "100%",
  borderRadius: 12,
  background: "rgba(0,0,0,0.03)",
  overflow: "hidden",
});

export const viewRect = style({
  position: "absolute",
  borderRadius: 8,
  border: "2px solid rgba(0, 98, 255, 0.85)",
  background: "rgba(0, 98, 255, 0.08)",
});

export const poiDot = style({
  position: "absolute",
  width: 6,
  height: 6,
  borderRadius: 999,
  background: "rgba(0,0,0,0.28)",
});

export const hubDot = style({
  position: "absolute",
  width: 8,
  height: 8,
  borderRadius: 999,
  background: "rgba(0, 98, 255, 0.85)",
  boxShadow: "0 0 0 2px rgba(255,255,255,0.9)",
});
