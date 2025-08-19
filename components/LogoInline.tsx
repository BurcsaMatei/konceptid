import Link from "next/link";

type Props = { href?: string };

export default function LogoInline({ href = "/" }: Props) {
  return (
    <Link
      href={href}
      aria-label="KonceptID — Acasă"
      style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "inherit" }}
    >
      <img src="/logo.svg" alt="KonceptID" width={28} height={28} />
      <strong>KonceptID</strong>
    </Link>
  );
}
