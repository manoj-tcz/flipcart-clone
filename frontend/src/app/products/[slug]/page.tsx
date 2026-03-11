import Image from "next/image";
import { getProductBySlug } from "@/lib/api";
import { ShoppingCart, Zap, Star, ShieldCheck, Truck, MapPin } from "lucide-react";
import Link from "next/link";

type Params = {
  slug: string;
};

function discountedPrice(price: number, discountPercent: number) {
  return Math.round(price - (price * discountPercent) / 100);
}

export default async function ProductDetailsPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const originalPrice = Number(product.price);
  const finalPrice = discountedPrice(originalPrice, product.discount_percent);

  return (
    <div className="min-h-screen bg-[#f1f3f6] pb-12 font-sans">
      <div className="mx-auto w-full max-w-[1248px] px-4 py-4">
        <div className="grid gap-4 md:grid-cols-[1fr_1.5fr]">
          {/* Left Column: Image and Buttons */}
          <div className="space-y-4">
            <div className="relative flex flex-col rounded-sm border border-gray-100 bg-white p-4 shadow-sm">
              <div className="relative h-[450px] w-full">
                <Image
                  src={product.image_url}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex h-14 items-center justify-center gap-2 rounded-sm bg-[#ff9f00] text-sm font-bold text-white shadow-md transition hover:brightness-105">
                <ShoppingCart className="h-5 w-5" />
                ADD TO CART
              </button>
              <button className="flex h-14 items-center justify-center gap-2 rounded-sm bg-fk-orange text-sm font-bold text-white shadow-md transition hover:brightness-105">
                <Zap className="h-5 w-5" />
                BUY NOW
              </button>
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="rounded-sm bg-white p-6 shadow-sm">
            <nav className="mb-4 flex text-[12px] text-slate-500">
              <Link href="/" className="hover:text-fk-blue">Home</Link>
              <span className="mx-1.5">›</span>
              <Link href="/products" className="hover:text-fk-blue">{product.category.name}</Link>
              <span className="mx-1.5">›</span>
              <span className="truncate">{product.title}</span>
            </nav>

            <h1 className="text-xl font-medium text-slate-900">{product.title}</h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex h-5 items-center gap-1 rounded-[4px] bg-[#388e3c] px-1.5 text-[12px] font-bold text-white">
                <span>{product.rating}</span>
                <Star className="h-3 w-3 fill-white" />
              </div>
              <span className="text-sm font-medium text-slate-500 underline">2,142 Ratings & 256 Reviews</span>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" alt="assured" className="h-5" />
            </div>

            <p className="mt-4 text-[14px] font-bold text-[#388e3c]">Special price</p>
            <div className="mt-1 flex items-baseline gap-4">
              <span className="text-3xl font-bold text-slate-900">₹{finalPrice.toLocaleString("en-IN")}</span>
              <span className="text-base text-slate-500 line-through">₹{originalPrice.toLocaleString("en-IN")}</span>
              <span className="text-lg font-bold text-[#388e3c]">{product.discount_percent}% off</span>
            </div>

            <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Available Offers</h3>
                <ul className="mt-3 space-y-2.5">
                  <li className="flex gap-2 text-[14px]">
                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/offer_94e330.png" className="h-5 w-5 shrink-0" alt="offer" />
                    <span><span className="font-bold">Bank Offer</span> 10% instant discount on Cards on orders of ₹5,000 and above <span className="text-fk-blue font-bold cursor-pointer">T&C</span></span>
                  </li>
                  <li className="flex gap-2 text-[14px]">
                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/offer_94e330.png" className="h-5 w-5 shrink-0" alt="offer" />
                    <span><span className="font-bold">Partner Offer</span> Get extra 20% off on your next purchase of Electronics <span className="text-fk-blue font-bold cursor-pointer">T&C</span></span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-4 pt-4 text-sm">
                <div className="font-bold text-slate-500">Delivery</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 border-b border-fk-blue w-fit pb-0.5">
                    <MapPin className="h-4 w-4 text-slate-500" />
                    <span className="font-bold">560001</span>
                    <button className="text-fk-blue font-bold uppercase ml-4">Check</button>
                  </div>
                  <p className="font-bold text-slate-900 pt-1">Delivery by tomorrow | <span className="text-[#388e3c]">Free</span></p>
                </div>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-4 pt-4 text-sm">
                <div className="font-bold text-slate-500">Description</div>
                <div className="leading-relaxed text-slate-700">{product.description}</div>
              </div>
            </div>

            <div className="mt-8 flex gap-8 border-t border-gray-100 pt-8">
              <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500 uppercase">
                <ShieldCheck className="h-8 w-8 text-slate-300" />
                <span>7 Days Replacement</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] font-bold text-slate-500 uppercase">
                <Truck className="h-8 w-8 text-slate-300" />
                <span>Free Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
