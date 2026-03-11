import { backendUrl } from "@/lib/backend";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ guestToken: string }> }
) {
  const { guestToken } = await params;
  const response = await fetch(backendUrl(`/api/cart/${guestToken}`), {
    cache: "no-store",
  });
  const payload = await response.text();

  return new Response(payload, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
