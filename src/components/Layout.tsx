import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { ScrollToTop } from "./ScrollToTop";

export function Layout() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-midnight font-sans text-white">
      <a
        href="#main"
        className="sr-only z-[100] rounded-sm bg-white px-4 py-2 text-sm font-semibold text-midnight focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        
        Skip to content
      </a>
      <ScrollToTop />
      <AnnouncementBar />
      <Navbar />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <Toaster
        position="bottom-right"
        theme="dark"
        offset={20}
        toastOptions={{
          style: {
            background: "#16161A",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#FFFFFF",
            borderRadius: "4px",
            fontFamily: "Inter, system-ui, sans-serif"
          }
        }} />
      
    </div>);

}