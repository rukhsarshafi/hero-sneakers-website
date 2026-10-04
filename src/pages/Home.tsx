import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { FeaturedHeroes } from "../components/home/FeaturedHeroes";
import { NewArrivalsSection } from "../components/home/NewArrivalsSection";
import { BenefitsSection } from "../components/home/BenefitsSection";
import { VelocityFeature } from "../components/home/VelocityFeature";
import { BrandStory } from "../components/home/BrandStory";

export function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedHeroes />
      <NewArrivalsSection />
      <BenefitsSection />
      <VelocityFeature />
      <BrandStory />
    </>);

}