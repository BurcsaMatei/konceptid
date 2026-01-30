// pages/auctions.tsx

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
    { "@type": "ListItem", position: 2, name: "Auctions", item: absoluteUrl("/auctions") },
  ],
} as const satisfies Json;

// ==============================
// Component
// ==============================
const AuctionsPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Auctions"
        description={seoDefaults.description}
        url="/auctions"
        image={seoDefaults.ogImage}
        structuredData={[breadcrumbList]}
      />

      <section className="section">
        <div className="container">
          <h1>Auctions</h1>
          <p>
            Placeholder. Aici intră licitațiile de concepte/site-uri (definim flow-ul ulterior).
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
export default AuctionsPage;
