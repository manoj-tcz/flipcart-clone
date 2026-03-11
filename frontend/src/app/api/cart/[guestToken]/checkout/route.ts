import { backendUrl } from "@/lib/backend";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ guestToken: string }> }
) {
  const { guestToken } = await params;
  const body = await request.text();

  const response = await fetch(backendUrl(`/api/cart/${guestToken}/checkout`), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  const payload = await response.text();

  return new Response(payload, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
