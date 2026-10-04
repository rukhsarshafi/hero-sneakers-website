import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import { ProductGallery } from "../components/product/ProductGallery";
import { ProductPurchasePanel } from "../components/product/ProductPurchasePanel";
import { ProductInfoAccordions } from "../components/product/ProductInfoAccordions";
import { ProductReviews } from "../components/product/ProductReviews";
import { SizeGuideModal } from "../components/SizeGuideModal";
import { SectionHeading } from "../components/SectionHeading";
import { ProductGrid } from "../components/ProductGrid";
import { ButtonLink } from "../components/ButtonLink";
import { products } from "../data/products";

export function ProductDetail() {
  const { slug } = useParams();
  const product = products.find((item) => item.slug === slug);
  const [size, setSize] = useState<number | null>(null);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  useEffect(() => {
    setSize(null);
  }, [slug]);

  if (!product) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-black uppercase">Sneaker not found</h1>
        <p className="mt-3 text-silver">This style may have sold out or moved. Explore the full range instead.</p>
        <ButtonLink to="/shop" className="mt-8">Back to shop</ButtonLink>
      </div>);

  }

  const related = products.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-xs text-steel">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li aria-hidden="true"><ChevronRightIcon className="h-3 w-3" /></li>
            <li><Link to="/shop" className="hover:text-white">Shop</Link></li>
            <li aria-hidden="true"><ChevronRightIcon className="h-3 w-3" /></li>
            <li aria-current="page" className="text-silver">{product.name}</li>
          </ol>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-6 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        <div className="lg:col-span-7">
          <div className="lg:sticky lg:top-24">
            <ProductGallery images={product.gallery} />
          </div>
        </div>
        <div className="lg:col-span-5">
          <ProductPurchasePanel
            product={product}
            size={size}
            onSizeChange={setSize}
            onOpenSizeGuide={() => setSizeGuideOpen(true)} />
          
          <div className="mt-10">
            <ProductInfoAccordions product={product} onOpenSizeGuide={() => setSizeGuideOpen(true)} />
          </div>
        </div>
      </div>

      <ProductReviews product={product} />

      <section aria-labelledby="related-heading" className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <SectionHeading id="related-heading" title="You may also like" />
          <div className="mt-10">
            <ProductGrid products={related} />
          </div>
        </div>
      </section>

      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} selectedSize={size} />
    </>);

}