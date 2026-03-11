import { backendUrl } from "@/lib/backend";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ guestToken: string; itemId: string }> }
) {
  const { guestToken, itemId } = await params;
  const body = await request.text();

  const response = await fetch(backendUrl(`/api/cart/${guestToken}/items/${itemId}`), {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const payload = await response.text();

  return new Response(payload, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ guestToken: string; itemId: string }> }
) {
  const { guestToken, itemId } = await params;

  const response = await fetch(backendUrl(`/api/cart/${guestToken}/items/${itemId}`), {
    method: "DELETE",
  });
  const payload = await response.text();

  return new Response(payload, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
