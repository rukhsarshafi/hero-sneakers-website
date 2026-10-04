import React from "react";
import { ButtonLink } from "../ButtonLink";
import { brandImages } from "../../data/brandImages";

export function BrandStory() {
  return (
    <section aria-labelledby="story-heading" className="relative isolate overflow-hidden">
      <img
        src={brandImages.story}
        alt="Young man in black streetwear walking across a city rooftop at night in HERO sneakers"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-[70%_center]"
        loading="lazy" />
      
      <div className="absolute inset-0 -z-10 bg-midnight/60 lg:bg-midnight/30" aria-hidden="true" />
      <div className="mx-auto flex min-h-[600px] max-w-7xl items-center px-4 py-24 sm:px-6 lg:min-h-[720px] lg:px-8 lg:py-36">
        <div className="max-w-2xl">
          <h2
            id="story-heading"
            className="font-display text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            
            You don't need to be a hero.
            <span className="mt-2 block text-silver">You just need to step into your own.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            HERO SNEAKERS was created for people who move with confidence, create their own path, and express themselves through
            every step. Our sneakers combine modern streetwear design with performance-inspired comfort for everyday movement.
          </p>
          <ButtonLink to="/about" variant="light" size="lg" className="mt-10">
            Discover our story
          </ButtonLink>
        </div>
      </div>
    </section>);

}