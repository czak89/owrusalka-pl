import { NextResponse } from "next/server";
import { deleteBooking, getBookings, saveBooking } from "@/lib/bookingStore";
import type { Booking } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ bookings: getBookings() });
}

export async function POST(request: Request) {
  let payload: Partial<Booking>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload?.guest || typeof payload.guest !== "string") {
    return NextResponse.json({ error: "Guest name is required" }, { status: 400 });
  }

  if (!payload?.roomName || typeof payload.roomName !== "string") {
    return NextResponse.json({ error: "Room name is required" }, { status: 400 });
  }

  const booking: Booking = {
    id: payload.id ?? `BK-${Date.now()}`,
    guest: payload.guest.trim(),
    roomId: payload.roomId ?? "room-unknown",
    roomName: payload.roomName.trim(),
    dates: payload.dates ?? "TBD",
    status: (payload.status ?? "pending") as Booking["status"],
  };

  return NextResponse.json({ booking: saveBooking(booking) });
}

export async function DELETE(request: Request) {
  let payload: { id?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload?.id) {
    return NextResponse.json({ error: "Booking id is required" }, { status: 400 });
  }

  return NextResponse.json({ bookings: deleteBooking(payload.id) });
}
