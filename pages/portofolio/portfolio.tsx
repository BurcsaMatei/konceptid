// pages/portfolio/index.tsx

// ==============================
// Imports
// ==============================
import type { NextPage } from "next";

import Seo from "../../components/Seo";
import Separator from "../../components/Separator";
import SmartLink from "../../components/SmartLink";
import type { Json } from "../../interfaces";
import { BLUEPRINT_POIS } from "../../lib/blueprint.data";
import { absoluteUrl, seoDefaults } from "../../lib/config";

// ==============================
// Constante
// ==============================
const breadcrumbList = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "KonceptID", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Portfolio", item: absoluteUrl("/portfolio") },
  ],
} as const satisfies Json;

// ==============================
// Component
// ==============================
const PortfolioIndex: NextPage = () => {
  return (
    <>
      <Seo
        title="Portfolio"
        description={seoDefaults.description}
        url="/portfolio"
        image={seoDefaults.ogImage}
        structuredData={[breadcrumbList]}
      />

      <section className="section">
        <div className="container">
          <h1>Portfolio</h1>
          <p>Case studies (MVP) — intră pe un proiect:</p>

          <ul>
            {BLUEPRINT_POIS.map((p) => (
              <li key={p.id}>
                <SmartLink href={p.caseHref}>{p.title}</SmartLink> — {p.domain}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Separator />
    </>
  );
};

export default PortfolioIndex;
