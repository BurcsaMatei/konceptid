// pages/index.tsx

// ==============================
// Imports
// ==============================
import type { NextPage } from "next";

import BlueprintMap from "../components/blueprint/BlueprintMap";
import Seo from "../components/Seo";
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
  ],
} as const satisfies Json;

// ==============================
// Component
// ==============================
const Home: NextPage = () => {
  return (
    <>
      <Seo
        title="KonceptID"
        description={seoDefaults.description}
        url="/"
        image={seoDefaults.ogImage}
        structuredData={[breadcrumbList]}
      />

      <BlueprintMap />
    </>
  );
};

// ==============================
// Exporturi
// ==============================
export default Home;
