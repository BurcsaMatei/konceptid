// lib/blueprint.districts.ts

// ==============================
// Types
// ==============================
export type BlueprintDistrictId = "concept" | "portfolio" | "marketplace" | "auctions" | "blog";

export type BlueprintDistrict = {
  id: BlueprintDistrictId;
  label: string;
  pageHref: string;
  x: number;
  y: number;
  zoom: number;
};

// ==============================
// Data (provizoriu, ajustăm după)
// Coordonate în "world space" (aceeași unitate ca POI-urile).
// ==============================
export const BLUEPRINT_DISTRICTS: readonly BlueprintDistrict[] = [
  { id: "concept", label: "Concept", pageHref: "/concept", x: -520, y: -320, zoom: 1.15 },
  { id: "portfolio", label: "Portfolio", pageHref: "/portfolio", x: 520, y: -320, zoom: 1.15 },
  {
    id: "marketplace",
    label: "Marketplace",
    pageHref: "/marketplace",
    x: -520,
    y: 360,
    zoom: 1.15,
  },
  { id: "auctions", label: "Auctions", pageHref: "/auctions", x: 520, y: 360, zoom: 1.15 },

  // Blog HUB (meniu + minimap)
  { id: "blog", label: "Blog", pageHref: "/blog", x: 0, y: -520, zoom: 1.15 },
] as const;

// ==============================
// Helpers
// ==============================
export const DISTRICT_BY_ID = Object.freeze(
  Object.fromEntries(BLUEPRINT_DISTRICTS.map((d) => [d.id, d])) as Record<
    BlueprintDistrictId,
    BlueprintDistrict
  >,
);
