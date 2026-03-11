"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type ContactFormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initialState: ContactFormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = await response.json();

      if (!response.ok) {
        if (payload.errors) {
          const firstError = Object.values(payload.errors)[0];
          if (Array.isArray(firstError) && firstError[0]) {
            setStatus(String(firstError[0]));
            return;
          }
        }
        setStatus(payload.message || "Could not submit contact form.");
        return;
      }

      setStatus("Your message has been submitted successfully. Check Dashboard for latest request.");
      setForm(initialState);
    } catch {
      setStatus("Unexpected error while submitting your message.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-bold text-slate-900">Contact Us</h1>
      <p className="mt-1 text-sm text-slate-600">
        Have questions about orders or products? Send us your message.
      </p>

      <form onSubmit={submitForm} className="mt-5 space-y-4 rounded-xl bg-white p-5 shadow-sm">
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2874f0]"
          placeholder="Your name"
          value={form.name}
          onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          required
        />
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2874f0]"
          placeholder="Email address"
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          required
        />
        <input
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2874f0]"
          placeholder="Subject"
          value={form.subject}
          onChange={(event) => setForm((prev) => ({ ...prev, subject: event.target.value }))}
          required
        />
        <textarea
          className="min-h-32 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2874f0]"
          placeholder="Write your message"
          value={form.message}
          onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-[#2874f0] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
        >
          {submitting ? "Sending..." : "Submit"}
        </button>
        {status ? <p className="text-sm text-slate-700">{status}</p> : null}
        <Link href="/dashboard" className="inline-flex text-sm font-medium text-[#2874f0] hover:underline">
          Open Dashboard
        </Link>
      </form>
    </div>
  );
}
