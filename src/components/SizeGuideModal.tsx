import React from "react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, RulerIcon } from "lucide-react";
import { Modal } from "./Modal";
import { SizeGuideTable } from "./SizeGuideTable";

interface SizeGuideModalProps {
  open: boolean;
  onClose: () => void;
  selectedSize?: number | null;
}

export function SizeGuideModal({ open, onClose, selectedSize = null }: SizeGuideModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Size guide" size="lg">
      <p className="text-sm leading-relaxed text-silver">
        Measure your foot from heel to longest toe, then compare it with the chart below. HERO sneakers have a regular fit — if
        you're between sizes, we suggest going up.
      </p>
      <div className="mt-5">
        <SizeGuideTable highlight={selectedSize} />
      </div>
      <div className="mt-5 flex items-start gap-3 rounded-sm bg-ink-800 p-4 text-sm text-silver">
        <RulerIcon className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
        <p>
          Foot lengths are approximate. Please check your own foot measurement and compare it with our sizing guidance before
          ordering.
        </p>
      </div>
      <Link
        to="/size-guide"
        onClick={onClose}
        className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white underline-offset-4 hover:underline">
        
        How to measure your foot <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </Modal>);

}