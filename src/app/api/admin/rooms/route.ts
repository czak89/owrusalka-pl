import { NextResponse } from "next/server";
import { deleteRoom, getRooms, saveRoom } from "@/lib/roomStore";
import type { Room } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ rooms: getRooms() });
}

export async function POST(request: Request) {
  let payload: Partial<Room>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload?.name || typeof payload.name !== "string") {
    return NextResponse.json({ error: "Room name is required" }, { status: 400 });
  }

  const room: Room = {
    id: payload.id ?? `room-${Date.now()}`,
    name: payload.name.trim(),
    type: (payload.type ?? "standard") as Room["type"],
    capacity: Number(payload.capacity ?? 1),
    pricePerNightPln: Number(payload.pricePerNightPln ?? 0),
    amenities: Array.isArray(payload.amenities)
      ? payload.amenities.map((item) => String(item)).filter(Boolean)
      : [],
    nextAvailable: payload.nextAvailable ?? "TBD",
  };

  return NextResponse.json({ room: saveRoom(room) });
}

export async function DELETE(request: Request) {
  let payload: { id?: string };
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload?.id) {
    return NextResponse.json({ error: "Room id is required" }, { status: 400 });
  }

  return NextResponse.json({ rooms: deleteRoom(payload.id) });
}
