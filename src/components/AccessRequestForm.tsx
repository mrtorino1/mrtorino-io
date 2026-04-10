"use client";
import { useState } from "react";
type Props = { productName: string; productSlug: string };
export default function AccessRequestForm({ productName, productSlug }: Props) {
  const [status, setStatus] = useState<"idle"|"sending"|"sent"|"error">("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setStatus("sending");
    try {
      const res = await fetch("/api/request-access", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, product: productName, slug: productSlug }) });
      if (res.ok) setStatus("sent"); else setStatus("error");
    } catch { setStatus("error"); }
  };
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-8">
      <div className="text-[10px] uppercase tracking-[0.26em] text-white/35 mb-2">Request Access</div>
      <h3 className="text-xl font-semibold tracking-tight mb-1">{productName}</h3>
      <p className="text-sm text-white/45 mb-8">I&apos;ll review your request and follow up directly — usually within 24 hours.</p>
      {status === "sent" ? (
        <div className="text-center py-8"><div className="text-2xl mb-3">&#x2713;</div><div className="font-semibold mb-2">Request received.</div><div className="text-sm text-white/45">I&apos;ll be in touch at {form.email}.</div></div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-xs text-white/40 mb-1.5">Name</label><input type="text" required placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full h-10 bg-white/[0.05] border border-white/10 rounded-xl px-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/25 transition-colors" /></div>
            <div><label className="block text-xs text-white/40 mb-1.5">Email</label><input type="email" required placeholder="you@example.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="w-full h-10 bg-white/[0.05] border border-white/10 rounded-xl px-3 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/25 transition-colors" /></div>
          </div>
          <div><label className="block text-xs text-white/40 mb-1.5">What are you hoping to use it for? (optional)</label><textarea rows={3} placeholder="A bit of context helps..." value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-white/25 outline-none focus:border-white/25 transition-colors resize-none" /></div>
          <button type="submit" disabled={status === "sending"} className="w-full h-11 rounded-xl bg-white text-[#070B10] text-sm font-medium hover:bg-white/90 transition-colors disabled:opacity-50">{status === "sending" ? "Sending..." : "Request Access"}</button>
          {status === "error" && <p className="text-xs text-red-400 text-center">Something went wrong. Try emailing hello@mrtorino.io directly.</p>}
        </form>
      )}
    </div>
  );
}
