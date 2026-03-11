"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { addProductToCart, fetchCart, getGuestToken } from "@/lib/cart-service";
import { Cart, Category, Product } from "@/lib/types";
import { Smartphone, Laptop, Shirt, Tablet, Home as HomeIcon, Tv, MoreHorizontal, ShoppingBag } from "lucide-react";

type Props = {
  categories: Category[];
  products: Product[];
};

const CATEGORY_ICONS: Record<string, any> = {
  mobiles: Smartphone,
  laptops: Laptop,
  fashion: Shirt,
  electronics: Tablet,
  home: HomeIcon,
  appliances: Tv,
};

function discountedPrice(price: number, discountPercent: number) {
  return Math.round(price - (price * discountPercent) / 100);
}

export default function Storefront({ categories, products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<Cart | null>(null);
  const [busyProductId, setBusyProductId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  useEffect(() => {
    const token = getGuestToken();
    fetchCart(token).then(setCart).catch(() => setFeedback("Could not load cart."));
  }, []);

  const visibleProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }

    return products.filter((product) => product.category.slug === selectedCategory);
  }, [products, selectedCategory]);

  const addToCart = async (product: Product) => {
    const token = getGuestToken();
    setBusyProductId(product.id);
    setFeedback("");
    try {
      const nextCart = await addProductToCart(token, product.id, 1);
      setCart(nextCart);
      setFeedback(`${product.title} added to cart.`);
    } catch (error) {
      if (error instanceof Error) {
        setFeedback(error.message);
      } else {
        setFeedback("Failed to add product to cart.");
      }
    } finally {
      setBusyProductId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6]">
      {/* Category Nav Bar */}
      <div className="bg-white shadow-sm border-b border-gray-100 mb-2">
        <div className="mx-auto flex max-w-[1248px] items-center justify-between px-4 py-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className="group flex flex-col items-center gap-1.5 transition"
          >
            <div className={`p-1 rounded-full ${selectedCategory === 'all' ? 'bg-fk-blue text-white' : 'text-slate-600 group-hover:text-fk-blue'}`}>
              <ShoppingBag className="h-6 w-6" />
            </div>
            <span className={`text-xs font-semibold ${selectedCategory === 'all' ? 'text-fk-blue' : 'text-slate-800'}`}>All</span>
          </button>
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.slug] || MoreHorizontal;
            const isActive = selectedCategory === category.slug;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className="group flex flex-col items-center gap-1.5 transition"
              >
                <div className={`p-1 rounded-full ${isActive ? 'bg-fk-blue text-white' : 'text-slate-600 group-hover:text-fk-blue'}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <span className={`text-xs font-semibold ${isActive ? 'text-fk-blue' : 'text-slate-800'}`}>{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-[1248px] flex-col gap-4 pb-12">
        {/* Banner */}
        <div className="relative h-[280px] w-full overflow-hidden rounded-sm bg-fk-blue shadow-sm">
          <Image
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80"
            alt="Sale Banner"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
            <p className="text-lg font-bold uppercase tracking-wider text-fk-yellow">Big Billion Days Special</p>
            <h1 className="mt-2 text-5xl font-extrabold tracking-tight">Best of Electronics & Home</h1>
            <p className="mt-4 text-xl font-medium opacity-90">Up to 80% Off | No Cost EMI available</p>
            <Link href="/products" className="mt-8 inline-flex w-fit rounded-sm bg-white px-8 py-3 text-sm font-bold text-fk-blue shadow-lg">
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {visibleProducts.map((product) => {
            const originalPrice = Number(product.price);
            const finalPrice = discountedPrice(originalPrice, product.discount_percent);

            return (
              <article key={product.id} className="group relative flex h-full flex-col bg-white p-4 transition-shadow hover:shadow-xl">
                <Link href={`/products/${product.slug}`} className="flex flex-col items-center">
                  <div className="relative mb-3 aspect-square w-full">
                    <Image
                      src={product.image_url}
                      alt={product.title}
                      fill
                      className="object-contain transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="w-full truncate text-[14px] font-medium text-slate-900 group-hover:text-fk-blue">
                    {product.title}
                  </h4>
                  <div className="mt-1 flex w-full items-center gap-1.5 overflow-hidden text-[13px]">
                    <div className="flex h-4 items-center gap-0.5 rounded-[4px] bg-[#388e3c] px-1.5 text-[11px] font-bold text-white">
                      <span>{product.rating}</span>
                      <span className="text-[8px]">★</span>
                    </div>
                    <span className="text-slate-500 font-medium">(2,142)</span>
                  </div>
                  <div className="mt-2 flex w-full items-center gap-2">
                    <span className="text-[16px] font-bold text-slate-900">
                      ₹{finalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[12px] text-slate-500 line-through">
                      ₹{originalPrice.toLocaleString("en-IN")}
                    </span>
                    <span className="text-[12px] font-bold text-[#388e3c]">
                      {product.discount_percent}% off
                    </span>
                  </div>
                </Link>
                <div className="mt-auto pt-4">
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    disabled={busyProductId === product.id}
                    className="flex w-full items-center justify-center gap-2 rounded-sm bg-fk-orange px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:brightness-105"
                  >
                    {busyProductId === product.id ? "Adding..." : "ADD TO CART"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    </div>
  );
}

