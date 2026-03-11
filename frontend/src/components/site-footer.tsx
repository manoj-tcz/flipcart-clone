export default function SiteFooter() {
  return (
    <footer className="mt-10 bg-slate-900 text-slate-200">
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 md:grid-cols-3">
        <div>
          <h3 className="text-base font-semibold">About</h3>
          <p className="mt-2 text-sm text-slate-400">
            Demo ecommerce experience inspired by Flipkart, built with Laravel and Next.js.
          </p>
        </div>
        <div>
          <h3 className="text-base font-semibold">Customer Policy</h3>
          <ul className="mt-2 space-y-1 text-sm text-slate-400">
            <li>Return Policy</li>
            <li>Terms of Use</li>
            <li>Security</li>
          </ul>
        </div>
        <div>
          <h3 className="text-base font-semibold">Help</h3>
          <p className="mt-2 text-sm text-slate-400">support@flipkart-clone.local</p>
          <p className="text-sm text-slate-400">+91 90000 00000</p>
        </div>
      </div>
    </footer>
  );
}
