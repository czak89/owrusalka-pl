import { NextResponse } from "next/server";
import { deleteRoom, getRooms, saveRoom } from "@/lib/roomStore";
import { createApiError } from "@/lib/bookingValidation";
import type { Room } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json({ rooms: getRooms() });
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

  if (!payload || typeof payload !== "object") {
    return NextResponse.json(createApiError("Room payload must be an object"), {
      status: 400,
    });
  }

  const candidate = payload as Partial<Room>;
  const roomName = typeof candidate.name === "string" ? candidate.name.trim() : "";

  if (!roomName) {
    return NextResponse.json(createApiError("Room name is required", "name"), {
      status: 400,
    });
  }

  const room: Room = {
    id:
      typeof candidate.id === "string" && candidate.id.trim()
        ? candidate.id.trim()
        : `room-${Date.now()}`,
    name: roomName,
    type: (candidate.type ?? "standard") as Room["type"],
    capacity: Number(candidate.capacity ?? 1),
    pricePerNightPln: Number(candidate.pricePerNightPln ?? 0),
    amenities: Array.isArray(candidate.amenities)
      ? candidate.amenities.map((item) => String(item)).filter(Boolean)
      : [],
    nextAvailable: candidate.nextAvailable ?? "TBD",
  };

  return NextResponse.json({ room: saveRoom(room) });
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
    return NextResponse.json(createApiError("Room payload must be an object"), {
      status: 400,
    });
  }

  const candidate = payload as { id?: unknown };
  const roomId = typeof candidate.id === "string" ? candidate.id.trim() : "";

  if (!roomId) {
    return NextResponse.json(createApiError("Room id is required", "id"), {
      status: 400,
    });
  }

  return NextResponse.json({ rooms: deleteRoom(roomId) });
}
