const BACKEND_BASE =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

export function backendUrl(path: string): string {
  return `${BACKEND_BASE}${path}`;
}
