import Link from "next/link";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-fk-blue text-white shadow-md">
      <div className="mx-auto flex w-full max-w-[1248px] items-center gap-4 px-4 py-2.5">
        {/* Logo */}
        <div className="flex flex-col items-start leading-tight">
          <Link href="/" className="text-xl font-bold italic tracking-tight">
            Flipkart<span className="text-fk-yellow not-italic">.</span>
          </Link>
          <Link href="/" className="group flex items-center text-[11px] font-medium italic hover:underline">
            Explore <span className="ml-0.5 text-fk-yellow not-italic">Plus</span>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/plus_aef861.png" alt="plus" className="ml-0.5 h-2.5" />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative flex flex-1 items-center">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="h-9 w-full rounded-sm bg-white px-4 pr-10 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none"
          />
          <Search className="absolute right-3 h-4 w-4 text-fk-blue" />
        </div>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-8 text-[15px] font-semibold">
          <button className="flex h-8 items-center rounded-sm bg-white px-8 text-fk-blue transition hover:bg-slate-50">
            Login
          </button>
          
          <Link href="/seller" className="hidden lg:block">
            Become a Seller
          </Link>

          <div className="hidden items-center gap-1 lg:flex cursor-pointer">
            More <ChevronDown className="h-4 w-4" />
          </div>

          <Link href="/cart" className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Cart
          </Link>
        </nav>
      </div>
    </header>
  );
}
