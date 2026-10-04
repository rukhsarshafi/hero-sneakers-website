import React, { useState } from "react";
import { InfoIcon } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { SizeGuideTable } from "../components/SizeGuideTable";
import { ButtonLink } from "../components/ButtonLink";
import { measuringSteps, sizeChart } from "../data/sizeGuide";

export function SizeGuide() {
  const [footLength, setFootLength] = useState("");
  const value = parseFloat(footLength);
  const match = Number.isFinite(value) ?
  sizeChart.find((row) => parseFloat(row.footLength) >= value) ?? null :
  null;
  const outOfRange = Number.isFinite(value) && !match;

  return (
    <>
      <PageHeader
        title="Size Guide"
        breadcrumb="Size Guide"
        description="Find your fit in under a minute. All HERO sneakers share the same regular-fit sizing." />
      

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-20">
        <section aria-labelledby="chart-heading" className="lg:col-span-6">
          <h2 id="chart-heading" className="font-display text-2xl font-extrabold uppercase sm:text-3xl">Size chart</h2>

          <div className="mt-6 rounded-sm bg-ink-900 p-5">
            <label htmlFor="foot-length" className="text-sm font-semibold">Your foot length (cm)</label>
            <div className="mt-3 flex items-center gap-3">
              <input
                id="foot-length"
                type="number"
                inputMode="decimal"
                step="0.1"
                min="20"
                max="32"
                value={footLength}
                onChange={(event) => setFootLength(event.target.value)}
                placeholder="e.g. 26.3"
                className="h-12 w-36 rounded-sm border border-white/15 bg-ink-800 px-4 text-sm text-white placeholder:text-steel focus:border-white focus:outline-none" />
              
              <p className="text-sm text-silver" aria-live="polite">
                {match ?
                <>Recommended: <span className="font-display text-lg font-extrabold text-white">EU {match.eu}</span></> :
                outOfRange ?
                "Outside our current size range (EU 40–45)." :

                "Enter a measurement to see your size."
                }
              </p>
            </div>
          </div>

          <div className="mt-6">
            <SizeGuideTable highlight={match?.eu ?? null} />
          </div>

          <div className="mt-6 flex gap-3 rounded-sm border border-white/10 p-5 text-sm leading-relaxed text-silver">
            <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
            <p>
              Foot lengths are approximate. Please check your own foot measurement and compare it with our sizing guidance before
              ordering. If you're between two sizes, choose the larger one.
            </p>
          </div>
        </section>

        <section aria-labelledby="measure-heading" className="lg:col-span-6">
          <h2 id="measure-heading" className="font-display text-2xl font-extrabold uppercase sm:text-3xl">How to measure</h2>
          <ol className="mt-6">
            {measuringSteps.map((step, index) =>
            <li key={step.title} className="flex gap-5 border-t border-white/10 py-6">
                <span className="font-display text-3xl font-black leading-none text-steel tabular-nums">{index + 1}</span>
                <div>
                  <h3 className="font-display text-base font-bold uppercase tracking-wide">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-silver">{step.body}</p>
                </div>
              </li>
            )}
          </ol>

          <div className="mt-6 border-t border-white/10 pt-8">
            <h3 className="font-display text-base font-bold uppercase tracking-wide">Fit notes</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-silver marker:text-steel">
              <li>HERO sneakers have a regular fit.</li>
              <li>Measure in the evening, when feet are at their largest.</li>
              <li>Wider feet may prefer sizing up for extra toe room.</li>
              <li>Need help? Free size exchanges within 14 days.</li>
            </ul>
            <ButtonLink to="/shop" className="mt-8" size="lg">Find your pair</ButtonLink>
          </div>
        </section>
      </div>
    </>);

}