// pages/marketplace.tsx

// ==============================
// Imports
// ==============================
import type { NextPage } from "next";

import Seo from "../components/Seo";
import Separator from "../components/Separator";
import type { Json } from "../interfaces";
import { absoluteUrl, seoDefaults } from "../lib/config";

// ==============================
// Constante
// ==============================
const breadcrumbList = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "KonceptID", item: absoluteUrl("/") },
    { "@type": "ListItem", position: 2, name: "Marketplace", item: absoluteUrl("/marketplace") },
  ],
} as const satisfies Json;

// ==============================
// Component
// ==============================
const MarketplacePage: NextPage = () => {
  return (
    <>
      <Seo
        title="Marketplace"
        description={seoDefaults.description}
        url="/marketplace"
        image={seoDefaults.ogImage}
        structuredData={[breadcrumbList]}
      />

      <section className="section">
        <div className="container">
          <h1>Marketplace</h1>
          <p>
            Placeholder. Aici intră template-uri / site-uri de vânzare (Stripe-only mai târziu).
          </p>
        </div>
      </section>

      <Separator />
    </>
  );
};

// ==============================
// Exporturi
// ==============================
export default MarketplacePage;
