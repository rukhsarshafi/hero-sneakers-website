import React, { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "lucide-react";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumb: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, breadcrumb, children }: PageHeaderProps) {
  return (
    <div className="border-b border-white/10">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-8 sm:px-6 lg:px-8 lg:pb-14 lg:pt-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-xs text-steel">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li aria-hidden="true">
              <ChevronRightIcon className="h-3 w-3" />
            </li>
            <li aria-current="page" className="text-silver">{breadcrumb}</li>
          </ol>
        </nav>
        <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-7xl">
              {title}
            </h1>
            {description && <p className="mt-4 max-w-xl text-base text-silver sm:text-lg">{description}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>);

}