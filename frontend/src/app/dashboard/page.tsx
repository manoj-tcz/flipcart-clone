import { getDashboardData } from "@/lib/api";

export default async function DashboardPage() {
  const dashboard = await getDashboardData();
  const cards = [
    { label: "Products", value: dashboard.summary.products_count },
    { label: "Featured Products", value: dashboard.summary.featured_products_count },
    { label: "Low Stock Products", value: dashboard.summary.low_stock_products_count },
    { label: "Active Carts", value: dashboard.summary.active_carts_count },
    { label: "Contact Messages", value: dashboard.summary.contact_messages_count },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900">Store Dashboard</h1>
      <p className="mt-1 text-sm text-slate-600">Quick overview of catalog, carts and customer contacts.</p>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map((card) => (
          <article key={card.label} className="rounded-xl bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">{card.label}</p>
            <p className="mt-2 text-3xl font-bold text-[#2874f0]">{card.value}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-xl bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Latest Contact Requests</h2>
        {dashboard.latest_contacts.length === 0 ? (
          <p className="mt-3 text-sm text-slate-600">No contact messages yet.</p>
        ) : (
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Email</th>
                  <th className="px-2 py-2">Subject</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.latest_contacts.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="px-2 py-2 font-medium text-slate-800">{item.name}</td>
                    <td className="px-2 py-2 text-slate-600">{item.email}</td>
                    <td className="px-2 py-2 text-slate-600">{item.subject}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
