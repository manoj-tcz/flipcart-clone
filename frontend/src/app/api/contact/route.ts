import { backendUrl } from "@/lib/backend";

export async function POST(request: Request) {
  const body = await request.text();

  const response = await fetch(backendUrl("/api/contact"), {
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
