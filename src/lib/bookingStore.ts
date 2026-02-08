import { bookings as seedBookings, type Booking } from "@/lib/mockData";

type Store = {
  bookings: Booking[];
};

const globalForBookings = globalThis as unknown as { __bookingsStore?: Store };

if (!globalForBookings.__bookingsStore) {
  globalForBookings.__bookingsStore = { bookings: [...seedBookings] };
}

export function getBookings() {
  return globalForBookings.__bookingsStore!.bookings;
}

export function saveBooking(booking: Booking) {
  const store = globalForBookings.__bookingsStore!;
  const existingIndex = store.bookings.findIndex((item) => item.id === booking.id);
  if (existingIndex >= 0) {
    store.bookings[existingIndex] = booking;
  } else {
    store.bookings.unshift(booking);
  }
  return booking;
}

export function getBookingById(bookingId: string) {
  const store = globalForBookings.__bookingsStore!;
  return store.bookings.find((booking) => booking.id === bookingId) ?? null;
}

export function deleteBooking(bookingId: string) {
  const store = globalForBookings.__bookingsStore!;
  store.bookings = store.bookings.filter((booking) => booking.id !== bookingId);
  return store.bookings;
}
