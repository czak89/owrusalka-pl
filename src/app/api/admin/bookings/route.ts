import { NextResponse } from "next/server";
import {
  deleteBooking,
  getBookingById,
  getBookings,
  saveBooking,
} from "@/lib/bookingStore";
import {
  createApiError,
  isBookingStatus,
  validateCreateBookingPayload,
} from "@/lib/bookingValidation";
import type { Booking } from "@/lib/mockData";

function sortBookingsByRecency(bookings: Booking[]) {
  return [...bookings].sort((a, b) => {
    const aRank = Number(a.id.replace(/\D/g, "")) || 0;
    const bRank = Number(b.id.replace(/\D/g, "")) || 0;
    return bRank - aRank;
  });
}

export async function GET() {
  return NextResponse.json({ bookings: sortBookingsByRecency(getBookings()) });
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(createApiError("Invalid JSON payload"), {
      status: 400,
    });
  }

  const validation = validateCreateBookingPayload(payload);
  if (!validation.ok) {
    return NextResponse.json(validation.error, { status: 400 });
  }

  const booking: Booking = {
    ...validation.value,
    id: validation.value.id ?? `BK-${Date.now()}`,
  };

  return NextResponse.json({ booking: saveBooking(booking) });
}

export async function PATCH(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(createApiError("Invalid JSON payload"), {
      status: 400,
    });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(createApiError("Booking payload must be an object"), {
      status: 400,
    });
  }

  const candidate = payload as { id?: unknown; status?: unknown };
  const bookingId =
    typeof candidate.id === "string" ? candidate.id.trim() : "";

  if (!bookingId) {
    return NextResponse.json(createApiError("Booking id is required", "id"), {
      status: 400,
    });
  }

  if (!isBookingStatus(candidate.status)) {
    return NextResponse.json(createApiError("Invalid booking status", "status"), {
      status: 400,
    });
  }

  const existingBooking = getBookingById(bookingId);
  if (!existingBooking) {
    return NextResponse.json(createApiError("Booking not found", "id"), {
      status: 404,
    });
  }

  const updatedBooking: Booking = {
    ...existingBooking,
    status: candidate.status,
  };

  return NextResponse.json({ booking: saveBooking(updatedBooking) });
}

export async function DELETE(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(createApiError("Invalid JSON payload"), {
      status: 400,
    });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(createApiError("Booking payload must be an object"), {
      status: 400,
    });
  }

  const candidate = payload as { id?: unknown };
  const bookingId =
    typeof candidate.id === "string" ? candidate.id.trim() : "";

  if (!bookingId) {
    return NextResponse.json(createApiError("Booking id is required", "id"), {
      status: 400,
    });
  }

  return NextResponse.json({ bookings: deleteBooking(bookingId) });
}
