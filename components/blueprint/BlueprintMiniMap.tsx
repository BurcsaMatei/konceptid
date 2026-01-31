// components/blueprint/BlueprintMiniMap.tsx

// ==============================
// Imports
// ==============================
import * as React from "react";

import { BLUEPRINT_DISTRICTS } from "../../lib/blueprint.districts";
import * as s from "../../styles/blueprint/blueprintMiniMap.css";

// ==============================
// Types
// ==============================
type Vec2 = { x: number; y: number };
type Size2 = { width: number; height: number };
type Point = { x: number; y: number };

type Props = Record<string, unknown> & {
  zoom?: number;
  offset?: Vec2;
  stageSize?: Size2 | null;
  points?: readonly Point[];
  pois?: readonly Point[];
  hubs?: readonly Point[];
  districts?: readonly Point[];
};

// ==============================
// Utils
// ==============================
function isNum(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}
function isVec2(v: unknown): v is Vec2 {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return isNum(o.x) && isNum(o.y);
}
function isSize2(v: unknown): v is Size2 {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return isNum(o.width) && isNum(o.height);
}
function isPointArray(v: unknown): v is readonly Point[] {
  if (!Array.isArray(v)) return false;
  return v.every(
    (p) => p && typeof p === "object" && isNum((p as Point).x) && isNum((p as Point).y),
  );
}
function clamp(n: number, a: number, b: number): number {
  return Math.max(a, Math.min(b, n));
}

// ==============================
// Component
// ==============================
export default function BlueprintMiniMap(props: Props): React.JSX.Element | null {
  const raw = props as Record<string, unknown>;

  const zoom = isNum(props.zoom) ? props.zoom : isNum(raw.scale) ? (raw.scale as number) : 1;

  const offset = (isVec2(props.offset) ? props.offset : null) ??
    (isVec2(raw.pan) ? (raw.pan as Vec2) : null) ??
    (isVec2(raw.translate) ? (raw.translate as Vec2) : null) ?? { x: 0, y: 0 };

  const stageSize =
    (isSize2(props.stageSize) ? props.stageSize : null) ??
    (isSize2(raw.viewportSize) ? (raw.viewportSize as Size2) : null) ??
    (isSize2(raw.size) ? (raw.size as Size2) : null) ??
    null;

  const pois =
    (isPointArray(props.points) ? props.points : null) ??
    (isPointArray(props.pois) ? props.pois : null) ??
    (isPointArray(raw.poiPoints) ? (raw.poiPoints as readonly Point[]) : null) ??
    [];

  const hubsFromProps =
    (isPointArray(props.hubs) ? props.hubs : null) ??
    (isPointArray(props.districts) ? props.districts : null) ??
    (isPointArray(raw.hubPoints) ? (raw.hubPoints as readonly Point[]) : null) ??
    null;

  const hubs: readonly Point[] =
    hubsFromProps ?? BLUEPRINT_DISTRICTS.map((d) => ({ x: d.x, y: d.y }));

  const allPoints = [...pois, ...hubs];
  if (allPoints.length === 0) return null;

  // bounds world
  let minX = allPoints[0]!.x;
  let maxX = allPoints[0]!.x;
  let minY = allPoints[0]!.y;
  let maxY = allPoints[0]!.y;

  for (const p of allPoints) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }

  const padX = (maxX - minX) * 0.18 + 60;
  const padY = (maxY - minY) * 0.18 + 60;
  minX -= padX;
  maxX += padX;
  minY -= padY;
  maxY += padY;

  const W = maxX - minX || 1;
  const H = maxY - minY || 1;

  const toMini = (p: Point): { left: string; top: string } => {
    const nx = (p.x - minX) / W;
    const ny = (p.y - minY) / H;
    return {
      left: `${clamp(nx * 100, 0, 100)}%`,
      top: `${clamp(ny * 100, 0, 100)}%`,
    };
  };

  // viewport rect (dacă avem stageSize)
  let view: { left: string; top: string; width: string; height: string } | null = null;

  if (stageSize) {
    const worldLeft = -offset.x / zoom;
    const worldTop = -offset.y / zoom;
    const worldRight = (stageSize.width - offset.x) / zoom;
    const worldBottom = (stageSize.height - offset.y) / zoom;

    const nx = (worldLeft - minX) / W;
    const ny = (worldTop - minY) / H;
    const nw = (worldRight - worldLeft) / W;
    const nh = (worldBottom - worldTop) / H;

    view = {
      left: `${clamp(nx * 100, 0, 100)}%`,
      top: `${clamp(ny * 100, 0, 100)}%`,
      width: `${clamp(nw * 100, 0, 100)}%`,
      height: `${clamp(nh * 100, 0, 100)}%`,
    };
  }

  return (
    <div className={s.wrap} aria-hidden="true">
      <div className={s.card}>
        <div className={s.map}>
          {pois.map((p, i) => {
            const pos = toMini(p);
            return <i key={`p-${i}`} className={s.poiDot} style={pos} />;
          })}

          {hubs.map((p, i) => {
            const pos = toMini(p);
            return <i key={`h-${i}`} className={s.hubDot} style={pos} />;
          })}

          {view ? <div className={s.viewRect} style={view} /> : null}
        </div>
      </div>
    </div>
  );
}
