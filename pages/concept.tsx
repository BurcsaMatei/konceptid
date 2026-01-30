// pages/concept.tsx

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
    { "@type": "ListItem", position: 2, name: "Concept", item: absoluteUrl("/concept") },
  ],
} as const satisfies Json;

// ==============================
// Component
// ==============================
const ConceptPage: NextPage = () => {
  return (
    <>
      <Seo
        title="Concept"
        description={seoDefaults.description}
        url="/concept"
        image={seoDefaults.ogImage}
        structuredData={[breadcrumbList]}
      />

      <section className="section">
        <div className="container">
          <h1>Concept</h1>
          <p>Placeholder. Aici intră zona “Concept” din Blueprint (servicii + abordare).</p>
        </div>
      </section>

      <Separator />
    </>
  );
};

// ==============================
// Exporturi
// ==============================
export default ConceptPage;
