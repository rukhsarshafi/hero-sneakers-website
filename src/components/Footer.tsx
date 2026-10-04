import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { SocialLinks } from "./SocialLinks";
import { FacebookIcon, InstagramIcon, TikTokIcon } from "./SocialIcons";
import { footerNav, socialLinks, supportNav } from "../data/navigation";

const socialIcons = { Instagram: InstagramIcon, Facebook: FacebookIcon, TikTok: TikTokIcon };

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-midnight">
      <section aria-labelledby="newsletter-heading" className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-16">
          <div>
            <h2 id="newsletter-heading" className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
              Join the HERO community
            </h2>
            <p className="mt-2 max-w-md text-sm text-silver">
              New drops, restocks and members-only offers. No spam — unsubscribe anytime.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-5 font-display text-sm font-extrabold uppercase tracking-[0.14em] text-white">
            Step into your hero<span className="text-hero">.</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-silver">
            Streetwear confidence and performance-inspired comfort, designed in Pakistan.
          </p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <FooterColumn title="Navigation" className="lg:col-span-3">
          {footerNav.map((item) =>
          <li key={item.to}>
              <FooterLink to={item.to}>{item.label}</FooterLink>
            </li>
          )}
        </FooterColumn>

        <FooterColumn title="Customer Support" className="lg:col-span-3">
          {supportNav.map((item) =>
          <li key={item.to}>
              <FooterLink to={item.to}>{item.label}</FooterLink>
            </li>
          )}
        </FooterColumn>

        <FooterColumn title="Social" className="lg:col-span-2">
          {socialLinks.map((social) => {
            const Icon = socialIcons[social.label];
            return (
              <li key={social.label}>
                <a href={social.href} className="inline-flex items-center gap-2 py-1 text-sm text-silver transition-colors duration-150 hover:text-white">
                  <Icon className="h-4 w-4" />
                  {social.label}
                </a>
              </li>);

          })}
        </FooterColumn>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-xs text-steel sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 HERO SNEAKERS. ALL RIGHTS RESERVED.</p>
          <p>Pakistan · Rs. PKR</p>
        </div>
      </div>
    </footer>);

}

function FooterColumn({ title, className = "", children }: {title: string;className?: string;children: React.ReactNode;}) {
  return (
    <nav aria-label={title} className={className}>
      <h3 className="font-display text-xs font-bold uppercase tracking-[0.16em] text-white">{title}</h3>
      <ul className="mt-4 space-y-1">{children}</ul>
    </nav>);

}

function FooterLink({ to, children }: {to: string;children: React.ReactNode;}) {
  return (
    <Link to={to} className="inline-block py-1 text-sm text-silver transition-colors duration-150 hover:text-white">
      {children}
    </Link>);

}