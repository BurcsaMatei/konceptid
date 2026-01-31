// pages/portfolio/[slug].tsx

// ==============================
// Imports
// ==============================
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";

import Seo from "../../components/Seo";
import Separator from "../../components/Separator";
import SmartLink from "../../components/SmartLink";
import type { Json } from "../../interfaces";
import { BLUEPRINT_POIS, type BlueprintPoi } from "../../lib/blueprint.data";
import { absoluteUrl, seoDefaults } from "../../lib/config";

// ==============================
// Types
// ==============================
type Props = { poi: BlueprintPoi };

// ==============================
// Component
// ==============================
const PortfolioCase: NextPage<Props> = ({ poi }) => {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "KonceptID", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: absoluteUrl("/portfolio") },
      { "@type": "ListItem", position: 3, name: poi.title, item: absoluteUrl(poi.caseHref) },
    ],
  } as const satisfies Json;

  return (
    <>
      <Seo
        title={`${poi.title} — Case study`}
        description={poi.tagline || seoDefaults.description}
        url={poi.caseHref}
        image={seoDefaults.ogImage}
        structuredData={[breadcrumbList]}
      />

      <section className="section">
        <div className="container">
          <h1>{poi.title}</h1>
          <p>{poi.tagline}</p>

          <p>
            <strong>Locație:</strong> {poi.location}
            <br />
            <strong>Adresă:</strong> {poi.address}
            <br />
            <strong>Domeniu:</strong> {poi.domain}
          </p>

          <p>
            <strong>Stack:</strong> {poi.badges.join(" • ")}
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <SmartLink href={poi.siteUrl} newTab>
              Open site
            </SmartLink>
            <SmartLink href="/portfolio">Back to Portfolio</SmartLink>
            <SmartLink href="/">Back to Map</SmartLink>
          </div>
        </div>
      </section>

      <Separator />
    </>
  );
};

// ==============================
// SSG
// ==============================
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: BLUEPRINT_POIS.map((p) => ({ params: { slug: p.caseSlug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const slug = String(ctx.params?.slug || "");
  const poi = BLUEPRINT_POIS.find((p) => p.caseSlug === slug);

  if (!poi) return { notFound: true };
  return { props: { poi } };
};

export default PortfolioCase;
