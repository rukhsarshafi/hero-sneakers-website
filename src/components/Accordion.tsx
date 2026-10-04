import React, { ReactNode, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";

interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ title, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div className="border-b border-white/10">
      <h3>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls={contentId}
          className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors duration-150 hover:text-silver focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-hero">
          
          {title}
          <PlusIcon
            className={`h-5 w-5 shrink-0 text-silver transition-transform duration-200 ease-out ${open ? "rotate-45" : ""}`}
            aria-hidden="true" />
          
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open &&
        <motion.div
          id={contentId}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          className="overflow-hidden">
          
            <div className="pb-6 text-sm leading-relaxed text-silver">{children}</div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}