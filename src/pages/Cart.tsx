import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { LockIcon, RotateCcwIcon, ShoppingBagIcon } from "lucide-react";
import { Button } from "../components/Button";
import { ButtonLink } from "../components/ButtonLink";
import { CartLineItem } from "../components/CartLineItem";
import { CheckoutModal } from "../components/CheckoutModal";
import { FreeShippingProgress } from "../components/FreeShippingProgress";
import { ProductGrid } from "../components/ProductGrid";
import { useCart } from "../contexts/CartContext";
import { featuredProductIds, products } from "../data/products";
import { formatPrice } from "../utils/currency";

const suggestions = products.filter((product) => featuredProductIds.includes(product.id));

export function Cart() {
  const { items, count, subtotal, shipping, total } = useCart();
  const [params, setParams] = useSearchParams();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  useEffect(() => {
    if (params.get("checkout") === "1") setCheckoutOpen(true);
  }, [params]);

  const closeCheckout = () => {
    setCheckoutOpen(false);
    if (params.get("checkout")) setParams({}, { replace: true });
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-8 lg:pt-14">
        <h1 className="font-display text-4xl font-black uppercase tracking-tight sm:text-5xl lg:text-6xl">
          Your cart {count > 0 && <span className="text-steel">({count})</span>}
        </h1>

        {items.length === 0 ?
        <div className="mt-10 flex flex-col items-center rounded-sm border border-dashed border-white/15 px-6 py-20 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-white/15">
              <ShoppingBagIcon className="h-6 w-6 text-silver" />
            </span>
            <p className="mt-5 font-display text-2xl font-extrabold uppercase">Your cart is empty</p>
            <p className="mt-2 text-sm text-silver">Free shipping on orders over Rs. 10,000.</p>
            <ButtonLink to="/shop" className="mt-6" size="lg">Continue shopping</ButtonLink>
          </div> :

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <section aria-label="Cart items" className="lg:col-span-8">
              <div className="rounded-sm bg-ink-900 p-5">
                <FreeShippingProgress subtotal={subtotal} />
              </div>
              <div className="mt-4 divide-y divide-white/10 border-b border-white/10">
                {items.map((item) =>
              <CartLineItem key={item.key} item={item} large />
              )}
              </div>
            </section>

            <aside aria-labelledby="summary-heading" className="lg:col-span-4">
              <div className="rounded-sm border border-white/10 bg-ink-900 p-6 lg:sticky lg:top-28">
                <h2 id="summary-heading" className="font-display text-lg font-extrabold uppercase tracking-wide">Order summary</h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-silver">Subtotal</dt>
                    <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-silver">
                      Shipping
                      <span className="block text-xs text-steel">Standard, 2–7 working days</span>
                    </dt>
                    <dd className="tabular-nums">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-white/10 pt-4">
                    <dt className="font-semibold">Total</dt>
                    <dd className="font-display text-2xl font-black tabular-nums">{formatPrice(total)}</dd>
                  </div>
                </dl>
                <div className="mt-6 space-y-2">
                  <Button fullWidth size="lg" onClick={() => setCheckoutOpen(true)}>
                    Proceed to checkout
                  </Button>
                  <ButtonLink to="/shop" variant="outline" fullWidth>
                    Continue shopping
                  </ButtonLink>
                </div>
                <ul className="mt-6 space-y-2 text-xs text-silver">
                  <li className="flex items-center gap-2"><LockIcon className="h-3.5 w-3.5" aria-hidden="true" /> Secure checkout · Cash on delivery available</li>
                  <li className="flex items-center gap-2"><RotateCcwIcon className="h-3.5 w-3.5" aria-hidden="true" /> 14-day returns & free size exchanges</li>
                </ul>
              </div>
            </aside>
          </div>
        }
      </div>

      {items.length === 0 &&
      <section aria-labelledby="suggestions-heading" className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
            <h2 id="suggestions-heading" className="font-display text-2xl font-extrabold uppercase sm:text-3xl">Featured heroes</h2>
            <div className="mt-8">
              <ProductGrid products={suggestions} />
            </div>
          </div>
        </section>
      }

      <CheckoutModal open={checkoutOpen} onClose={closeCheckout} />
    </>);

}