import React, { FormEvent, useEffect, useState } from "react";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface AccountModalProps {
  open: boolean;
  onClose: () => void;
}

type Status = "idle" | "loading" | "success";

export function AccountModal({ open, onClose }: AccountModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (open) {
      setStatus("idle");
      setError("");
    }
  }, [open]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setError("");
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 900);
  };

  const inputClass =
  "h-12 w-full rounded-sm border border-white/15 bg-ink-800 px-4 text-sm text-white placeholder:text-steel focus:border-white focus:outline-none";

  return (
    <Modal open={open} onClose={onClose} title={status === "success" ? "Welcome back" : "Sign in"}>
      {status === "success" ?
      <div className="py-4 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-midnight">
            <CheckIcon className="h-6 w-6" />
          </span>
          <p className="mt-4 text-sm text-silver">You're signed in as {email}. Your bag and wishlist are saved.</p>
          <Button className="mt-6" fullWidth onClick={onClose}>
            Continue shopping
          </Button>
        </div> :

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <p className="text-sm text-silver">Sign in to track orders and save your favourite pairs.</p>
          <div>
            <label htmlFor="account-email" className="mb-1.5 block text-xs font-semibold text-white">Email</label>
            <input id="account-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor="account-password" className="mb-1.5 block text-xs font-semibold text-white">Password</label>
            <input id="account-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass} placeholder="••••••••" />
          </div>
          <p className="min-h-[1rem] text-xs text-hero" aria-live="polite">{error}</p>
          <Button type="submit" fullWidth size="lg" disabled={status === "loading"}>
            {status === "loading" ? <Loader2Icon className="h-4 w-4 animate-spin" /> : null}
            {status === "loading" ? "Signing in" : "Sign in"}
          </Button>
          <p className="text-center text-xs text-steel">New to HERO? An account is created automatically at checkout.</p>
        </form>
      }
    </Modal>);

}