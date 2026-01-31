// lib/blueprint.data.ts

// ==============================
// Types
// ==============================
export type BlueprintPoiKind = "shop" | "venue" | "ngo";

export type BlueprintBadge = "Next.js" | "TypeScript" | "Vanilla Extract" | "SEO";

export type BlueprintPoi = {
  id: "cmf" | "zephira" | "fraternitacss";
  kind: BlueprintPoiKind;

  // Map placement (world coords)
  x: number;
  y: number;

  // Identity
  title: string;
  shortLabel: string;

  // Brand / links
  domain: string;
  siteUrl: string;
  caseSlug: string;
  caseHref: string;

  // Visuals
  logoSrc: string;

  // Copy
  tagline: string;
  location: string;
  address: string;

  // Tech
  badges: readonly BlueprintBadge[];
};

// ==============================
// Constante
// ==============================
const DEFAULT_BADGES = [
  "Next.js",
  "TypeScript",
  "Vanilla Extract",
  "SEO",
] as const satisfies readonly BlueprintBadge[];

// NOTE: coordonatele sunt MVP (pot fi ajustate ulterior fără să schimbăm API-ul)
export const BLUEPRINT_POIS = [
  {
    id: "cmf",
    kind: "shop",
    x: -420,
    y: 220,

    title: "CMF Baia Mare",
    shortLabel: "CMF",

    domain: "cmfbaiamare.ro",
    siteUrl: "https://cmfbaiamare.ro/",
    caseSlug: "cmf-baia-mare",
    caseHref: "/portfolio/cmf-baia-mare",

    logoSrc: "/images/blueprint/logo-cmf.svg",

    tagline:
      "Monumente funerare premium, executate curat și rapid, cu accent pe detalii și încredere.",
    location: "Baia Mare, Maramureș, România",
    address: "Str. Dragoș Vodă 7, Baia Mare",

    badges: DEFAULT_BADGES,
  },

  {
    id: "zephira",
    kind: "venue",
    x: 520,
    y: 90,

    title: "Zephira Events",
    shortLabel: "ZEPHIRA",

    domain: "zephiraevents.ro",
    siteUrl: "https://zephiraevents.ro/",
    caseSlug: "zephira-events",
    caseHref: "/portfolio/zephira-events",

    logoSrc: "/images/blueprint/logo-zephira.svg",

    tagline:
      "Sală de evenimente elegantă, cu pachete clare și organizare cap-coadă — fără stres, fără compromis.",
    location: "Focșani, Vrancea, România",
    address: "Str. Câmpineanca nr. 498, Focșani",

    badges: DEFAULT_BADGES,
  },

  {
    id: "fraternitacss",
    kind: "ngo",
    x: 140,
    y: 520,

    title: "FraternitaCSS",
    shortLabel: "FRAT",

    domain: "fraternitacss.com",
    siteUrl: "https://fraternitacss.com/",
    caseSlug: "fraternitacss",
    caseHref: "/portfolio/fraternitacss",

    logoSrc: "/images/blueprint/logo-css.svg",

    tagline:
      "Asociație umanitară cu impact real: ajutor concret pentru oameni reali, comunicat simplu și transparent.",
    location: "Baia Mare, Maramureș, România",
    address: "Splaiul Republicii 2, Baia Mare",

    badges: DEFAULT_BADGES,
  },
] as const satisfies readonly BlueprintPoi[];
