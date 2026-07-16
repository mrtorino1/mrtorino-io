"use client";

import { useState } from "react";

export function CareersForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Job application — ${data.get("firstName")} ${data.get("lastName")}`
    );
    const body = encodeURIComponent(
      [
        `Name: ${data.get("firstName")} ${data.get("lastName")}`,
        `Email: ${data.get("email")}`,
        `Phone: ${data.get("phone")}`,
        `How they found us: ${data.get("referral")}`,
        "",
        `${data.get("about")}`,
      ].join("\n")
    );
    window.location.href = `mailto:bse.b.sieben@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-[var(--bse-muted)]">First name</span>
          <input name="firstName" type="text" required autoComplete="given-name" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-[var(--bse-muted)]">Last name</span>
          <input name="lastName" type="text" required autoComplete="family-name" />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-[var(--bse-muted)]">Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-[var(--bse-muted)]">Phone</span>
          <input name="phone" type="tel" required autoComplete="tel" />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm text-[var(--bse-muted)]">How did you find out about us?</span>
        <select name="referral" required defaultValue="">
          <option value="" disabled>
            Select an option
          </option>
          <option>Referral from a friend or coworker</option>
          <option>Industry contact</option>
          <option>Online search</option>
          <option>Job board</option>
          <option>Other</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-sm text-[var(--bse-muted)]">A few words about you</span>
        <textarea name="about" rows={5} required />
      </label>
      <button
        type="submit"
        className="bg-[var(--bse-accent)] px-8 py-3.5 font-semibold text-[var(--bse-on-accent)] transition-opacity hover:opacity-90"
      >
        Submit Application
      </button>
      {sent && (
        <p className="text-sm text-[var(--bse-accent)]">
          Thanks for applying! Your email app should open with the application ready to send — we will
          get in touch soon.
        </p>
      )}
    </form>
  );
}
