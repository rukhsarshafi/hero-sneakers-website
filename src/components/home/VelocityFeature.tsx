import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { brandImages } from "../../data/brandImages";

const specs = [
{ label: "Price", value: "Rs. 10,999" },
{ label: "Color", value: "Black / Silver" },
{ label: "Sizes", value: "EU 40–45" },
{ label: "Fit", value: "Regular" }];


export function VelocityFeature() {
  return (
    <section aria-labelledby="velocity-heading" className="border-y border-white/10 bg-ink-900">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-28">
        <div className="relative lg:col-span-7">
          <div className="aspect-[4/5] overflow-hidden rounded-sm bg-midnight sm:aspect-[5/4]">
            <img
              src={brandImages.velocity}
              alt="HERO VELOCITY in black and silver, side profile"
              className="h-full w-full object-cover" />
            
          </div>
          <div className="absolute -bottom-6 right-4 flex gap-3 sm:right-6">
            {[
            { src: brandImages.velocityDetail, alt: "Silver reflective heel detail" },
            { src: brandImages.velocitySole, alt: "Durable rubber outsole" }].
            map((image) =>
            <div key={image.src} className="h-24 w-20 overflow-hidden rounded-sm border-4 border-ink-900 bg-midnight sm:h-32 sm:w-28">
                <img src={image.src} alt={image.alt} className="h-full w-full object-cover" loading="lazy" />
              </div>
            )}
          </div>
        </div>

        <div className="pt-6 lg:col-span-5 lg:pt-0">
          <p className="text-sm font-semibold text-silver">Performance Inspired</p>
          <h2
            id="velocity-heading"
            className="mt-3 font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
            
            Hero
            <br />
            Velocity
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-silver">
            Performance-inspired comfort meets modern streetwear design.
          </p>
          <dl className="mt-8 grid grid-cols-2 border-t border-white/10">
            {specs.map((spec) =>
            <div key={spec.label} className="border-b border-white/10 py-4">
                <dt className="text-xs uppercase tracking-[0.14em] text-steel">{spec.label}</dt>
                <dd className="mt-1 font-display text-base font-bold">{spec.value}</dd>
              </div>
            )}
          </dl>
          <ButtonLink to="/product/hero-velocity" size="lg" className="mt-8">
            Shop HERO Velocity <ArrowRightIcon className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </section>);

}