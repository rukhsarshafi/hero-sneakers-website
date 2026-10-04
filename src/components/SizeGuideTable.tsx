import React from "react";
import { sizeChart } from "../data/sizeGuide";

interface SizeGuideTableProps {
  highlight?: number | null;
}

export function SizeGuideTable({ highlight = null }: SizeGuideTableProps) {
  return (
    <div className="overflow-hidden rounded-sm border border-white/10">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">HERO SNEAKERS size chart: EU size and approximate foot length</caption>
        <thead className="bg-ink-800">
          <tr>
            <th scope="col" className="px-5 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-white">EU Size</th>
            <th scope="col" className="px-5 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-white">Approx. Foot Length</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {sizeChart.map((row) => {
            const active = highlight === row.eu;
            return (
              <tr key={row.eu} className={active ? "bg-white text-midnight" : "text-white"}>
                <th scope="row" className="px-5 py-3.5 font-display text-base font-extrabold">{row.eu}</th>
                <td className={`px-5 py-3.5 tabular-nums ${active ? "" : "text-silver"}`}>{row.footLength}</td>
              </tr>);

          })}
        </tbody>
      </table>
    </div>);

}