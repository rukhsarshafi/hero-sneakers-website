import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MenuIcon, SearchIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Logo } from "./Logo";
import { ButtonLink } from "./ButtonLink";
import { MobileMenu } from "./MobileMenu";
import { SearchOverlay } from "./SearchOverlay";
import { AccountModal } from "./AccountModal";
import { useCart } from "../contexts/CartContext";
import { primaryNav } from "../data/navigation";

const iconButton =
"relative grid h-11 w-11 place-items-center rounded-full text-white transition-colors duration-150 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero";

export function Navbar() {
  const { count, openDrawer } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-midnight/85 backdrop-blur-md">
        <nav
          aria-label="Main"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px] lg:px-8">
          
          <button
            type="button"
            className={`${iconButton} -ml-2 lg:hidden`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}>
            
            <MenuIcon className="h-6 w-6" />
          </button>

          <Link
            to="/"
            aria-label="HERO SNEAKERS home"
            className="rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
            
            <Logo />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {primaryNav.map((item) =>
            <li key={item.to}>
                <NavLink
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                `relative py-2 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero ${
                isActive ? "text-white" : "text-silver hover:text-white"}`

                }>
                
                  {({ isActive }) =>
                <>
                      {item.label}
                      {isActive &&
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-hero"
                    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} />

                  }
                    </>
                }
                </NavLink>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-1">
            <button type="button" className={`${iconButton} hidden lg:grid`} onClick={() => setSearchOpen(true)} aria-label="Search products">
              <SearchIcon className="h-5 w-5" />
            </button>
            <button type="button" className={`${iconButton} hidden lg:grid`} onClick={() => setAccountOpen(true)} aria-label="Account">
              <UserIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              className={`${iconButton} -mr-2 lg:mr-0`}
              onClick={openDrawer}
              aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}>
              
              <ShoppingBagIcon className="h-5 w-5" />
              <AnimatePresence>
                {count > 0 &&
                <motion.span
                  key={count}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute right-0.5 top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-hero px-1 text-[10px] font-bold tabular-nums text-white">
                  
                    {count}
                  </motion.span>
                }
              </AnimatePresence>
            </button>
            <ButtonLink to="/shop" size="sm" className="ml-3 hidden lg:inline-flex">
              Shop now
            </ButtonLink>
          </div>
        </nav>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }}
        onAccount={() => {
          setMenuOpen(false);
          setAccountOpen(true);
        }} />
      
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>);

}