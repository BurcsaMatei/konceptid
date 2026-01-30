// styles/homepage/blueprintIndex.css.ts

import { style } from "@vanilla-extract/css";

export const stage = style({
  paddingBlock: "clamp(36px, 6vw, 80px)",
});

export const title = style({
  margin: 0,
  fontSize: "clamp(34px, 5.2vw, 60px)",
  lineHeight: 1.05,
  letterSpacing: "-0.02em",
});

export const lede = style({
  marginTop: 12,
  marginBottom: 22,
  maxWidth: "62ch",
  fontSize: "clamp(16px, 2vw, 18px)",
  opacity: 0.86,
});

export const ctaRow = style({
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
});

export const cta = style({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  borderRadius: 999,
  border: "1px solid currentColor",
  textDecoration: "none",
  fontWeight: 800,
  lineHeight: 1,
  userSelect: "none",
  transition: "transform 120ms ease, background-color 120ms ease, opacity 120ms ease",
  selectors: {
    "&:hover": {
      transform: "translateY(-1px)",
      backgroundColor: "rgba(127,127,127,0.12)",
    },
    "&:active": {
      transform: "translateY(0px)",
      opacity: 0.92,
    },
    "&:focus-visible": {
      outline: "2px solid currentColor",
      outlineOffset: 3,
    },
  },
});

export const note = style({
  marginTop: 16,
  fontSize: 14,
  opacity: 0.72,
});
