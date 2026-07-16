import { NextResponse } from "next/server";
import { Resend } from "resend";

// Basic but practical email shape check (server-side; the client validates too).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// TODO: swap onboarding@resend.dev for a verified mrtorino.io domain sender
// (e.g. "mrtorino.io <leads@mrtorino.io>") once the Resend DNS records are set up.
const FROM_ADDRESS = "mrtorino.io <onboarding@resend.dev>";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const b = (body ?? {}) as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  const product = typeof b.product === "string" ? b.product.trim() : "";
  const slug = typeof b.slug === "string" ? b.slug.trim() : "";

  // Server-side validation — reject malformed input with a useful message.
  if (!name) return NextResponse.json({ error: "Please include your name." }, { status: 400 });
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please include a valid email address." }, { status: 400 });
  }
  if (!product) return NextResponse.json({ error: "Missing product." }, { status: 400 });

  const ts = new Date().toISOString();

  // Fallback record — always logged so there's a server-side trail even if email delivery fails.
  console.log("ACCESS REQUEST:", { name, email, product, slug, message, ts });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;

  // Graceful local-dev path: no keys → don't break the user, but make the gap obvious in logs.
  if (!apiKey || !to) {
    console.warn(
      "[request-access] RESEND_API_KEY and/or LEAD_NOTIFICATION_EMAIL not set — " +
        "email NOT sent, lead captured in logs only. Set both env vars to enable delivery.",
    );
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to,
      replyTo: email, // so replying in the inbox goes straight back to the lead
      subject: `New access request: ${product}`,
      text: [
        `New access request for ${product}`,
        "",
        `Name:     ${name}`,
        `Email:    ${email}`,
        `Product:  ${product}`,
        `Slug:     ${slug || "(none)"}`,
        `Message:  ${message || "(none)"}`,
        `Time:     ${ts}`,
      ].join("\n"),
    });

    // Resend reports API-level failures in-band (no throw) — surface them loudly.
    if (error) {
      console.error(
        "[request-access] Resend API returned an error — lead was NOT emailed (still logged above):",
        error,
      );
    }
  } catch (err) {
    // Network / SDK throw — log loudly so it's visible in Vercel logs.
    console.error(
      "[request-access] Failed to send lead email via Resend — lead was NOT emailed (still logged above):",
      err,
    );
  }

  // Always succeed for the user: their request is captured at minimum in the server logs.
  return NextResponse.json({ ok: true });
}
