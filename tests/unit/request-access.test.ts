// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

// Mock the Resend client so no real email is sent. vi.hoisted lets the mock
// factory reference sendMock safely despite hoisting.
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }));
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { POST } from "@/app/api/request-access/route";

function post(body: unknown) {
  return POST(
    new Request("http://localhost/api/request-access", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }),
  );
}

const ORIGINAL_ENV = { ...process.env };
beforeEach(() => {
  sendMock.mockReset();
  sendMock.mockResolvedValue({ data: { id: "test-id" }, error: null });
  delete process.env.RESEND_API_KEY;
  delete process.env.LEAD_NOTIFICATION_EMAIL;
});
afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
});

describe("POST /api/request-access — validation", () => {
  it("returns 400 on an invalid email and does not send", async () => {
    const res = await post({ name: "Ada", email: "not-an-email", product: "BTCPredictor" });
    expect(res.status).toBe(400);
    expect((await res.json()).error).toMatch(/email/i);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 400 when name is missing", async () => {
    const res = await post({ email: "ada@example.com", product: "BTCPredictor" });
    expect(res.status).toBe(400);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 400 when product is missing", async () => {
    const res = await post({ name: "Ada", email: "ada@example.com" });
    expect(res.status).toBe(400);
  });

  it("returns 400 on non-JSON body", async () => {
    const res = await POST(
      new Request("http://localhost/api/request-access", { method: "POST", body: "not json{" }),
    );
    expect(res.status).toBe(400);
  });
});

describe("POST /api/request-access — sending", () => {
  it("returns 200 and sends a triage email when keys are configured", async () => {
    process.env.RESEND_API_KEY = "test_key";
    process.env.LEAD_NOTIFICATION_EMAIL = "me@example.com";

    const res = await post({
      name: "Ada Lovelace",
      email: "ada@example.com",
      product: "BTCPredictor",
      slug: "btcpredictor",
      message: "Curious about the API.",
    });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledOnce();

    const arg = sendMock.mock.calls[0][0];
    expect(arg.to).toBe("me@example.com");
    expect(arg.subject).toBe("New access request: BTCPredictor");
    expect(arg.replyTo).toBe("ada@example.com");
    expect(arg.text).toContain("btcpredictor");
    expect(arg.text).toContain("ada@example.com");
  });

  it("still returns 200 (and does not send) when keys are missing — graceful dev mode", async () => {
    process.env.RESEND_API_KEY = "";
    process.env.LEAD_NOTIFICATION_EMAIL = "";
    const res = await post({ name: "Ada", email: "ada@example.com", product: "BTCPredictor" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("still returns 200 to the user when Resend throws", async () => {
    process.env.RESEND_API_KEY = "test_key";
    process.env.LEAD_NOTIFICATION_EMAIL = "me@example.com";
    sendMock.mockRejectedValueOnce(new Error("Resend down"));
    const res = await post({ name: "Ada", email: "ada@example.com", product: "BTCPredictor" });
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
});
