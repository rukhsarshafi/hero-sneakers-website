import React from "react";
import { Link } from "react-router-dom";

export function AnnouncementBar() {
  return (
    <div className="border-b border-white/5 bg-ink-900">
      <p className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-silver">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-hero" aria-hidden="true" />
        Free shipping on orders over Rs. 10,000
        <Link
          to="/shipping-returns"
          className="ml-2 hidden text-white underline underline-offset-4 transition-colors duration-150 hover:text-silver sm:inline">
          
          Details
        </Link>
      </p>
    </div>);

}