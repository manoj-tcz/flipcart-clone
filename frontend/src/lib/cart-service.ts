import { Cart, Payment } from "./types";

const GUEST_TOKEN_KEY = "flipkart_guest_token";

function buildGuestToken(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `guest-${Date.now()}`;
}

export function getGuestToken(): string {
  const existing = localStorage.getItem(GUEST_TOKEN_KEY);
  if (existing) {
    return existing;
  }

  const token = buildGuestToken();
  localStorage.setItem(GUEST_TOKEN_KEY, token);
  return token;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.message || "Request failed");
  }

  return payload;
}

export async function fetchCart(guestToken: string): Promise<Cart> {
  const response = await fetch(`/api/cart/${guestToken}`, {
    cache: "no-store",
  });
  const payload = await parseResponse<{ data: Cart }>(response);
  return payload.data;
}

export async function addProductToCart(
  guestToken: string,
  productId: number,
  quantity = 1
): Promise<Cart> {
  const response = await fetch(`/api/cart/${guestToken}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  const payload = await parseResponse<{ data: Cart }>(response);
  return payload.data;
}

export async function updateCartItem(
  guestToken: string,
  itemId: number,
  quantity: number
): Promise<Cart> {
  const response = await fetch(`/api/cart/${guestToken}/items/${itemId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  const payload = await parseResponse<{ data: Cart }>(response);
  return payload.data;
}

export async function removeCartItem(guestToken: string, itemId: number): Promise<Cart> {
  const response = await fetch(`/api/cart/${guestToken}/items/${itemId}`, {
    method: "DELETE",
  });
  const payload = await parseResponse<{ data: Cart }>(response);
  return payload.data;
}

export async function checkoutCart(
  guestToken: string,
  paymentMethod: "upi" | "card" | "cod",
  extra?: { upi_id?: string; card_last4?: string }
): Promise<Payment> {
  const response = await fetch(`/api/cart/${guestToken}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ payment_method: paymentMethod, ...extra }),
  });
  const payload = await parseResponse<{ data: Payment }>(response);
  return payload.data;
}
