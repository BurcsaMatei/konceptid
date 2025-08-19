import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  headerRoot, headerInner, navDesktop, navLink,
  mobileBtn, overlay, overlayOpen, panel, panelOpen, panelNav, panelLink,
} from "../styles/header.css";
import LogoInline from "./LogoInline"; // dacă nu ai, înlocuiește cu <span>KonceptID</span>

const NAV = [
  { href: "/", label: "Acasă" },
  { href: "/galerie", label: "Galerie" },
  { href: "/services", label: "Servicii" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);

  // blochează scroll-ul paginii când meniul e deschis
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.style.overflow = "hidden";
    else root.style.overflow = "";
    return () => { root.style.overflow = ""; };
  }, [open]);

  // focus trap + Esc
  useEffect(() => {
    if (!open || !panelRef.current) return;

    // mută focusul pe primul link
    firstLinkRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;

      // trap în interiorul panoului
      const focusables = panelRef.current!.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (!focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !active) {
          (last as HTMLElement).focus();
          e.preventDefault();
        }
      } else {
        if (active === last) {
          (first as HTMLElement).focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={headerRoot}>
      <div className={headerInner}>
        {/* Logo */}
        <Link href="/" aria-label="Mergi la Acasă" style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {/* Dacă nu ai componentă LogoInline, înlocuiește cu <strong>KonceptID</strong> */}
          <LogoInline />
        </Link>

        {/* Nav desktop */}
        <nav className={navDesktop} aria-label="Meniu principal">
          {NAV.map((item) => (
            <Link key={item.href} className={navLink} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Buton mobil */}
        <button
          type="button"
          className={mobileBtn}
          aria-label={open ? "Închide meniul" : "Deschide meniul"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {/* simplu: „≡” / „×” */}
          <span aria-hidden>{open ? "×" : "≡"}</span>
        </button>
      </div>

      {/* Overlay + panou */}
      <div
        className={`${overlay} ${open ? overlayOpen : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`${panel} ${open ? panelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Meniu"
      >
        <nav className={panelNav} aria-label="Meniu mobil">
          {NAV.map((item, i) => (
            <Link
              key={item.href}
              ref={i === 0 ? firstLinkRef : null}
              className={panelLink}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
