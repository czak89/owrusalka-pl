import type { Booking } from "@/lib/mockData";

export type ApiErrorBody = {
  error: string;
  field?: string;
};

type ValidationResult<T> =
  | {
      ok: true;
      value: T;
    }
  | {
      ok: false;
      error: ApiErrorBody;
    };

export const BOOKING_STATUSES = [
  "pending",
  "confirmed",
  "cancelled",
] as const satisfies Booking["status"][];

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export function createApiError(error: string, field?: string): ApiErrorBody {
  return field ? { error, field } : { error };
}

export function isBookingStatus(value: unknown): value is BookingStatus {
  return (
    typeof value === "string" &&
    BOOKING_STATUSES.includes(value as BookingStatus)
  );
}

function asRequiredTrimmedString(
  value: unknown,
  field: string,
  label: string
): ValidationResult<string> {
  if (typeof value !== "string") {
    return { ok: false, error: createApiError(`${label} is required`, field) };
  }

  const normalized = value.trim();
  if (!normalized) {
    return { ok: false, error: createApiError(`${label} is required`, field) };
  }

  return { ok: true, value: normalized };
}

export function validateCreateBookingPayload(payload: unknown): ValidationResult<{
  id?: string;
  guest: string;
  roomId: string;
  roomName: string;
  dates: string;
  status: BookingStatus;
}> {
  if (!payload || typeof payload !== "object") {
    return {
      ok: false,
      error: createApiError("Booking payload must be an object"),
    };
  }

  const candidate = payload as Partial<Booking>;

  const guest = asRequiredTrimmedString(candidate.guest, "guest", "Guest name");
  if (!guest.ok) {
    return guest;
  }

  const roomId = asRequiredTrimmedString(candidate.roomId, "roomId", "Room id");
  if (!roomId.ok) {
    return roomId;
  }

  const roomName = asRequiredTrimmedString(
    candidate.roomName,
    "roomName",
    "Room name"
  );
  if (!roomName.ok) {
    return roomName;
  }

  const dates = asRequiredTrimmedString(candidate.dates, "dates", "Dates");
  if (!dates.ok) {
    return dates;
  }

  if (candidate.status !== undefined && !isBookingStatus(candidate.status)) {
    return {
      ok: false,
      error: createApiError("Invalid booking status", "status"),
    };
  }

  const normalizedId =
    typeof candidate.id === "string" && candidate.id.trim()
      ? candidate.id.trim()
      : undefined;

  return {
    ok: true,
    value: {
      id: normalizedId,
      guest: guest.value,
      roomId: roomId.value,
      roomName: roomName.value,
      dates: dates.value,
      status: candidate.status ?? "pending",
    },
  };
}
