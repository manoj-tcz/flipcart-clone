export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <h1 className="text-3xl font-bold text-slate-900">About Us</h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Flipkart Clone is a demo ecommerce platform built with Laravel and Next.js to showcase a modern
        fullstack architecture. It includes product browsing, cart workflows, contact support and a
        dashboard for quick insights.
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Our Mission</h2>
          <p className="mt-2 text-sm text-slate-600">
            Deliver a smooth and reliable shopping experience with transparent pricing and quick support.
          </p>
        </article>
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Our Stack</h2>
          <p className="mt-2 text-sm text-slate-600">
            Laravel handles APIs and data, while Next.js powers fast pages and interactive UI.
          </p>
        </article>
        <article className="rounded-xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Customer First</h2>
          <p className="mt-2 text-sm text-slate-600">
            Easy returns, secure checkout and responsive customer support are built into the flow.
          </p>
        </article>
      </section>
    </div>
  );
}
