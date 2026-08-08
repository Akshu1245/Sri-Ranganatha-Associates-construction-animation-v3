import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { isMailerConfigured, sendLeadEmail } from "@/lib/mailer";

const leadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10).regex(/^[\d\s+\-()]{10,20}$/),
  email: z.string().email().optional().or(z.literal("")),
  authority: z.string().min(1),
  services: z.array(z.string()).min(1),
  plotSize: z.string().optional(),
  timeline: z.string().min(1),
  source: z.string().optional(),
  message: z.string().optional(),
  files: z.array(z.object({ name: z.string(), size: z.number(), type: z.string() })).optional(),
});

// Very small in-memory rate limiter per server instance.
const submissions = new Map<string, { count: number; resetAt: number }>();
const MAX_SUBMISSIONS = 10;
const WINDOW_MS = 15 * 60 * 1000;

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const entry = submissions.get(key);
  if (!entry || entry.resetAt < now) {
    submissions.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_SUBMISSIONS;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }
  const data = parsed.data;

  if (!isMailerConfigured()) {
    console.error("Email is not configured (SMTP_HOST/SMTP_USER/SMTP_PASS/LEAD_TO_EMAIL missing).");
    return NextResponse.json(
      { error: "Enquiry system is not configured. Please call or WhatsApp us directly." },
      { status: 500 }
    );
  }

  const rows: [string, string][] = [
    ["Name", data.name],
    ["Phone", data.phone],
    ["Email", data.email || "-"],
    ["Authority", data.authority],
    ["Services", data.services.join(", ")],
    ["Plot size", data.plotSize || "-"],
    ["Timeline", data.timeline],
    ["Source", data.source || "-"],
    ["Message", data.message || "-"],
  ];
  if (data.files?.length) {
    rows.push(["Attachments (names only)", data.files.map((f) => f.name).join(", ")]);
  }

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `
    <h2>New enquiry from the website</h2>
    <table cellpadding="6" style="border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="font-weight:bold;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`
        )
        .join("")}
    </table>
  `;

  try {
    await sendLeadEmail(`New enquiry — ${data.name}`, html, text, data.email || undefined);
  } catch (err) {
    console.error("Failed to send lead email:", err);
    return NextResponse.json(
      { error: "Could not send your enquiry right now. Please call or WhatsApp us." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
