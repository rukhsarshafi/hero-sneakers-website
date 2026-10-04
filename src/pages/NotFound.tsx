import React from "react";
import { ButtonLink } from "../components/ButtonLink";

export function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="font-display text-8xl font-black text-steel">404</p>
      <h1 className="mt-4 font-display text-3xl font-black uppercase">Wrong turn</h1>
      <p className="mt-3 text-silver">This page doesn't exist. Let's get you back on your feet.</p>
      <ButtonLink to="/" className="mt-8" size="lg">Back to home</ButtonLink>
    </div>);

}