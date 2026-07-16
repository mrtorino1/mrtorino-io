"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(String(data.get("subject") || "Project inquiry"));
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );
    window.location.href = `mailto:bse.b.sieben@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-[var(--bse-muted)]">Name</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-[var(--bse-muted)]">Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm text-[var(--bse-muted)]">Subject</span>
        <input name="subject" type="text" required />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-[var(--bse-muted)]">Message</span>
        <textarea name="message" rows={6} required />
      </label>
      <button
        type="submit"
        className="bg-[var(--bse-accent)] px-8 py-3.5 font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
      >
        Send Message
      </button>
      {sent && (
        <p className="text-sm text-[var(--bse-accent)]">
          Thanks for submitting! Your email app should open with the message ready to send.
        </p>
      )}
    </form>
  );
}
