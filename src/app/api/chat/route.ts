import { type NextRequest, NextResponse } from "next/server";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  messages: ChatMessage[];
  language: string;
}

const DEFAULT_LANGUAGE = "pl";
const MAX_MESSAGES = 12;
const DEFAULT_TIMEOUT_MS = 15000;

// Resort-specific knowledge base
const resortInfo = {
  pl: {
    name: "Rusałka nad morzem",
    location: "Łazy, Polska, nad Morzem Bałtyckim",
    description: "Luksusowy ośrodek wypoczynkowy",
    amenities: [
      "prywatna plaża",
      "SPA",
      "restauracja",
      "siłownia",
      "basen",
      "parking",
    ],
    rooms: ["pokoje z widokiem na morze", "apartamenty", "suite"],
    contact: {
      phone: "+48 123 456 789",
      email: "info@rusalka-nadmorzem.pl",
      address: "ul. Nadmorska 1, Łazy, Polska",
    },
  },
  en: {
    name: "Rusałka by the Sea",
    location: "Łazy, Poland, Baltic Sea",
    description: "Luxury seaside resort",
    amenities: ["private beach", "SPA", "restaurant", "gym", "pool", "parking"],
    rooms: ["sea view rooms", "apartments", "suites"],
    contact: {
      phone: "+48 123 456 789",
      email: "info@rusalka-nadmorzem.pl",
      address: "ul. Nadmorska 1, Łazy, Poland",
    },
  },
  de: {
    name: "Rusałka am Meer",
    location: "Łazy, Polen, Ostsee",
    description: "Luxus-Küstenresort",
    amenities: [
      "Privatstrand",
      "SPA",
      "Restaurant",
      "Fitnessstudio",
      "Pool",
      "Parkplatz",
    ],
    rooms: ["Zimmer mit Meerblick", "Apartments", "Suiten"],
    contact: {
      phone: "+48 123 456 789",
      email: "info@rusalka-nadmorzem.pl",
      address: "ul. Nadmorska 1, Łazy, Polen",
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    let payload: ChatRequest;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload" },
        { status: 400 },
      );
    }

    const messages = Array.isArray(payload?.messages) ? payload.messages : [];
    const language = payload?.language || DEFAULT_LANGUAGE;

    if (messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required" },
        { status: 400 },
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 },
      );
    }
    if (
      typeof lastMessage.content !== "string" ||
      lastMessage.content.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 },
      );
    }

    // Get resort info for the specified language
    const info =
      resortInfo[language as keyof typeof resortInfo] ||
      resortInfo[DEFAULT_LANGUAGE];

    // Create context-aware system prompt
    const systemPrompt = `You are a helpful assistant for ${info.name}, a ${info.description} located in ${info.location}. 
    
Resort information:
- Amenities: ${info.amenities.join(", ")}
- Room types: ${info.rooms.join(", ")}
- Contact: ${info.contact.phone}, ${info.contact.email}
- Address: ${info.contact.address}
    
You can help with:
- Booking inquiries
- Resort amenities and services
- Local attractions
- Check-in/check-out information
- General resort questions
    
Always be helpful, friendly, and provide accurate information about the resort. If you don't know something specific, suggest contacting the resort directly.`;

    // If OpenAI API key is available, use OpenAI
    if (process.env.OPENAI_API_KEY) {
      // Use configurable base URL (defaults to OpenAI if not set)
      const apiBaseUrl =
        process.env.OPENAI_API_BASE_URL || "https://api.openai.com/v1";
      const apiModel = process.env.OPENAI_MODEL || "gpt-3.5-turbo";
      const timeoutMs =
        Number(process.env.OPENAI_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS;
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

      let response: Response;
      try {
        response = await fetch(`${apiBaseUrl}/chat/completions`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: apiModel,
            messages: [
              { role: "system", content: systemPrompt },
              ...messages.slice(-MAX_MESSAGES),
            ],
            max_tokens: 300,
            temperature: 0.7,
          }),
          signal: controller.signal,
        });
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return NextResponse.json(
            { error: "Upstream timeout" },
            { status: 504 },
          );
        }
        console.error("OpenAI API request failed:", error);
        return NextResponse.json(
          { error: "Upstream request failed" },
          { status: 502 },
        );
      } finally {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        const errorText = await response.text();
        return NextResponse.json(
          { error: "Upstream error", details: errorText.slice(0, 500) },
          { status: 502 },
        );
      }

      const data = await response.json();
      const assistantMessage =
        data?.choices?.[0]?.message?.content ||
        "I'm sorry, I couldn't process your request.";

      return NextResponse.json({ message: assistantMessage });
    } else {
      // Fallback responses when OpenAI API is not available
      const userMessage = lastMessage.content.toLowerCase();
      let response = "";

      if (
        userMessage.includes("booking") ||
        userMessage.includes("reservation") ||
        userMessage.includes("rezerwacja")
      ) {
        response =
          language === "pl"
            ? `Aby dokonać rezerwacji w ${info.name}, skontaktuj się z nami pod numerem ${info.contact.phone} lub napisz na ${info.contact.email}. Oferujemy ${info.rooms.join(", ")} z przepięknymi widokami na morze.`
            : `To make a booking at ${info.name}, please contact us at ${info.contact.phone} or email ${info.contact.email}. We offer ${info.rooms.join(", ")} with beautiful sea views.`;
      } else if (
        userMessage.includes("amenities") ||
        userMessage.includes("facilities") ||
        userMessage.includes("usługi")
      ) {
        response =
          language === "pl"
            ? `Nasz ośrodek oferuje: ${info.amenities.join(", ")}. Każda z tych usług została zaprojektowana, aby zapewnić Ci niezapomniany pobyt.`
            : `Our resort offers: ${info.amenities.join(", ")}. Each of these facilities is designed to ensure you have an unforgettable stay.`;
      } else if (
        userMessage.includes("location") ||
        userMessage.includes("address") ||
        userMessage.includes("gdzie") ||
        userMessage.includes("lokalizacja")
      ) {
        response =
          language === "pl"
            ? `${info.name} znajduje się w ${info.location}. Nasz dokładny adres to: ${info.contact.address}.`
            : `${info.name} is located in ${info.location}. Our exact address is: ${info.contact.address}.`;
      } else {
        response =
          language === "pl"
            ? `Dziękuję za pytanie o ${info.name}! Jesteśmy luksusowym ośrodkiem wypoczynkowym nad Morzem Bałtyckim. W czym mogę Ci pomóc? Możesz zapytać o nasze pokoje, usługi, lokalizację lub rezerwacje.`
            : `Thank you for asking about ${info.name}! We are a luxury resort by the Baltic Sea. How can I help you? You can ask about our rooms, services, location, or bookings.`;
      }

      return NextResponse.json({ message: response });
    }
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
