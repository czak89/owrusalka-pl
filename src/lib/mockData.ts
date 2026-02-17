export type Room = {
  id: string;
  name: string;
  type: "standard" | "family" | "suite" | "studio";
  capacity: number;
  pricePerNightPln: number;
  amenities: string[];
  nextAvailable: string;
};

export type Booking = {
  id: string;
  guest: string;
  roomId: string;
  roomName: string;
  dates: string;
  status: "confirmed" | "pending" | "cancelled";
};

export const rooms: Room[] = [
  {
    id: "room-sea-suite",
    name: "Sea View Suite",
    type: "suite",
    capacity: 3,
    pricePerNightPln: 680,
    amenities: ["Sea view", "Balcony", "King bed", "Mini bar"],
    nextAvailable: "Mar 18",
  },
  {
    id: "room-family",
    name: "Family Room",
    type: "family",
    capacity: 4,
    pricePerNightPln: 520,
    amenities: ["Two beds", "Kids corner", "Garden view"],
    nextAvailable: "Mar 14",
  },
  {
    id: "room-standard",
    name: "Standard Double",
    type: "standard",
    capacity: 2,
    pricePerNightPln: 380,
    amenities: ["Double bed", "Desk", "Walk-in shower"],
    nextAvailable: "Mar 12",
  },
  {
    id: "room-studio",
    name: "Garden Studio",
    type: "studio",
    capacity: 2,
    pricePerNightPln: 450,
    amenities: ["Kitchenette", "Patio", "Pet-friendly"],
    nextAvailable: "Mar 21",
  },
];

export const bookings: Booking[] = [
  {
    id: "BK-1042",
    guest: "Anna Kowalska",
    roomId: "room-sea-suite",
    roomName: "Sea View Suite",
    dates: "Mar 12–15",
    status: "confirmed",
  },
  {
    id: "BK-1043",
    guest: "Jan Nowak",
    roomId: "room-family",
    roomName: "Family Room",
    dates: "Mar 14–18",
    status: "pending",
  },
  {
    id: "BK-1044",
    guest: "Marta Zielińska",
    roomId: "room-standard",
    roomName: "Standard Double",
    dates: "Mar 20–22",
    status: "confirmed",
  },
  {
    id: "BK-1045",
    guest: "Piotr Lewandowski",
    roomId: "room-studio",
    roomName: "Garden Studio",
    dates: "Mar 21–24",
    status: "cancelled",
  },
];

export function getAdminOverview() {
  const confirmedCount = bookings.filter(
    (b) => b.status === "confirmed",
  ).length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;
  const occupancy = Math.min(92, 60 + confirmedCount * 4);
  const revenueMtd = confirmedCount * 2350;

  return {
    stats: [
      {
        label: "Active Bookings",
        value: String(confirmedCount),
        change: "+2 today",
      },
      { label: "Occupancy", value: `${occupancy}%`, change: "+5% this week" },
      {
        label: "New Inquiries",
        value: String(pendingCount + 7),
        change: "Last 24h",
      },
      {
        label: "Revenue (MTD)",
        value: `${revenueMtd.toLocaleString("pl-PL")} PLN`,
        change: "+8% MoM",
      },
    ],
    recentBookings: bookings,
  };
}
