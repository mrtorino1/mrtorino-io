"use client";
import { useState } from "react";
type Props = { productName: string; productSlug: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_ERROR = "Something went wrong. Try emailing hello@mrtorino.io directly.";

export default function AccessRequestForm({ productName, productSlug }: Props) {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [errorMsg, setErrorMsg] = useState(DEFAULT_ERROR);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side validation before hitting the network.
    if (!form.name.trim()) { setErrorMsg("Please enter your name."); setStatus("error"); return; }
    if (!EMAIL_RE.test(form.email.trim())) { setErrorMsg("Please enter a valid email address."); setStatus("error"); return; }
    setStatus("sending");
    try {
      const res = await fetch("/api/request-access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, product: productName, slug: productSlug }) });
      if (res.ok) {
        setStatus("sent");
      } else {
        // Surface the server's validation message (400) when present.
        const data = await res.json().catch(() => null);
        setErrorMsg(data?.error || DEFAULT_ERROR);
        setStatus("error");
      }
    } catch {
      // Network failure — keep the form visible so the user can retry.
      setErrorMsg("Network error — please check your connection and try again.");
      setStatus("error");
    }
  };
  return (
    <div className="border border-[#1f1f1f] bg-[#111111] p-8">
      <div className="text-[11px] uppercase tracking-[0.3em] text-[#6b6b6b] mb-2">Request Access</div>
      <h3 className="text-xl font-semibold tracking-tight mb-1">{productName}</h3>
      <p className="text-sm text-[#6b6b6b] mb-8">I&apos;ll review your request and follow up directly — usually within 24 hours.</p>
      {status === "sent" ? (
        <div className="text-center py-8"><div className="text-2xl mb-3">&#x2713;</div><div className="font-semibold mb-2">Request received.</div><div className="text-sm text-[#6b6b6b]">I&apos;ll be in touch at {form.email}.</div></div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-[#6b6b6b] mb-1.5">Name</label><input type="text" required placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full h-10 bg-[#0a0a0a] border border-[#1f1f1f] px-3 text-sm text-[#f5f5f5] placeholder:text-[#6b6b6b]/60 outline-none focus:border-[#f5f5f5] transition-colors" /></div>
            <div><label className="block text-xs text-[#6b6b6b] mb-1.5">Email</label><input type="email" required placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full h-10 bg-[#0a0a0a] border border-[#1f1f1f] px-3 text-sm text-[#f5f5f5] placeholder:text-[#6b6b6b]/60 outline-none focus:border-[#f5f5f5] transition-colors" /></div>
          </div>
          <div><label className="block text-xs text-[#6b6b6b] mb-1.5">What are you hoping to use it for? (optional)</label><textarea rows={3} placeholder="A bit of context helps..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full bg-[#0a0a0a] border border-[#1f1f1f] px-3 py-2.5 text-sm text-[#f5f5f5] placeholder:text-[#6b6b6b]/60 outline-none focus:border-[#f5f5f5] transition-colors resize-none" /></div>
          <button type="submit" disabled={status === "sending"} className="w-full h-11 bg-[#f5f5f5] text-[#0a0a0a] text-sm font-medium uppercase tracking-[0.1em] hover:bg-white transition-colors disabled:opacity-50">{status === "sending" ? "Sending..." : "Request Access"}</button>
          {status === "error" && <p className="text-xs text-red-400 text-center">{errorMsg}</p>}
        </form>
      )}
    </div>
  );
}
