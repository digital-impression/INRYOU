import { Reveal, Stagger } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight } from "@/components/ui/icons";
import { Splatter } from "@/components/ui/Splatter";
import { products } from "@/lib/products";

export function ShopPreview() {
  return (
    <section
      id="shop"
      className="container-px relative mx-auto max-w-7xl py-20 lg:py-28"
    >
      <div className="relative flex flex-col items-center text-center">
        <Splatter
          seed={17}
          variant="spray"
          color="var(--color-orange)"
          opacity={0.3}
          arms={9}
          className="left-[62%] top-[-96px] h-[230px] w-[230px]"
        />
        <Reveal>
          <p className="eyebrow text-cranberry">Shop</p>
        </Reveal>
        <Reveal delay={1}>
          <h2 className="mt-3 text-balance display-2">
            Kies je <span className="accent text-orange-deep">balans.</span>
          </h2>
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-5 max-w-xl text-pretty text-lg text-ink">
            Twee smaken om van te houden, ééntje op komst. Elk in zijn eigen
            kleur en stemming.
          </p>
        </Reveal>
      </div>

      <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </Stagger>

      <Reveal delay={1}>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/shop" variant="outline">
            Bekijk het volledige assortiment
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}
