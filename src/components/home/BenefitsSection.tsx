import React from "react";
import { benefits } from "../../data/benefits";

export function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-heading" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2
            id="benefits-heading"
            className="font-display text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
            
            Move
            <br />
            different<span className="text-hero">.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-silver">
            HERO combines streetwear confidence with performance-inspired comfort for everyday movement.
          </p>
        </div>

        <ul className="grid border-t border-white/10 sm:grid-cols-2 lg:col-span-7">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <li
                key={benefit.title}
                className={`border-b border-white/10 py-8 sm:py-10 ${index % 2 === 0 ? "sm:border-r sm:pr-10" : "sm:pl-10"}`}>
                
                <span className="grid h-12 w-12 place-items-center rounded-sm border border-white/15 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-lg font-extrabold uppercase tracking-wide">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver">{benefit.body}</p>
              </li>);

          })}
        </ul>
      </div>
    </section>);

}