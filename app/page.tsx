import { Hero } from "@/components/home/Hero";
import { ProofBar } from "@/components/home/ProofBar";
import { Rooted } from "@/components/home/Rooted";
import { ShopPreview } from "@/components/home/ShopPreview";
import { Comparison } from "@/components/home/Comparison";
import { Lifestyle } from "@/components/home/Lifestyle";
import { WhereToBuy } from "@/components/home/WhereToBuy";
import { Testimonials } from "@/components/home/Testimonials";
import { ClosingCTA } from "@/components/home/ClosingCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationSchema, productListSchema } from "@/lib/seo";

/**
 * Section order builds to a single conversion moment.
 *
 * Where-to-buy used to sit directly above the closing CTA, so the page ended
 * on two competing calls to action. It now runs as a quiet band mid-page, and
 * the reviews lead straight into the one closing CTA.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationSchema} />
      <JsonLd data={productListSchema} />
      <Hero />
      <ProofBar />
      <Rooted />
      <ShopPreview />
      <Comparison />
      <Lifestyle />
      <WhereToBuy />
      <Testimonials />
      <ClosingCTA />
    </>
  );
}
