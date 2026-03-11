import { Category, DashboardData, Product } from "./types";

const API_BASE =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:8000";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function getCategories(): Promise<Category[]> {
  const result = await fetchJson<{ data: Category[] }>("/api/categories");
  return result.data;
}

export async function getProducts(): Promise<Product[]> {
  const result = await fetchJson<{ data: Product[] }>("/api/products");
  return result.data;
}

export async function getProductBySlug(slug: string): Promise<Product> {
  const result = await fetchJson<{ data: Product }>(`/api/products/${slug}`);
  return result.data;
}

export async function getDashboardData(): Promise<DashboardData> {
  const result = await fetchJson<{ data: DashboardData }>("/api/dashboard");
  return result.data;
}
