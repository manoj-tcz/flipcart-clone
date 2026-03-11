"use client";

import { useEffect, useMemo, useState } from "react";
import {
  checkoutCart,
  fetchCart,
  getGuestToken,
  removeCartItem,
  updateCartItem,
} from "@/lib/cart-service";
import { Cart } from "@/lib/types";
import { Trash2, ShieldCheck, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function discountedPrice(price: number, discountPercent: number) {
  return Math.round(price - (price * discountPercent) / 100);
}

type PaymentMethod = "upi" | "card" | "cod";

export default function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [status, setStatus] = useState("");
  const [busyItemId, setBusyItemId] = useState<number | null>(null);
  const [checkoutBusy, setCheckoutBusy] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");

  useEffect(() => {
    const token = getGuestToken();
    fetchCart(token)
      .then(setCart)
      .catch(() => setStatus("Could not load cart."));
  }, []);

  const totals = useMemo(() => {
    const subtotal =
      cart?.items.reduce((sum, item) => {
        const price = Number(item.product.price);
        return sum + discountedPrice(price, item.product.discount_percent) * item.quantity;
      }, 0) ?? 0;

    const originalTotal = cart?.items.reduce((sum, item) => {
      return sum + Number(item.product.price) * item.quantity;
    }, 0) ?? 0;

    return {
      subtotal,
      discount: originalTotal - subtotal,
      itemsCount: cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0,
    };
  }, [cart]);

  const handleQtyChange = async (itemId: number, quantity: number) => {
    const token = getGuestToken();
    setBusyItemId(itemId);
    try {
      const updated = await updateCartItem(token, itemId, quantity);
      setCart(updated);
      setStatus("Cart updated.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not update cart.");
    } finally {
      setBusyItemId(null);
    }
  };

  const handleRemove = async (itemId: number) => {
    const token = getGuestToken();
    setBusyItemId(itemId);
    try {
      const updated = await removeCartItem(token, itemId);
      setCart(updated);
      setStatus("Item removed.");
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Could not remove item.");
    } finally {
      setBusyItemId(null);
    }
  };

  const handleCheckout = async () => {
    const token = getGuestToken();
    setCheckoutBusy(true);
    setStatus("");
    try {
      const payment = await checkoutCart(token, paymentMethod, {
        upi_id: paymentMethod === "upi" ? "demo@upi" : undefined,
        card_last4: paymentMethod === "card" ? "4242" : undefined,
      });
      const refreshed = await fetchCart(token);
      setCart(refreshed);
      setStatus(`Payment successful. Ref: ${payment.transaction_ref}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Checkout failed.");
    } finally {
      setCheckoutBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] pb-12">
      <div className="mx-auto w-full max-w-[1248px] px-4 py-8">
        {status ? (
          <div className="mb-4 rounded-sm bg-white p-4 text-sm font-medium text-green-700 shadow-sm border-l-4 border-green-500">
            {status}
          </div>
        ) : null}

        <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
          <div className="flex flex-col gap-4">
            {/* Delivery Address Placeholder */}
            <div className="flex items-center justify-between rounded-sm bg-white px-6 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-fk-blue" />
                <span className="text-sm">Deliver to: <span className="font-semibold text-slate-900">Manoj, 560001</span></span>
              </div>
              <button className="text-sm font-bold text-fk-blue border border-slate-200 px-4 py-2 rounded-sm uppercase">Change</button>
            </div>

            <section className="bg-white shadow-sm rounded-sm">
              {cart?.items.length ? (
                cart.items.map((item, idx) => {
                  const originalPrice = Number(item.product.price);
                  const finalPrice = discountedPrice(originalPrice, item.product.discount_percent);

                  return (
                    <article key={item.id} className={`flex gap-6 p-6 ${idx !== 0 ? 'border-t border-gray-100' : ''}`}>
                      <div className="relative h-28 w-28 shrink-0">
                        <Image src={item.product.image_url} alt={item.product.title} fill className="object-contain" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h2 className="line-clamp-1 text-base font-medium text-slate-900 transition hover:text-fk-blue">
                          {item.product.title}
                        </h2>
                        <p className="text-sm text-slate-500">{item.product.category.name}</p>
                        <div className="flex items-center gap-3 pt-2">
                          <span className="text-lg font-bold">₹{finalPrice.toLocaleString("en-IN")}</span>
                          <span className="text-sm text-slate-500 line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
                          <span className="text-sm font-bold text-[#388e3c]">{item.product.discount_percent}% Off</span>
                        </div>

                        <div className="flex items-center gap-6 pt-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQtyChange(item.id, Math.max(1, item.quantity - 1))}
                              disabled={busyItemId === item.id || item.quantity <= 1}
                              className="h-7 w-7 rounded-sm border border-slate-300 transition hover:bg-slate-50 disabled:opacity-30"
                            >-</button>
                            <input
                              readOnly
                              value={item.quantity}
                              className="h-7 w-12 rounded-sm border border-slate-300 text-center text-xs font-bold"
                            />
                            <button
                              onClick={() => handleQtyChange(item.id, Math.min(10, item.quantity + 1))}
                              disabled={busyItemId === item.id || item.quantity >= 10}
                              className="h-7 w-7 rounded-sm border border-slate-300 transition hover:bg-slate-50 disabled:opacity-30"
                            >+</button>
                          </div>
                          <button
                            type="button"
                            disabled={busyItemId === item.id}
                            onClick={() => handleRemove(item.id)}
                            className="text-sm font-bold uppercase text-slate-900 transition hover:text-fk-blue"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center p-12 text-center">
                  <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="empty" className="h-40" />
                  <h3 className="mt-4 text-lg font-semibold">Your cart is empty!</h3>
                  <p className="mt-1 text-sm text-slate-500">Add items to it now.</p>
                  <Link href="/" className="mt-6 rounded-sm bg-fk-blue px-12 py-2.5 text-sm font-bold text-white shadow-md">Shop Now</Link>
                </div>
              )}
              {cart?.items.length ? (
                <div className="sticky bottom-0 z-10 flex justify-end border-t border-gray-100 bg-white p-4 shadow-[0_-2px_10px_0_rgba(0,0,0,0.1)]">
                  <button
                    type="button"
                    onClick={handleCheckout}
                    disabled={checkoutBusy || cart.items.length === 0}
                    className="rounded-sm bg-fk-orange px-16 py-3.5 text-[16px] font-bold text-white shadow-md transition hover:brightness-105"
                  >
                    {checkoutBusy ? "PROCESSING..." : "PLACE ORDER"}
                  </button>
                </div>
              ) : null}
            </section>
          </div>

          <aside className="sticky top-[80px] h-fit flex flex-col gap-4">
            <div className="bg-white rounded-sm shadow-sm overflow-hidden">
              <div className="border-b border-gray-100 px-6 py-3">
                <h3 className="text-base font-semibold text-slate-500 uppercase">Price Details</h3>
              </div>
              <div className="px-6 py-4 space-y-4">
                <div className="flex justify-between text-base">
                  <span>Price ({totals.itemsCount} items)</span>
                  <span>₹{(totals.subtotal + totals.discount).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span>Discount</span>
                  <span className="text-[#388e3c]">- ₹{totals.discount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span>Delivery Charges</span>
                  <span className="text-[#388e3c]">FREE</span>
                </div>
                <div className="flex justify-between border-t border-dashed border-gray-300 pt-4 text-[18px] font-bold">
                  <span>Total Amount</span>
                  <span>₹{totals.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-2 text-[14px] font-bold text-[#388e3c]">
                  You will save ₹{totals.discount.toLocaleString("en-IN")} on this order
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm shadow-sm p-6 space-y-4">
              <h4 className="text-sm font-bold uppercase text-slate-500">Dummy Payment Method</h4>
              <div className="space-y-3">
                <label className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-100 p-3 transition hover:bg-slate-50">
                  <input
                    type="radio"
                    className="h-4 w-4 text-fk-blue"
                    checked={paymentMethod === "upi"}
                    onChange={() => setPaymentMethod("upi")}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">UPI</span>
                    <span className="text-xs text-slate-500">demo@upi</span>
                  </div>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-100 p-3 transition hover:bg-slate-50">
                  <input
                    type="radio"
                    className="h-4 w-4 text-fk-blue"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Credit / Debit / ATM Card</span>
                    <span className="text-xs text-slate-500">**** 4242</span>
                  </div>
                </label>
                <label className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-100 p-3 transition hover:bg-slate-50">
                  <input
                    type="radio"
                    className="h-4 w-4 text-fk-blue"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold">Cash on Delivery</span>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 px-2 text-slate-500 font-bold text-[13px] uppercase">
              <ShieldCheck className="h-8 w-8 text-slate-400" />
              <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
