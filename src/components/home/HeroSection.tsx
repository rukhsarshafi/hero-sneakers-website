import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { brandImages } from "../../data/brandImages";

const heroAlt = "Black HERO sneaker with red and silver details floating above a dark wet floor";

const facts = ["Free shipping over Rs. 10,000", "14-day returns", "Sizes EU 40–45"];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const ease = [0.23, 1, 0.32, 1] as const;

  return (
    <section ref={ref} aria-labelledby="hero-heading" className="relative overflow-hidden border-b border-white/10">
      <motion.div style={{ y: reduceMotion ? 0 : y }} className="absolute inset-0 hidden lg:block">
        <img src={brandImages.hero} alt={heroAlt} className="h-full w-full object-cover object-[65%_center]" />
      </motion.div>

      <div className="relative mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:min-h-[calc(100vh-108px)] lg:justify-center lg:px-8">
        <div className="max-w-xl pb-10 pt-12 sm:pt-16 lg:py-28 xl:max-w-2xl">
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease }}
            className="font-display text-[52px] font-black uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-[88px] xl:text-[104px]">
            
            Step into
            <br />
            your hero<span className="text-hero">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.06, ease }}
            className="mt-6 text-lg text-silver sm:text-xl">
            
            Built for movement. Designed for confidence.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.12, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row">
            
            <ButtonLink to="/shop" size="lg">
              Shop collection <ArrowRightIcon className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink to="/new-arrivals" size="lg" variant="outline">
              Explore new arrivals
            </ButtonLink>
          </motion.div>
        </div>

        <ul className="hidden gap-8 pb-8 text-xs font-medium uppercase tracking-[0.14em] text-silver lg:absolute lg:bottom-0 lg:flex">
          {facts.map((fact) =>
          <li key={fact} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-silver" aria-hidden="true" />
              {fact}
            </li>
          )}
        </ul>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9] lg:hidden">
        <img src={brandImages.hero} alt="" className="h-full w-full object-cover object-[72%_center]" />
      </div>
    </section>);

}