// styles/blueprint/blueprintDistrictHud.css.ts

// ==============================
// Imports
// ==============================
import { style } from "@vanilla-extract/css";

import { vars } from "../theme.css";

// ==============================
// Classes
// ==============================
export const districtGroup = style({
  display: "flex",
  alignItems: "center",
  gap: vars.space.sm,
  flexWrap: "nowrap",
});

export const teleportButton = style({
  appearance: "none",
  border: `1px solid ${vars.color.border}`,
  background: vars.color.surface,
  color: vars.color.text,
  borderRadius: vars.radius.md,
  padding: `${vars.space.sm} ${vars.space.md}`,
  fontWeight: vars.typography.weight.semibold,
  lineHeight: vars.typography.leading.tight,
  cursor: "pointer",
  transition: `transform ${vars.motion.normal} ${vars.motion.easing.standard}, background ${vars.motion.normal} ${vars.motion.easing.standard}, border-color ${vars.motion.normal} ${vars.motion.easing.standard}`,

  selectors: {
    "&:hover": {
      background: vars.color.surfaceHover,
      transform: "translateY(-1px)",
    },
    "&:active": {
      background: vars.color.surfaceActive,
      transform: "translateY(0)",
    },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.focus}`,
      outlineOffset: 2,
    },
  },
});

export const openPageLink = style({
  fontSize: vars.typography.size.sm,
  color: vars.color.muted,
  textDecoration: "underline",
  textUnderlineOffset: "3px",

  selectors: {
    "&:hover": { color: vars.color.text },
    "&:focus-visible": {
      outline: `2px solid ${vars.color.focus}`,
      outlineOffset: 2,
      borderRadius: vars.radius.xs,
    },
  },
});
