import React from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";
import { ButtonLink } from "../components/ButtonLink";
import { aboutPillars, brandValues } from "../data/about";
import { brandImages } from "../data/brandImages";

export function About() {
  return (
    <>
      <section aria-labelledby="about-heading" className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:pb-24 lg:pt-10">
          <div className="flex flex-col lg:col-span-6">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center gap-1.5 text-xs text-steel">
                <li><Link to="/" className="hover:text-white">Home</Link></li>
                <li aria-hidden="true"><ChevronRightIcon className="h-3 w-3" /></li>
                <li aria-current="page" className="text-silver">About</li>
              </ol>
            </nav>
            <div className="mt-10 lg:mt-auto">
              <h1
                id="about-heading"
                className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl">
                
                The hero
                <br />
                mindset<span className="text-hero">.</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-silver">
                HERO SNEAKERS stands for confidence, movement, individuality and modern everyday style. We make sneakers for people
                who don't wait for permission to be themselves.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6">
            <div className="aspect-[4/5] overflow-hidden rounded-sm bg-ink-800">
              <img
                src={brandImages.about}
                alt="Young woman in black streetwear sitting on concrete steps at night wearing HERO sneakers"
                className="h-full w-full object-cover" />
              
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="story-title" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <h2 id="story-title" className="font-display text-sm font-bold uppercase tracking-[0.16em] text-silver lg:col-span-4">
            Our story
          </h2>
          <div className="space-y-6 lg:col-span-8">
            <p className="font-display text-2xl font-bold leading-snug sm:text-3xl lg:text-4xl">
              HERO started with a simple frustration: the sneakers we loved were out of reach, and the ones we could afford didn't
              feel like us.
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-silver sm:text-lg">
              So we built our own. A Pakistani sneaker brand for students, young professionals and anyone who moves through the
              city with intent. Every pair combines modern streetwear design with performance-inspired comfort — premium in look and
              feel, realistic in price.
            </p>
          </div>
        </div>
      </section>

      <div className="relative aspect-[16/9] w-full overflow-hidden lg:aspect-[21/9]">
        <img
          src={brandImages.story}
          alt="City rooftop at night with a young man walking in HERO sneakers"
          className="h-full w-full object-cover"
          loading="lazy" />
        
      </div>

      <section aria-label="What drives us" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <ul>
          {aboutPillars.map((pillar) =>
          <li key={pillar.title} className="grid gap-4 border-t border-white/10 py-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
              <h3 className="font-display text-2xl font-extrabold uppercase tracking-tight lg:col-span-4 lg:text-3xl">
                {pillar.title}
              </h3>
              <p className="max-w-2xl text-base leading-relaxed text-silver sm:text-lg lg:col-span-8">{pillar.body}</p>
            </li>
          )}
        </ul>
      </section>

      <section aria-label="Brand values" className="border-y border-white/10 bg-ink-900">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {brandValues.map((value, index) =>
          <li
            key={value}
            className={`border-white/10 py-10 font-display text-xl font-extrabold uppercase sm:text-2xl lg:py-14 ${
            index % 2 === 0 ? "border-r pr-4" : "pl-6"} ${
            index < 2 ? "border-b lg:border-b-0" : ""} lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0`}>
            
              {value}
            </li>
          )}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
        <h2 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl">
          Step into your hero<span className="text-hero">.</span>
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink to="/shop" size="lg">Shop the collection</ButtonLink>
          <ButtonLink to="/contact" size="lg" variant="outline">Get in touch</ButtonLink>
        </div>
      </section>
    </>);

}