import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { SearchIcon, UserIcon, XIcon } from "lucide-react";
import { Logo } from "./Logo";
import { ButtonLink } from "./ButtonLink";
import { SocialLinks } from "./SocialLinks";
import { primaryNav } from "../data/navigation";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  onSearch: () => void;
  onAccount: () => void;
}

const secondaryLinks = [
{ label: "Shipping & Returns", to: "/shipping-returns" },
{ label: "Contact", to: "/contact" },
{ label: "Your Cart", to: "/cart" }];


export function MobileMenu({ open, onClose, onSearch, onAccount }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open &&
      <div className="fixed inset-0 z-[60] lg:hidden">
          <motion.div
          className="absolute inset-0 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          aria-hidden="true" />
        
          <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="absolute inset-y-0 left-0 flex w-[88%] max-w-sm flex-col overflow-y-auto border-r border-white/10 bg-midnight"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}>
          
            <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
              <Link to="/" onClick={onClose} aria-label="HERO SNEAKERS home">
                <Logo />
              </Link>
              <button
              type="button"
              onClick={onClose}
              className="grid h-11 w-11 place-items-center rounded-full text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero"
              aria-label="Close menu">
              
                <XIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex gap-2 px-4 pt-5">
              <button
              type="button"
              onClick={onSearch}
              className="flex h-12 flex-1 items-center gap-3 rounded-sm border border-white/15 px-4 text-sm text-silver focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
              
                <SearchIcon className="h-4 w-4" /> Search sneakers
              </button>
              <button
              type="button"
              onClick={onAccount}
              aria-label="Account"
              className="grid h-12 w-12 place-items-center rounded-sm border border-white/15 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
              
                <UserIcon className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="px-4 pt-6">
              <ul>
                {primaryNav.map((item) =>
              <li key={item.to} className="border-b border-white/10">
                    <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={onClose}
                  className={({ isActive }) =>
                  `flex items-center justify-between py-4 font-display text-2xl font-extrabold uppercase tracking-tight ${
                  isActive ? "text-white" : "text-silver"}`

                  }>
                  
                      {({ isActive }) =>
                  <>
                          {item.label}
                          {isActive && <span className="h-2 w-2 rounded-full bg-hero" aria-hidden="true" />}
                        </>
                  }
                    </NavLink>
                  </li>
              )}
              </ul>
              <ul className="mt-6 space-y-1">
                {secondaryLinks.map((item) =>
              <li key={item.to}>
                    <Link to={item.to} onClick={onClose} className="block py-2 text-sm text-silver hover:text-white">
                      {item.label}
                    </Link>
                  </li>
              )}
              </ul>
            </nav>

            <div className="mt-auto space-y-6 border-t border-white/10 p-4">
              <ButtonLink to="/shop" onClick={onClose} fullWidth size="lg">
                Shop now
              </ButtonLink>
              <SocialLinks />
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}