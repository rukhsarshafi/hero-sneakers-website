import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { NewArrivals } from "./pages/NewArrivals";
import { ProductDetail } from "./pages/ProductDetail";
import { About } from "./pages/About";
import { SizeGuide } from "./pages/SizeGuide";
import { Cart } from "./pages/Cart";
import { ShippingReturns } from "./pages/ShippingReturns";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/new-arrivals" element={<NewArrivals />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/size-guide" element={<SizeGuide />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping-returns" element={<ShippingReturns />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>);

}