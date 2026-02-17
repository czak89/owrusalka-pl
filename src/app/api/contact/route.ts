import { type NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  dates?: string;
  guests?: string;
  message?: string;
  website?: string;
};

const MAX_FIELD_LENGTH = 800;

function clean(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function sendWithResend(message: {
  name: string;
  email: string;
  phone: string;
  dates: string;
  guests: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return { configured: false, sent: false };
  }

  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
  const subject = `Nowe zapytanie ze strony - ${message.name}`;
  const html = `
    <h2>Nowe zapytanie kontaktowe</h2>
    <p><strong>Imie i nazwisko:</strong> ${message.name}</p>
    <p><strong>Email:</strong> ${message.email}</p>
    <p><strong>Telefon:</strong> ${message.phone || "nie podano"}</p>
    <p><strong>Termin:</strong> ${message.dates || "nie podano"}</p>
    <p><strong>Liczba osob:</strong> ${message.guests || "nie podano"}</p>
    <p><strong>Wiadomosc:</strong></p>
    <p>${message.text.replace(/\n/g, "<br/>")}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: message.email,
      subject,
      html,
      text: [
        `Imie i nazwisko: ${message.name}`,
        `Email: ${message.email}`,
        `Telefon: ${message.phone || "nie podano"}`,
        `Termin: ${message.dates || "nie podano"}`,
        `Liczba osob: ${message.guests || "nie podano"}`,
        "",
        "Wiadomosc:",
        message.text,
      ].join("\n"),
    }),
  });

  return {
    configured: true,
    sent: response.ok,
    status: response.status,
  };
}

async function sendWithWebhook(message: {
  name: string;
  email: string;
  phone: string;
  dates: string;
  guests: string;
  text: string;
}) {
  const url = process.env.CONTACT_WEBHOOK_URL;
  if (!url) {
    return { configured: false, sent: false };
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      source: "owrusalka-contact-form",
      createdAt: new Date().toISOString(),
      payload: message,
    }),
  });

  return {
    configured: true,
    sent: response.ok,
    status: response.status,
  };
}

export async function POST(request: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const message = clean(payload.message);
  const phone = clean(payload.phone);
  const dates = clean(payload.dates);
  const guests = clean(payload.guests);
  const website = clean(payload.website);

  // Simple honeypot trap for bots.
  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email and message are required" },
      { status: 400 },
    );
  }

  if (!validateEmail(email)) {
    return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
  }

  const contactMessage = {
    name,
    email,
    phone,
    dates,
    guests,
    text: message,
  };

  const deliveryResults = await Promise.allSettled([
    sendWithResend(contactMessage),
    sendWithWebhook(contactMessage),
  ]);

  let configuredTargets = 0;
  let successfulTargets = 0;

  for (const result of deliveryResults) {
    if (result.status !== "fulfilled") {
      continue;
    }
    if (result.value.configured) {
      configuredTargets += 1;
    }
    if (result.value.sent) {
      successfulTargets += 1;
    }
  }

  if (configuredTargets === 0) {
    console.info("Contact form message received (no delivery provider configured)", {
      ...contactMessage,
      ip: request.headers.get("x-forwarded-for") || "unknown",
    });
    return NextResponse.json({
      ok: true,
      message:
        "Wiadomosc odebrana. Skonfiguruj RESEND_API_KEY i CONTACT_TO_EMAIL, aby wlaczyc wysylke email.",
    });
  }

  if (successfulTargets === 0) {
    return NextResponse.json(
      { error: "Message delivery failed. Please call reception directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
