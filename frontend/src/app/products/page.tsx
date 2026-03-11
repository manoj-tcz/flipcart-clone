import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

function discountedPrice(price: number, discountPercent: number) {
  return Math.round(price - (price * discountPercent) / 100);
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      <div className="mx-auto w-full max-w-[1248px] px-4 py-8">
        <div className="flex flex-col gap-2 rounded-sm bg-white p-6 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">All Products Catalog</h1>
          <p className="text-sm text-slate-500">Showing {products.length} products with best deals and discounts.</p>
        </div>

        <section className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {products.map((product) => {
            const originalPrice = Number(product.price);
            const finalPrice = discountedPrice(originalPrice, product.discount_percent);

            return (
              <article key={product.id} className="group flex flex-col bg-white p-4 transition-shadow hover:shadow-xl">
                <Link href={`/products/${product.slug}`} className="flex h-full flex-col items-center">
                  <div className="relative mb-3 aspect-square w-full">
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      className="object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h2 className="w-full truncate text-[14px] font-medium text-slate-900 group-hover:text-fk-blue">
                    {product.title}
                  </h2>
                  <div className="mt-1 flex w-full items-center gap-1.5 overflow-hidden text-[13px]">
                    <div className="flex h-4 items-center gap-0.5 rounded-[4px] bg-[#388e3c] px-1.5 text-[11px] font-bold text-white">
                      <span>{product.rating}</span>
                      <span className="text-[8px]">★</span>
                    </div>
                    <span className="text-slate-500 font-medium">(1,502)</span>
                  </div>
                  <div className="mt-2 flex w-full items-center gap-2">
                    <span className="text-[16px] font-bold">₹{finalPrice.toLocaleString("en-IN")}</span>
                    <span className="text-[12px] text-slate-500 line-through">
                      ₹{originalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="mt-1 w-full text-[12px] font-bold text-[#388e3c]">
                    {product.discount_percent}% off
                  </div>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
