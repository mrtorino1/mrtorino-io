import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, message, product } = body;
  if (!name || !email || !product) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  console.log("ACCESS REQUEST:", { name, email, product, message, ts: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
