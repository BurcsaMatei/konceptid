// pages/index.tsx

// ==============================
// Imports
// ==============================
import type { NextPage } from "next";

import Seo from "../components/Seo";
import Separator from "../components/Separator";
import SmartLink from "../components/SmartLink";
import type { Json } from "../interfaces";
import { absoluteUrl, seoDefaults } from "../lib/config";
import * as sp from "../styles/homepage/blueprintIndex.css";

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

      <section className="section">
        <div className="container">
          <div className={sp.stage}>
            <h1 className={sp.title}>Blueprint World</h1>
            <p className={sp.lede}>
              Navigație concept: districte + proiecte ca POI-uri. Deocamdată ai acces rapid la cele
              4 zone.
            </p>

            <div className={sp.ctaRow}>
              <SmartLink className={sp.cta} href="/concept">
                Concept
              </SmartLink>
              <SmartLink className={sp.cta} href="/portfolio">
                Portfolio
              </SmartLink>
              <SmartLink className={sp.cta} href="/marketplace">
                Marketplace
              </SmartLink>
              <SmartLink className={sp.cta} href="/auctions">
                Auctions
              </SmartLink>
            </div>

            <p className={sp.note}>Hint (următorul pas): WASD / drag pentru “plimbare” pe hartă.</p>
          </div>
        </div>
      </section>

      <Separator />
    </>
  );
};

// ==============================
// Exporturi
// ==============================
export default Home;
