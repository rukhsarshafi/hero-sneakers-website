import React from "react";
import { motion } from "framer-motion";
import { TruckIcon } from "lucide-react";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "../utils/currency";

interface FreeShippingProgressProps {
  subtotal: number;
}

export function FreeShippingProgress({ subtotal }: FreeShippingProgressProps) {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(1, subtotal / FREE_SHIPPING_THRESHOLD);
  const unlocked = remaining === 0 && subtotal > 0;

  return (
    <div>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-white" aria-live="polite">
        <TruckIcon className="h-4 w-4 text-silver" aria-hidden="true" />
        {unlocked ?
        "You've unlocked free shipping" :
        subtotal === 0 ?
        "Free shipping on orders over Rs. 10,000" :
        `${formatPrice(remaining)} away from free shipping`}
      </p>
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
        <motion.div
          className={`h-full ${unlocked ? "bg-white" : "bg-hero"}`}
          initial={false}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />
        
      </div>
    </div>);

}