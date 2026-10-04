import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBagIcon, XIcon } from "lucide-react";
import { Button } from "./Button";
import { CartLineItem } from "./CartLineItem";
import { FreeShippingProgress } from "./FreeShippingProgress";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/currency";

export function CartDrawer() {
  const { items, count, subtotal, shipping, total, isDrawerOpen, closeDrawer } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isDrawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [isDrawerOpen, closeDrawer]);

  const go = (path: string) => {
    closeDrawer();
    navigate(path);
  };

  return (
    <AnimatePresence>
      {isDrawerOpen &&
      <div className="fixed inset-0 z-[65]">
          <motion.div
          className="absolute inset-0 bg-black/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeDrawer}
          aria-hidden="true" />
        
          <motion.aside
          role="dialog"
          aria-modal="true"
          aria-label="Your bag"
          className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-white/10 bg-midnight"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}>
          
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h2 className="font-display text-lg font-extrabold uppercase tracking-wide">
                Your bag <span className="text-silver">({count})</span>
              </h2>
              <button
              type="button"
              onClick={closeDrawer}
              className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero"
              aria-label="Close bag">
              
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="border-b border-white/10 px-5 py-4">
              <FreeShippingProgress subtotal={subtotal} />
            </div>

            {items.length === 0 ?
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-white/15">
                  <ShoppingBagIcon className="h-6 w-6 text-silver" />
                </span>
                <p className="mt-5 font-display text-xl font-extrabold uppercase">Your bag is empty</p>
                <p className="mt-2 text-sm text-silver">Find the pair that moves with you.</p>
                <Button className="mt-6" onClick={() => go("/shop")}>
                  Shop sneakers
                </Button>
              </div> :

          <>
                <div className="flex-1 divide-y divide-white/10 overflow-y-auto px-5">
                  {items.map((item) =>
              <CartLineItem key={item.key} item={item} onNavigate={closeDrawer} />
              )}
                </div>
                <div className="space-y-4 border-t border-white/10 px-5 py-5">
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between text-silver">
                      <dt>Subtotal</dt>
                      <dd className="tabular-nums text-white">{formatPrice(subtotal)}</dd>
                    </div>
                    <div className="flex justify-between text-silver">
                      <dt>Shipping</dt>
                      <dd className="tabular-nums text-white">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                    </div>
                    <div className="flex justify-between border-t border-white/10 pt-3 font-semibold">
                      <dt>Total</dt>
                      <dd className="font-display text-lg font-extrabold tabular-nums">{formatPrice(total)}</dd>
                    </div>
                  </dl>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" onClick={() => go("/cart")}>
                      View bag
                    </Button>
                    <Button onClick={() => go("/cart?checkout=1")}>Checkout</Button>
                  </div>
                </div>
              </>
          }
          </motion.aside>
        </div>
      }
    </AnimatePresence>);

}