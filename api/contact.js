// Vercel serverless function: receives the contact form and emails it via Resend.
// Required env vars (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY  – API key from resend.com
//   CONTACT_FROM    – verified sender, e.g. "Empire Website <support@empiredesignae.com>"
//   CONTACT_TO      – optional, defaults to support@empiredesignae.com
const NAME = /^[\p{L}\p{M}]+(?:[\s'’.\-][\p{L}\p{M}]+)*$/u;
const EMAIL = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]{2,}$/;

const limits = { firstName: 320, lastName: 320, email: 254, phone: 20, country: 2, service: 200, message: 10000 };

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false });
  }
  const data = typeof req.body === "string" ? safeParse(req.body) : req.body;
  if (!data || typeof data !== "object") return res.status(400).json({ ok: false });

  const v = {};
  for (const [key, max] of Object.entries(limits)) {
    const raw = data[key] ?? "";
    if (typeof raw !== "string") return res.status(400).json({ ok: false });
    const value = raw.trim();
    if (value.length > max || value.includes("\0")) return res.status(400).json({ ok: false });
    v[key] = value;
  }
  if (
    !NAME.test(v.firstName) || !NAME.test(v.lastName) ||
    !EMAIL.test(v.email) || /[\r\n]/.test(v.email) ||
    !/^\+[1-9][0-9]{6,14}$/.test(v.phone) || !/^[A-Z]{2}$/.test(v.country)
  ) return res.status(422).json({ ok: false });

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(500).json({ ok: false });

  const text =
    `Name: ${v.firstName} ${v.lastName}\nEmail: ${v.email}\nPhone: ${v.phone}\nCountry: ${v.country}\n` +
    `Service: ${v.service || "Not specified"}\n\nProject details:\n${v.message || "Not provided"}`;
  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM || "Empire Website <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO || "support@empiredesignae.com"],
        reply_to: v.email,
        subject: "Website project enquiry",
        text,
      }),
    });
    if (!r.ok) return res.status(502).json({ ok: false });
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false });
  }
}
function safeParse(s) { try { return JSON.parse(s); } catch { return null; } }
