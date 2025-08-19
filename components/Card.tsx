// components/Card.tsx
import Link from "next/link";
import { ReactNode } from "react";
import Img from "./ui/Img";

export type CardImage = {
  src: string;
  alt: string;
  priority?: boolean;
};

export type CardProps = {
  title: string | ReactNode;
  href?: string;               // dacă e setat, tot cardul devine link
  image?: CardImage;           // opțional
  meta?: ReactNode;            // ex: dată, categorie
  excerpt?: string;            // scurtă descriere
  actions?: ReactNode;         // butoane/CTA
  onClick?: () => void;        // alternativ la href (ex: lightbox)
  className?: string;          // hook pt stiluri externe
};

export default function Card({
  title,
  href,
  image,
  meta,
  excerpt,
  actions,
  onClick,
  className,
}: CardProps) {
  const inner = (
    <article
      className={className}
      style={{
        display: "grid",
        gap: 12,
        textDecoration: "none",
        color: "inherit",
      }}
    >
      {image && (
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "4 / 3",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <Img
            src={image.src}
            alt={image.alt}
            variant="card"
            cover
            priority={image.priority}
          />
        </div>
      )}

      <div style={{ display: "grid", gap: 6 }}>
        <h3 style={{ margin: 0, fontSize: "1.05rem", lineHeight: 1.35 }}>{title}</h3>
        {meta && (
          <div style={{ fontSize: ".9rem", opacity: .8, display: "flex", gap: 8 }}>
            {meta}
          </div>
        )}
        {excerpt && (
          <p style={{ margin: "6px 0 0", fontSize: ".95rem", opacity: .9 }}>
            {excerpt}
          </p>
        )}
        {actions && <div style={{ marginTop: 6 }}>{actions}</div>}
      </div>
    </article>
  );

  if (href) {
    return (
      <Link href={href} aria-label={typeof title === "string" ? title : "Deschide"}>
        {inner}
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          padding: 0,
          border: "none",
          background: "transparent",
          textAlign: "inherit",
          width: "100%",
          cursor: "pointer",
        }}
        aria-label={typeof title === "string" ? title : "Deschide"}
      >
        {inner}
      </button>
    );
  }

  return inner;
}
