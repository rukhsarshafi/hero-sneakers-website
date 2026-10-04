import React, { FormEvent, useEffect, useState } from "react";
import { StarIcon } from "lucide-react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import type { Review } from "../../types/product";

interface WriteReviewModalProps {
  open: boolean;
  onClose: () => void;
  productName: string;
  onSubmit: (review: Review) => void;
}

export function WriteReviewModal({ open, onClose, productName, onSubmit }: WriteReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setRating(0);
      setName("");
      setTitle("");
      setBody("");
      setError("");
    }
  }, [open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!rating) return setError("Please choose a star rating.");
    if (!name.trim() || !title.trim() || body.trim().length < 10) {
      return setError("Please add your name, a title and at least 10 characters of feedback.");
    }
    onSubmit({
      id: `user-${Date.now()}`,
      name: name.trim(),
      rating,
      date: new Date().toISOString().slice(0, 10),
      title: title.trim(),
      body: body.trim(),
      size: 42,
      fit: "True to size",
      verified: false
    });
  };

  const inputClass =
  "w-full rounded-sm border border-white/15 bg-ink-800 px-4 text-sm text-white placeholder:text-steel focus:border-white focus:outline-none";

  return (
    <Modal open={open} onClose={onClose} title={`Review ${productName}`} size="lg">
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <fieldset>
          <legend className="mb-2 text-xs font-semibold text-white">Your rating</legend>
          <div className="flex gap-1" role="radiogroup">
            {[1, 2, 3, 4, 5].map((value) =>
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} star${value > 1 ? "s" : ""}`}
              onClick={() => setRating(value)}
              className="grid h-10 w-10 place-items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero">
              
                <StarIcon className={`h-6 w-6 text-transparent ${value <= rating ? "fill-white" : "fill-white/15"}`} />
              </button>
            )}
          </div>
        </fieldset>
        <div>
          <label htmlFor="review-name" className="mb-1.5 block text-xs font-semibold">Name</label>
          <input id="review-name" value={name} onChange={(e) => setName(e.target.value)} className={`${inputClass} h-12`} />
        </div>
        <div>
          <label htmlFor="review-title" className="mb-1.5 block text-xs font-semibold">Review title</label>
          <input id="review-title" value={title} onChange={(e) => setTitle(e.target.value)} className={`${inputClass} h-12`} />
        </div>
        <div>
          <label htmlFor="review-body" className="mb-1.5 block text-xs font-semibold">Your review</label>
          <textarea id="review-body" rows={4} value={body} onChange={(e) => setBody(e.target.value)} className={`${inputClass} py-3`} />
        </div>
        <p className="min-h-[1rem] text-xs text-hero" aria-live="polite">{error}</p>
        <Button type="submit" fullWidth size="lg">
          Submit review
        </Button>
      </form>
    </Modal>);

}