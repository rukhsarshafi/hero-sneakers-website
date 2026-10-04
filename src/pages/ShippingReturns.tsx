import React from "react";
import { Link } from "react-router-dom";
import { PageHeader } from "../components/PageHeader";
import { AccordionItem } from "../components/Accordion";
import { deliveryEstimates, faqs, returnConditions, returnSteps } from "../data/policies";

const sections = [
{ id: "shipping", label: "Shipping" },
{ id: "returns", label: "Returns" },
{ id: "exchanges", label: "Exchanges" },
{ id: "faqs", label: "FAQs" }];


const highlights = [
{ value: "Rs. 300", label: "Standard delivery", note: "Free over Rs. 10,000" },
{ value: "2–7 days", label: "Estimated delivery", note: "Working days, across Pakistan" },
{ value: "14 days", label: "Returns window", note: "From the day you receive it" }];


export function ShippingReturns() {
  return (
    <>
      <PageHeader
        title="Shipping & Returns"
        breadcrumb="Shipping & Returns"
        description="Simple, clear and fair. Here's how delivery, returns and exchanges work." />
      

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <dl className="grid border-b border-white/10 sm:grid-cols-3">
          {highlights.map((item, index) =>
          <div key={item.label} className={`py-8 ${index > 0 ? "border-t border-white/10 sm:border-l sm:border-t-0 sm:pl-8" : ""}`}>
              <dt className="text-xs uppercase tracking-[0.14em] text-steel">{item.label}</dt>
              <dd className="mt-2 font-display text-3xl font-black">{item.value}</dd>
              <dd className="mt-1 text-sm text-silver">{item.note}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
        <nav aria-label="On this page" className="hidden lg:col-span-3 lg:block">
          <ul className="sticky top-28 space-y-1 border-l border-white/10">
            {sections.map((section) =>
            <li key={section.id}>
                <a href={`#${section.id}`} className="-ml-px block border-l border-transparent py-2 pl-4 text-sm text-silver hover:border-white hover:text-white">
                  {section.label}
                </a>
              </li>
            )}
          </ul>
        </nav>

        <div className="space-y-20 lg:col-span-9">
          <section id="shipping" aria-labelledby="shipping-heading" className="scroll-mt-28">
            <h2 id="shipping-heading" className="font-display text-3xl font-extrabold uppercase sm:text-4xl">Shipping</h2>
            <p className="mt-4 max-w-2xl text-silver">
              We deliver across Pakistan with standard shipping. Standard delivery costs Rs. 300 per order and is free on orders
              over Rs. 10,000. Orders placed before 2 PM on working days are usually dispatched the same day.
            </p>
            <div className="mt-8 overflow-hidden rounded-sm border border-white/10">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Estimated delivery times</caption>
                <thead className="bg-ink-800">
                  <tr>
                    <th scope="col" className="px-5 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em]">Region</th>
                    <th scope="col" className="hidden px-5 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] sm:table-cell">Includes</th>
                    <th scope="col" className="px-5 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em]">Estimate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {deliveryEstimates.map((row) =>
                  <tr key={row.region}>
                      <th scope="row" className="px-5 py-4 font-semibold">{row.region}</th>
                      <td className="hidden px-5 py-4 text-silver sm:table-cell">{row.examples}</td>
                      <td className="px-5 py-4 text-silver">{row.time}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-steel">Delivery estimates are approximate and may vary during sales, holidays or bad weather.</p>
          </section>

          <section id="returns" aria-labelledby="returns-heading" className="scroll-mt-28">
            <h2 id="returns-heading" className="font-display text-3xl font-extrabold uppercase sm:text-4xl">Returns</h2>
            <p className="mt-4 max-w-2xl text-silver">
              Changed your mind? You can return any full-price HERO sneakers within 14 days of delivery, as long as they meet the
              conditions below.
            </p>
            <h3 className="mt-10 font-display text-base font-bold uppercase tracking-wide">Condition requirements</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-silver marker:text-steel">
              {returnConditions.map((condition) => <li key={condition}>{condition}</li>)}
            </ul>
            <h3 className="mt-10 font-display text-base font-bold uppercase tracking-wide">Return process</h3>
            <ol className="mt-4">
              {returnSteps.map((step, index) =>
              <li key={step.title} className="flex gap-5 border-t border-white/10 py-5">
                  <span className="font-display text-2xl font-black leading-none text-steel tabular-nums">{index + 1}</span>
                  <div>
                    <p className="font-semibold">{step.title}</p>
                    <p className="mt-1 text-sm text-silver">{step.body}</p>
                  </div>
                </li>
              )}
            </ol>
          </section>

          <section id="exchanges" aria-labelledby="exchanges-heading" className="scroll-mt-28">
            <h2 id="exchanges-heading" className="font-display text-3xl font-extrabold uppercase sm:text-4xl">Exchanges</h2>
            <p className="mt-4 max-w-2xl text-silver">
              Need a different size? Size exchanges are free within 14 days, subject to stock. Follow the same return process and
              tell us the size you need — we'll ship the new pair as soon as the original arrives. Not sure of your size? Check the{" "}
              <Link to="/size-guide" className="text-white underline underline-offset-4">size guide</Link>.
            </p>
          </section>

          <section id="faqs" aria-labelledby="faqs-heading" className="scroll-mt-28">
            <h2 id="faqs-heading" className="font-display text-3xl font-extrabold uppercase sm:text-4xl">FAQs</h2>
            <div className="mt-6 border-t border-white/10">
              {faqs.map((faq) =>
              <AccordionItem key={faq.question} title={faq.question}>
                  <p>{faq.answer}</p>
                </AccordionItem>
              )}
            </div>
            <p className="mt-8 text-sm text-silver">
              Still have a question? <Link to="/contact" className="text-white underline underline-offset-4">Contact us</Link>.
            </p>
          </section>
        </div>
      </div>
    </>);

}