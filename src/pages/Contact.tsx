import React, { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon, ClockIcon, Loader2Icon, MailIcon, MapPinIcon } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { Button } from "../components/Button";
import { SocialLinks } from "../components/SocialLinks";

type Field = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<Field, string>>;

export function Contact() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const update = (field: Field) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) next.email = "Please enter a valid email.";
    if (values.phone && !/^[+\d\s-]{10,15}$/.test(values.phone)) next.phone = "Please enter a valid phone number.";
    if (values.message.trim().length < 10) next.message = "Please write at least 10 characters.";
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1000);
  };

  const inputClass = (field: Field) =>
  `w-full rounded-sm border bg-ink-900 px-4 text-sm text-white placeholder:text-steel focus:outline-none ${
  errors[field] ? "border-hero" : "border-white/15 focus:border-white"}`;


  return (
    <>
      <PageHeader
        title="Contact"
        breadcrumb="Contact"
        description="Questions about sizing, an order or a return? We usually reply within one working day." />
      

      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8 lg:py-20">
        <section aria-label="Contact form" className="lg:col-span-7">
          {status === "sent" ?
          <div className="rounded-sm border border-white/10 bg-ink-900 p-8 sm:p-10" role="status">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-white text-midnight">
                <CheckIcon className="h-6 w-6" />
              </span>
              <h2 className="mt-6 font-display text-2xl font-extrabold uppercase">Message sent</h2>
              <p className="mt-2 text-silver">Thanks, {values.name.split(" ")[0]}. We'll get back to you at {values.email} soon.</p>
              <Button
              variant="outline"
              className="mt-8"
              onClick={() => {
                setValues({ name: "", email: "", phone: "", message: "" });
                setStatus("idle");
              }}>
              
                Send another message
              </Button>
            </div> :

          <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <FormField id="name" label="Name" error={errors.name}>
                <input id="name" autoComplete="name" value={values.name} onChange={update("name")} className={`${inputClass("name")} h-12`} aria-invalid={!!errors.name} aria-describedby="name-error" />
              </FormField>
              <FormField id="email" label="Email" error={errors.email}>
                <input id="email" type="email" autoComplete="email" value={values.email} onChange={update("email")} className={`${inputClass("email")} h-12`} aria-invalid={!!errors.email} aria-describedby="email-error" />
              </FormField>
              <FormField id="phone" label="Phone (optional)" error={errors.phone} className="sm:col-span-2">
                <input id="phone" type="tel" autoComplete="tel" value={values.phone} onChange={update("phone")} placeholder="0300 1234567" className={`${inputClass("phone")} h-12`} aria-invalid={!!errors.phone} aria-describedby="phone-error" />
              </FormField>
              <FormField id="message" label="Message" error={errors.message} className="sm:col-span-2">
                <textarea id="message" rows={6} value={values.message} onChange={update("message")} className={`${inputClass("message")} py-3`} aria-invalid={!!errors.message} aria-describedby="message-error" />
              </FormField>
              <div className="sm:col-span-2">
                <Button type="submit" size="lg" disabled={status === "sending"} className="w-full sm:w-auto">
                  {status === "sending" ? <><Loader2Icon className="h-4 w-4 animate-spin" /> Sending</> : "Submit"}
                </Button>
              </div>
            </form>
          }
        </section>

        <aside className="lg:col-span-5">
          <div className="border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="font-display text-2xl font-black uppercase">HERO SNEAKERS</p>
            <ul className="mt-6 space-y-4 text-sm text-silver">
              <li className="flex gap-3"><MapPinIcon className="h-4 w-4 shrink-0 text-white" aria-hidden="true" /> Pakistan</li>
              <li className="flex gap-3"><MailIcon className="h-4 w-4 shrink-0 text-white" aria-hidden="true" /> hello@herosneakers.pk</li>
              <li className="flex gap-3"><ClockIcon className="h-4 w-4 shrink-0 text-white" aria-hidden="true" /> Mon–Sat, 10 AM – 7 PM PKT</li>
            </ul>
            <div className="mt-10">
              <p className="font-display text-xs font-bold uppercase tracking-[0.16em]">Follow us</p>
              <div className="mt-4">
                <SocialLinks />
              </div>
            </div>
            <div className="mt-10 rounded-sm bg-ink-900 p-5 text-sm text-silver">
              Looking for delivery times or how to return a pair? Most answers are in{" "}
              <Link to="/shipping-returns" className="text-white underline underline-offset-4">Shipping & Returns</Link>.
            </div>
          </div>
        </aside>
      </div>
    </>);

}

function FormField({ id, label, error, className = "", children }: {id: string;label: string;error?: string;className?: string;children: React.ReactNode;}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-white">{label}</label>
      {children}
      <p id={`${id}-error`} className="mt-1.5 min-h-[1rem] text-xs text-hero" aria-live="polite">{error}</p>
    </div>);

}