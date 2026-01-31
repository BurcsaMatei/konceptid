// components/blueprint/BlueprintMap.tsx

// ==============================
// Imports
// ==============================
import { useEffect, useMemo, useRef, useState } from "react";

import type { BlueprintPoi } from "../../lib/blueprint.data";
import { BLUEPRINT_POIS } from "../../lib/blueprint.data";
import * as sp from "../../styles/blueprint/blueprintMap.css";
import SmartLink from "../SmartLink";
import Img from "../ui/Img";

// ==============================
// Types
// ==============================
type Point = { x: number; y: number };
type CssVars = Record<`--${string}`, string>;

type KeyState = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
  up: boolean;
  left: boolean;
  down: boolean;
  right: boolean;
};

type ActivePoi = BlueprintPoi | null;

type Bounds = { minX: number; minY: number; maxX: number; maxY: number; w: number; h: number };

type TeleportOpts = {
  ms?: number;
  zoom?: number;
  openModal?: boolean;
};

type CamAnim = {
  raf: number | null;
  start: number;
  ms: number;
  fromOffset: Point;
  toOffset: Point;
  fromZoom: number;
  toZoom: number;
};

// ==============================
// Utils
// ==============================
function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function isEditableTarget(t: EventTarget | null): boolean {
  if (!t || !(t instanceof HTMLElement)) return false;
  const tag = t.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  return t.isContentEditable;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ==============================
// Component
// ==============================
export default function BlueprintMap() {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const minimapRef = useRef<HTMLDivElement | null>(null);

  const [zoom, setZoom] = useState<number>(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const [activePoi, setActivePoi] = useState<ActivePoi>(null);
  const [selectedPoi, setSelectedPoi] = useState<ActivePoi>(null);

  const [minimapSize, setMinimapSize] = useState<{ w: number; h: number }>({ w: 1, h: 1 });

  const zoomRef = useRef(zoom);
  const offsetRef = useRef(offset);

  const dragRef = useRef<{
    active: boolean;
    pointerId: number | null;
    start: Point;
    startOffset: Point;
  }>({ active: false, pointerId: null, start: { x: 0, y: 0 }, startOffset: { x: 0, y: 0 } });

  const keysRef = useRef<KeyState>({
    w: false,
    a: false,
    s: false,
    d: false,
    up: false,
    left: false,
    down: false,
    right: false,
  });

  const hasCenteredRef = useRef(false);

  const animRef = useRef<CamAnim>({
    raf: null,
    start: 0,
    ms: 0,
    fromOffset: { x: 0, y: 0 },
    toOffset: { x: 0, y: 0 },
    fromZoom: 1,
    toZoom: 1,
  });

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    offsetRef.current = offset;
  }, [offset]);

  // center view once (client only)
  useEffect(() => {
    if (hasCenteredRef.current) return;
    const el = stageRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setOffset({ x: rect.width / 2, y: rect.height / 2 });
    hasCenteredRef.current = true;
  }, []);

  // minimap measure
  useEffect(() => {
    const el = minimapRef.current;
    if (!el) return;

    const read = () => {
      const r = el.getBoundingClientRect();
      setMinimapSize({ w: Math.max(1, r.width), h: Math.max(1, r.height) });
    };

    read();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => read());
      ro.observe(el);
      return () => ro?.disconnect();
    }

    const onResize = () => read();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // ESC closes modal
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePoi(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // WASD / arrows movement loop
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isEditableTarget(e.target)) return;

      const k = e.key.toLowerCase();
      const keys = keysRef.current;

      if (k === "w") keys.w = true;
      if (k === "a") keys.a = true;
      if (k === "s") keys.s = true;
      if (k === "d") keys.d = true;

      if (e.key === "ArrowUp") keys.up = true;
      if (e.key === "ArrowLeft") keys.left = true;
      if (e.key === "ArrowDown") keys.down = true;
      if (e.key === "ArrowRight") keys.right = true;
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const keys = keysRef.current;

      if (k === "w") keys.w = false;
      if (k === "a") keys.a = false;
      if (k === "s") keys.s = false;
      if (k === "d") keys.d = false;

      if (e.key === "ArrowUp") keys.up = false;
      if (e.key === "ArrowLeft") keys.left = false;
      if (e.key === "ArrowDown") keys.down = false;
      if (e.key === "ArrowRight") keys.right = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let raf = 0;
    let last = performance.now();

    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;

      const keys = keysRef.current;
      const any =
        keys.w || keys.a || keys.s || keys.d || keys.up || keys.left || keys.down || keys.right;

      if (any) {
        stopCamAnim();

        const speed = 520; // px/sec (screen space)
        const z = zoomRef.current || 1;
        const s = speed * dt;

        const dx = (keys.a || keys.left ? s : 0) + (keys.d || keys.right ? -s : 0); // camera move
        const dy = (keys.w || keys.up ? s : 0) + (keys.s || keys.down ? -s : 0);

        setOffset((prev) => ({ x: prev.x + dx * z, y: prev.y + dy * z }));
      }

      raf = window.requestAnimationFrame(tick);
    };

    raf = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  const worldBounds: Bounds = useMemo(() => {
    const pad = 720;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    for (const p of BLUEPRINT_POIS) {
      minX = Math.min(minX, p.x);
      minY = Math.min(minY, p.y);
      maxX = Math.max(maxX, p.x);
      maxY = Math.max(maxY, p.y);
    }

    if (!Number.isFinite(minX)) {
      minX = -1000;
      minY = -1000;
      maxX = 1000;
      maxY = 1000;
    }

    minX -= pad;
    minY -= pad;
    maxX += pad;
    maxY += pad;

    return { minX, minY, maxX, maxY, w: Math.max(1, maxX - minX), h: Math.max(1, maxY - minY) };
  }, []);

  function stopCamAnim() {
    const a = animRef.current;
    if (a.raf) {
      window.cancelAnimationFrame(a.raf);
      a.raf = null;
    }
  }

  function animateCamera(toOffset: Point, toZoom: number, ms: number) {
    stopCamAnim();

    const a = animRef.current;
    a.start = performance.now();
    a.ms = Math.max(120, ms);
    a.fromOffset = offsetRef.current;
    a.toOffset = toOffset;
    a.fromZoom = zoomRef.current;
    a.toZoom = toZoom;

    const step = (now: number) => {
      const t = clamp((now - a.start) / a.ms, 0, 1);
      const e = easeInOutCubic(t);

      const nx = a.fromOffset.x + (a.toOffset.x - a.fromOffset.x) * e;
      const ny = a.fromOffset.y + (a.toOffset.y - a.fromOffset.y) * e;
      const nz = a.fromZoom + (a.toZoom - a.fromZoom) * e;

      setOffset({ x: nx, y: ny });
      setZoom(nz);

      if (t < 1) {
        a.raf = window.requestAnimationFrame(step);
      } else {
        a.raf = null;
      }
    };

    a.raf = window.requestAnimationFrame(step);
  }

  function computeCenteredOffset(world: Point, z: number): Point {
    const el = stageRef.current;
    if (!el) return offsetRef.current;

    const rect = el.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    return {
      x: cx - world.x * z,
      y: cy - world.y * z,
    };
  }

  function focusPoi(poi: BlueprintPoi, opts?: TeleportOpts) {
    const ms = opts?.ms ?? 520;
    const targetZoom = clamp(opts?.zoom ?? zoomRef.current, 0.65, 1.6);

    const targetOffset = computeCenteredOffset({ x: poi.x, y: poi.y }, targetZoom);
    animateCamera(targetOffset, targetZoom, ms);

    setSelectedPoi(poi);
    if (opts?.openModal) setActivePoi(poi);
  }

  const onResetView = () => {
    stopCamAnim();

    const el = stageRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    setZoom(1);
    setOffset({ x: rect.width / 2, y: rect.height / 2 });
    setSelectedPoi(null);
  };

  const openPoi = (poi: BlueprintPoi) => {
    setSelectedPoi(poi);
    setActivePoi(poi);
  };

  const closePoi = () => setActivePoi(null);

  // Pointer + wheel listeners (imperativ) => fără warnings jsx-a11y
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;

      stopCamAnim();

      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        // ignore
      }

      dragRef.current.active = true;
      dragRef.current.pointerId = e.pointerId;
      dragRef.current.start = { x: e.clientX, y: e.clientY };
      dragRef.current.startOffset = offsetRef.current;

      setIsDragging(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d.active) return;

      const dx = e.clientX - d.start.x;
      const dy = e.clientY - d.start.y;

      setOffset({ x: d.startOffset.x + dx, y: d.startOffset.y + dy });
    };

    const onPointerUp = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d.active) return;
      if (d.pointerId !== e.pointerId) return;

      d.active = false;
      d.pointerId = null;
      setIsDragging(false);
    };

    const onWheel = (e: WheelEvent) => {
      stopCamAnim();
      e.preventDefault();

      const rect = el.getBoundingClientRect();
      const pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };

      const prevZoom = zoomRef.current;
      const nextZoom = clamp(prevZoom * (e.deltaY > 0 ? 0.92 : 1.08), 0.65, 1.6);

      const prevOffset = offsetRef.current;

      // world point under cursor
      const wx = (pointer.x - prevOffset.x) / prevZoom;
      const wy = (pointer.y - prevOffset.y) / prevZoom;

      // new offset so world point stays under cursor
      const nextOffset = {
        x: pointer.x - wx * nextZoom,
        y: pointer.y - wy * nextZoom,
      };

      setZoom(nextZoom);
      setOffset(nextOffset);
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
      el.removeEventListener("wheel", onWheel as EventListener);
    };
  }, []);

  const layerTransform = useMemo(() => {
    return `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${zoom})`;
  }, [offset.x, offset.y, zoom]);

  const renderPoi = (poi: BlueprintPoi) => {
    const vars: CssVars = {
      "--poi-x": `${poi.x}px`,
      "--poi-y": `${poi.y}px`,
    };

    const kindClass = sp.poiKind[poi.kind];

    return (
      <div key={poi.id} className={`${sp.poi} ${kindClass}`} style={vars}>
        <button
          type="button"
          className={sp.poiHit}
          onClick={() => openPoi(poi)}
          aria-label={`Deschide ${poi.title}`}
        >
          <span className={sp.poiFill} aria-hidden="true" />

          {/* Flag (logo + label) */}
          <span className={sp.poiFlag} aria-hidden="true">
            <span className={sp.poiFlagDot} />
            <span className={sp.poiFlagLogo}>
              <Img src={poi.logoSrc} alt={`${poi.title} logo`} width={22} height={22} />
            </span>
            <span className={sp.poiFlagText}>{poi.shortLabel}</span>
          </span>

          <span className={sp.poiRoof} aria-hidden="true" />
          <span className={sp.poiBody} aria-hidden="true" />

          <span className={sp.poiMeta} aria-hidden="true">
            <span className={sp.poiTitle}>{poi.title}</span>
            <span className={sp.poiTagline}>{poi.tagline}</span>
          </span>
        </button>
      </div>
    );
  };

  // minimap mapping (depinde de offset/zoom ca să fie live)
  const viewRect = useMemo(() => {
    const el = stageRef.current;
    if (!el) return { x: 0, y: 0, w: 0, h: 0 };

    const rect = el.getBoundingClientRect();

    const z = zoom || 1;
    const o = offset;

    const worldLeft = (0 - o.x) / z;
    const worldTop = (0 - o.y) / z;
    const worldRight = (rect.width - o.x) / z;
    const worldBottom = (rect.height - o.y) / z;

    const mmW = minimapSize.w;
    const mmH = minimapSize.h;

    const x = ((worldLeft - worldBounds.minX) / worldBounds.w) * mmW;
    const y = ((worldTop - worldBounds.minY) / worldBounds.h) * mmH;
    const w = ((worldRight - worldLeft) / worldBounds.w) * mmW;
    const h = ((worldBottom - worldTop) / worldBounds.h) * mmH;

    // clamp in minimap bounds (MVP safety)
    const cx = clamp(x, -mmW * 0.25, mmW * 1.25);
    const cy = clamp(y, -mmH * 0.25, mmH * 1.25);
    const cw = clamp(w, 18, mmW * 2);
    const ch = clamp(h, 18, mmH * 2);

    return { x: cx, y: cy, w: cw, h: ch };
  }, [
    minimapSize.h,
    minimapSize.w,
    worldBounds.h,
    worldBounds.minX,
    worldBounds.minY,
    worldBounds.w,
    zoom,
    offset,
  ]);

  const minimapVars: CssVars = useMemo(() => {
    return {
      "--vp-x": `${viewRect.x}px`,
      "--vp-y": `${viewRect.y}px`,
      "--vp-w": `${viewRect.w}px`,
      "--vp-h": `${viewRect.h}px`,
    };
  }, [viewRect.h, viewRect.w, viewRect.x, viewRect.y]);

  const renderMiniPoi = (poi: BlueprintPoi) => {
    const mmW = minimapSize.w;
    const mmH = minimapSize.h;

    const px = ((poi.x - worldBounds.minX) / worldBounds.w) * mmW;
    const py = ((poi.y - worldBounds.minY) / worldBounds.h) * mmH;

    const vars: CssVars = {
      "--mm-x": `${px}px`,
      "--mm-y": `${py}px`,
    };

    const kindClass = sp.poiKind[poi.kind];

    return (
      <button
        key={`mm-${poi.id}`}
        type="button"
        className={`${sp.minimapPoi} ${kindClass}`}
        style={vars}
        onClick={() => focusPoi(poi, { ms: 560, zoom: 1.1, openModal: true })}
        aria-label={`Focus ${poi.title}`}
      >
        <span className={sp.minimapPoiDot} aria-hidden="true" />
      </button>
    );
  };

  return (
    <div className={sp.root}>
      <div
        ref={stageRef}
        className={`${sp.stage} ${isDragging ? sp.stageGrabbing : ""}`}
        role="region"
        aria-label="Blueprint map"
      >
        <div className={sp.hint}>
          <p className={sp.hintTitle}>Blueprint Map (MVP)</p>
          <p className={sp.hintText}>Drag • Zoom • WASD • Minimap</p>
        </div>

        {/* MINIMAP (obligatoriu) */}
        <div
          ref={minimapRef}
          className={sp.minimap}
          style={minimapVars}
          role="region"
          aria-label="Minimap"
        >
          <div className={sp.minimapGrid} aria-hidden="true" />
          <div className={sp.minimapPois}>{BLUEPRINT_POIS.map(renderMiniPoi)}</div>
          <div className={sp.minimapViewport} aria-hidden="true" />
        </div>

        <div className={sp.layer} style={{ transform: layerTransform }}>
          {BLUEPRINT_POIS.map(renderPoi)}
        </div>

        <div className={sp.hud}>
          <div className={sp.hudInner}>
            <div className={sp.hudLeft}>
              <div className={sp.hudKbd} aria-hidden="true">
                <span className={sp.kbd}>W</span>
                <span className={sp.kbd}>A</span>
                <span className={sp.kbd}>S</span>
                <span className={sp.kbd}>D</span>
              </div>

              <button type="button" className={sp.hudBtn} onClick={onResetView}>
                Reset
              </button>
            </div>

            {/* Project Card (HUD) */}
            <div className={sp.hudCard} aria-label="Proiect selectat">
              {selectedPoi ? (
                <>
                  <div className={sp.hudCardTop}>
                    <span className={sp.hudLogo}>
                      <Img
                        src={selectedPoi.logoSrc}
                        alt={`${selectedPoi.title} logo`}
                        width={28}
                        height={28}
                      />
                    </span>
                    <div className={sp.hudCardMeta}>
                      <div className={sp.hudCardTitle}>{selectedPoi.title}</div>
                      <div className={sp.hudCardSub}>{selectedPoi.domain}</div>
                    </div>
                  </div>

                  <div className={sp.badges} aria-label="Stack">
                    {selectedPoi.badges.map((b) => (
                      <span key={b} className={sp.badge}>
                        {b}
                      </span>
                    ))}
                  </div>

                  <div className={sp.hudCardActions}>
                    <button
                      type="button"
                      className={sp.hudActionBtn}
                      onClick={() => focusPoi(selectedPoi, { ms: 520, zoom: 1.15 })}
                    >
                      Focus
                    </button>
                    <SmartLink className={sp.hudActionLink} href={selectedPoi.caseHref}>
                      View case
                    </SmartLink>
                    <SmartLink className={sp.hudActionLink} href={selectedPoi.siteUrl} newTab>
                      Open site
                    </SmartLink>
                  </div>
                </>
              ) : (
                <div className={sp.hudCardEmpty}>
                  Click pe o clădire (POI) sau pe minimap ca să selectezi un proiect.
                </div>
              )}
            </div>

            <div className={sp.hudRight}>
              <SmartLink className={sp.hudLink} href="/concept">
                Concept
              </SmartLink>
              <SmartLink className={sp.hudLink} href="/portfolio">
                Portfolio
              </SmartLink>
              <SmartLink className={sp.hudLink} href="/marketplace">
                Marketplace
              </SmartLink>
              <SmartLink className={sp.hudLink} href="/auctions">
                Auctions
              </SmartLink>
            </div>
          </div>
        </div>

        {/* Modal (Project Card) */}
        {activePoi ? (
          <div
            className={sp.modalOverlay}
            role="dialog"
            aria-modal="true"
            aria-label={`Detalii ${activePoi.title}`}
          >
            <button
              type="button"
              className={sp.modalBackdrop}
              onClick={closePoi}
              aria-label="Închide"
            />
            <div className={sp.modal}>
              <button
                type="button"
                className={sp.modalClose}
                onClick={closePoi}
                aria-label="Închide"
              >
                ×
              </button>

              <div className={sp.modalHeader}>
                <span className={sp.modalLogo}>
                  <Img
                    src={activePoi.logoSrc}
                    alt={`${activePoi.title} logo`}
                    width={40}
                    height={40}
                  />
                </span>
                <div className={sp.modalHeaderMeta}>
                  <h2 className={sp.modalTitle}>{activePoi.title}</h2>
                  <div className={sp.modalSub}>
                    {activePoi.location} • {activePoi.address}
                  </div>
                </div>
              </div>

              <p className={sp.modalText}>{activePoi.tagline}</p>

              <div className={sp.badges} aria-label="Stack">
                {activePoi.badges.map((b) => (
                  <span key={b} className={sp.badge}>
                    {b}
                  </span>
                ))}
              </div>

              <div className={sp.modalActions}>
                <button
                  type="button"
                  className={sp.modalActionBtn}
                  onClick={() => focusPoi(activePoi, { ms: 560, zoom: 1.18 })}
                >
                  Teleport (focus)
                </button>

                <SmartLink className={sp.modalAction} href={activePoi.caseHref}>
                  View case
                </SmartLink>

                <SmartLink className={sp.modalAction} href={activePoi.siteUrl} newTab>
                  Open site
                </SmartLink>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
