import React from "react";
import { Link } from "react-router-dom";
import { AccordionItem } from "../Accordion";
import { productFeatures, productMaterials } from "../../data/productDetails";
import type { Product } from "../../types/product";

interface ProductInfoAccordionsProps {
  product: Product;
  onOpenSizeGuide: () => void;
}

export function ProductInfoAccordions({ product, onOpenSizeGuide }: ProductInfoAccordionsProps) {
  return (
    <div className="border-t border-white/10">
      <AccordionItem title="Description" defaultOpen>
        <p>{product.description}</p>
        <p className="mt-3">Color shown: {product.color}</p>
      </AccordionItem>
      <AccordionItem title="Materials">
        <ul className="list-disc space-y-1.5 pl-5 marker:text-steel">
          {productMaterials.map((material) =>
          <li key={material}>{material}</li>
          )}
        </ul>
      </AccordionItem>
      <AccordionItem title="Features">
        <ul className="grid gap-x-6 gap-y-1.5 pl-5 sm:grid-cols-2 list-disc marker:text-steel">
          {productFeatures.map((feature) =>
          <li key={feature}>{feature}</li>
          )}
        </ul>
      </AccordionItem>
      <AccordionItem title="Fit">
        <p>Regular fit. Most customers find HERO sneakers true to size.</p>
        <button type="button" onClick={onOpenSizeGuide} className="mt-3 text-white underline underline-offset-4 hover:text-silver">
          Open size guide
        </button>
      </AccordionItem>
      <AccordionItem title="Shipping">
        <p>Standard shipping available across Pakistan. Rs. 300 per order, free on orders over Rs. 10,000.</p>
        <p className="mt-2">Estimated delivery: 2–4 working days in major cities, 4–7 working days elsewhere.</p>
      </AccordionItem>
      <AccordionItem title="Returns">
        <p>
          Return unworn sneakers in their original box with tags attached within 14 days of delivery. Size exchanges are free,
          subject to stock.
        </p>
        <Link to="/shipping-returns#returns" className="mt-3 inline-block text-white underline underline-offset-4 hover:text-silver">
          Read the full return policy
        </Link>
      </AccordionItem>
    </div>);

}