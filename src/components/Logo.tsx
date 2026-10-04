import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 30 24" className="h-6 w-auto shrink-0" aria-hidden="true">
        <path d="M7 0h6L8 24H2z" fill="#FFFFFF" />
        <path d="M22 0h6l-5 24h-6z" fill="#FFFFFF" />
        <path d="M11 9.5h9l-1 5h-9z" fill="#E63946" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[19px] font-extrabold tracking-[0.04em] text-white">
          HERO
        </span>
        <span className="mt-0.5 font-display text-[8px] font-bold tracking-[0.42em] text-silver">
          SNEAKERS
        </span>
      </span>
    </span>);

}