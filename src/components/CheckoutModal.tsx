import React, { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/currency";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

type Status = "form" | "placing" | "success";
type Payment = "cod" | "card";

const cities = ["Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Peshawar", "Quetta", "Other"];

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
  const { items, count, subtotal, shipping, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [status, setStatus] = useState<Status>("form");
  const [form, setForm] = useState({ name: "", phone: "", city: "Karachi", address: "" });
  const [payment, setPayment] = useState<Payment>("cod");
  const [error, setError] = useState("");
  const [order, setOrder] = useState({ id: "", total: 0 });

  useEffect(() => {
    if (open) {
      setStatus("form");
      setError("");
    }
  }, [open]);

  const update = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
  setForm((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.address.trim()) return setError("Please enter your name and delivery address.");
    if (!/^(\+92|0)?3\d{9}$/.test(form.phone.replace(/[\s-]/g, ""))) return setError("Enter a valid Pakistani mobile number, e.g. 0300 1234567.");
    setError("");
    setStatus("placing");
    window.setTimeout(() => {
      setOrder({ id: `HS-${Math.floor(100000 + Math.random() * 900000)}`, total });
      clearCart();
      setStatus("success");
    }, 1100);
  };

  const inputClass =
  "h-12 w-full rounded-sm border border-white/15 bg-ink-800 px-4 text-sm text-white placeholder:text-steel focus:border-white focus:outline-none";

  if (status === "success") {
    return (
      <Modal open={open} onClose={onClose} title="Order confirmed">
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white text-midnight">
            <CheckIcon className="h-7 w-7" />
          </span>
          <p className="mt-5 font-display text-2xl font-black uppercase">Thank you, {form.name.split(" ")[0]}</p>
          <p className="mt-2 text-sm text-silver">
            Order <span className="font-semibold text-white">{order.id}</span> · {formatPrice(order.total)}
          </p>
          <p className="mt-4 text-sm text-silver">
            We'll send a confirmation and tracking number to {form.phone}. Estimated delivery to {form.city}: 2–7 working days.
          </p>
          <Button
            className="mt-8"
            fullWidth
            size="lg"
            onClick={() => {
              onClose();
              navigate("/shop");
            }}>
            
            Continue shopping
          </Button>
        </div>
      </Modal>);

  }

  return (
    <Modal open={open} onClose={onClose} title="Checkout" size="lg">
      {items.length === 0 ?
      <p className="py-6 text-center text-sm text-silver">Your bag is empty — add a pair before checking out.</p> :

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div className="flex items-center justify-between rounded-sm bg-ink-800 px-4 py-3 text-sm">
            <span className="text-silver">{count} {count === 1 ? "item" : "items"} · Shipping {shipping === 0 ? "free" : formatPrice(shipping)}</span>
            <span className="font-display font-extrabold tabular-nums">{formatPrice(total)}</span>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="co-name" className="mb-1.5 block text-xs font-semibold">Full name</label>
              <input id="co-name" autoComplete="name" value={form.name} onChange={update("name")} className={inputClass} />
            </div>
            <div>
              <label htmlFor="co-phone" className="mb-1.5 block text-xs font-semibold">Mobile number</label>
              <input id="co-phone" type="tel" autoComplete="tel" value={form.phone} onChange={update("phone")} placeholder="0300 1234567" className={inputClass} />
            </div>
            <div>
              <label htmlFor="co-city" className="mb-1.5 block text-xs font-semibold">City</label>
              <select id="co-city" value={form.city} onChange={update("city")} className={inputClass}>
                {cities.map((city) => <option key={city}>{city}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="co-address" className="mb-1.5 block text-xs font-semibold">Delivery address</label>
              <input id="co-address" autoComplete="street-address" value={form.address} onChange={update("address")} className={inputClass} />
            </div>
          </div>
          <fieldset>
            <legend className="mb-2 text-xs font-semibold">Payment</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {([
            { id: "cod", label: "Cash on delivery" },
            { id: "card", label: "Debit / credit card" }] as
            {id: Payment;label: string;}[]).map((option) =>
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={payment === option.id}
              onClick={() => setPayment(option.id)}
              className={`flex h-12 items-center gap-3 rounded-sm border px-4 text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hero ${
              payment === option.id ? "border-white text-white" : "border-white/15 text-silver hover:border-white/40"}`
              }>
              
                  <span className={`grid h-4 w-4 place-items-center rounded-full border ${payment === option.id ? "border-hero" : "border-white/30"}`}>
                    {payment === option.id && <span className="h-2 w-2 rounded-full bg-hero" />}
                  </span>
                  {option.label}
                </button>
            )}
            </div>
          </fieldset>
          <p className="min-h-[1rem] text-xs text-hero" aria-live="polite">{error}</p>
          <Button type="submit" fullWidth size="lg" disabled={status === "placing"}>
            {status === "placing" ?
          <>
                <Loader2Icon className="h-4 w-4 animate-spin" /> Placing order
              </> :

          `Place order · ${formatPrice(total)}`
          }
          </Button>
          <p className="text-center text-xs text-steel">Subtotal {formatPrice(subtotal)} · 14-day returns on every order</p>
        </form>
      }
    </Modal>);

}