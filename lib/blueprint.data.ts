// lib/blueprint.data.ts

// ==============================
// Types
// ==============================
export type BlueprintPoiKind = "shop" | "venue" | "ngo";

export type BlueprintPoi = {
  id: string;
  title: string;
  tagline: string;
  href: string; // extern
  kind: BlueprintPoiKind;
  shortLabel: string; // text scurt pentru steag (ex. CMF)
  x: number; // world coords (px)
  y: number; // world coords (px)
};

// ==============================
// Data
// ==============================
export const BLUEPRINT_POIS = [
  {
    id: "cmf-baiamare",
    title: "CMF Baia Mare",
    tagline: "Construcții & monumente funerare",
    href: "https://cmfbaiamare.ro/",
    kind: "shop",
    shortLabel: "CMF",
    x: -420,
    y: -120,
  },
  {
    id: "zephira-events",
    title: "Zephira Events",
    tagline: "Sală de evenimente",
    href: "https://zephiraevents.ro/",
    kind: "venue",
    shortLabel: "ZEPH",
    x: 220,
    y: -220,
  },
  {
    id: "fraternitacss",
    title: "FraternitaCSS",
    tagline: "Asociație umanitară",
    href: "https://fraternitacss.com/",
    kind: "ngo",
    shortLabel: "FCS",
    x: 120,
    y: 220,
  },
] as const satisfies readonly BlueprintPoi[];
