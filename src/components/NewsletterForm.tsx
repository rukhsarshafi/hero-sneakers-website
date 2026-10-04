import React, { FormEvent, useState } from "react";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { Button } from "./Button";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    window.setTimeout(() => setStatus("success"), 800);
  };

  if (status === "success") {
    return (
      <p className="flex items-center gap-3 text-sm text-white" role="status">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-midnight">
          <CheckIcon className="h-4 w-4" />
        </span>
        You're in. Watch your inbox for early drops.
      </p>);

  }

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Enter your email"
          aria-invalid={status === "error"}
          aria-describedby="newsletter-error"
          className={`h-12 w-full flex-1 rounded-sm border bg-ink-800 px-4 text-sm text-white placeholder:text-steel focus:outline-none ${
          status === "error" ? "border-hero" : "border-white/15 focus:border-white"}`
          } />
        
        <Button type="submit" variant="light" disabled={status === "loading"} className="sm:w-40">
          {status === "loading" ? <Loader2Icon className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </Button>
      </div>
      <p id="newsletter-error" className="mt-2 min-h-[1rem] text-xs text-hero" aria-live="polite">
        {status === "error" ? "Please enter a valid email address." : ""}
      </p>
    </form>);

}