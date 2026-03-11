import Storefront from "@/components/storefront";
import { getCategories, getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <Storefront categories={categories} products={products} />
  );
}
