import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { MessageSquareIcon } from "lucide-react";
import { Button } from "../Button";
import { RatingStars } from "../RatingStars";
import { ReviewCard } from "../ReviewCard";
import { WriteReviewModal } from "./WriteReviewModal";
import { ratingDistribution, velocityReviews } from "../../data/reviews";
import type { Product, Review } from "../../types/product";

interface ProductReviewsProps {
  product: Product;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  const seedReviews = product.id === "hero-velocity" ? velocityReviews : [];
  const [reviews, setReviews] = useState<Review[]>(seedReviews);
  const [showAll, setShowAll] = useState(false);
  const [writeOpen, setWriteOpen] = useState(false);

  useEffect(() => {
    setReviews(product.id === "hero-velocity" ? velocityReviews : []);
    setShowAll(false);
  }, [product.id]);

  const visible = showAll ? reviews : reviews.slice(0, 4);
  const totalDistribution = ratingDistribution.reduce((sum, row) => sum + row.count, 0);

  const handleSubmit = (review: Review) => {
    setReviews((prev) => [review, ...prev]);
    setWriteOpen(false);
    toast.success("Thanks for your review", { description: "It's now visible on this page." });
  };

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="scroll-mt-28 border-t border-white/10">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-24">
        <div className="lg:col-span-4">
          <h2 id="reviews-heading" className="font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">
            Reviews
          </h2>
          <div className="mt-6 flex items-end gap-4">
            <span className="font-display text-6xl font-black leading-none tabular-nums">{product.rating.toFixed(1)}</span>
            <div className="pb-1">
              <RatingStars rating={product.rating} size="lg" />
              <p className="mt-1 text-sm text-silver">Based on {product.reviewCount} reviews</p>
            </div>
          </div>

          {seedReviews.length > 0 &&
          <ul className="mt-8 space-y-2" aria-label="Rating breakdown">
              {ratingDistribution.map((row) =>
            <li key={row.stars} className="flex items-center gap-3 text-xs text-silver">
                  <span className="w-10 tabular-nums">{row.stars} star</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span className="block h-full bg-white" style={{ width: `${row.count / totalDistribution * 100}%` }} />
                  </span>
                  <span className="w-6 text-right tabular-nums">{row.count}</span>
                </li>
            )}
            </ul>
          }

          <div className="mt-8 rounded-sm bg-ink-900 p-5">
            <p className="text-xs uppercase tracking-[0.14em] text-steel">Fit feedback</p>
            <p className="mt-1 font-display text-lg font-bold">Mostly true to size</p>
            <div className="mt-3 grid grid-cols-3 gap-1" aria-hidden="true">
              <span className="h-1.5 rounded-full bg-white/15" />
              <span className="h-1.5 rounded-full bg-white" />
              <span className="h-1.5 rounded-full bg-white/15" />
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-steel">
              <span>Runs small</span>
              <span>True</span>
              <span>Runs large</span>
            </div>
          </div>

          <Button variant="outline" className="mt-6" fullWidth onClick={() => setWriteOpen(true)}>
            Write a review
          </Button>
        </div>

        <div className="lg:col-span-8">
          {reviews.length === 0 ?
          <div className="flex h-full flex-col items-center justify-center rounded-sm border border-dashed border-white/15 px-6 py-16 text-center">
              <MessageSquareIcon className="h-8 w-8 text-silver" aria-hidden="true" />
              <p className="mt-4 font-display text-lg font-bold uppercase">Share your take on {product.name}</p>
              <p className="mt-2 max-w-sm text-sm text-silver">Written reviews for this style will appear here. Owned a pair? Help others choose.</p>
            </div> :

          <>
              <ul className="grid gap-4 sm:grid-cols-2">
                {visible.map((review) =>
              <li key={review.id}>
                    <ReviewCard review={review} />
                  </li>
              )}
              </ul>
              {reviews.length > 4 &&
            <div className="mt-8 text-center">
                  <Button variant="outline" onClick={() => setShowAll((prev) => !prev)}>
                    {showAll ? "Show fewer reviews" : `Show all ${reviews.length} reviews`}
                  </Button>
                </div>
            }
            </>
          }
        </div>
      </div>
      <WriteReviewModal open={writeOpen} onClose={() => setWriteOpen(false)} productName={product.name} onSubmit={handleSubmit} />
    </section>);

}