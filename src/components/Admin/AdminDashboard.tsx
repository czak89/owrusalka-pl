"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Stat = {
  label: string;
  value: string;
  change: string;
};

type Booking = {
  id: string;
  guest: string;
  room: string;
  dates: string;
  status: "confirmed" | "pending" | "cancelled";
};

const stats: Stat[] = [
  { label: "Active Bookings", value: "18", change: "+2 today" },
  { label: "Occupancy", value: "76%", change: "+5% this week" },
  { label: "New Inquiries", value: "11", change: "Last 24h" },
  { label: "Revenue (MTD)", value: "42,300 PLN", change: "+8% MoM" },
];

const bookings: Booking[] = [
  {
    id: "BK-1042",
    guest: "Anna Kowalska",
    room: "Sea View Suite",
    dates: "Mar 12–15",
    status: "confirmed",
  },
  {
    id: "BK-1043",
    guest: "Jan Nowak",
    room: "Family Room",
    dates: "Mar 14–18",
    status: "pending",
  },
  {
    id: "BK-1044",
    guest: "Marta Zielińska",
    room: "Standard Double",
    dates: "Mar 20–22",
    status: "confirmed",
  },
  {
    id: "BK-1045",
    guest: "Piotr Lewandowski",
    room: "Garden Studio",
    dates: "Mar 21–24",
    status: "cancelled",
  },
];

const statusStyles: Record<Booking["status"], string> = {
  confirmed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-rose-100 text-rose-700",
};

export default function AdminDashboard() {
  return (
    <div className="mx-auto w-full max-w-6xl p-6 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of bookings, occupancy, and guest activity.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm">New Booking</Button>
          <Button size="sm" variant="outline">
            Manage Rooms
          </Button>
          <Button size="sm" variant="secondary">
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-muted-foreground">
              {stat.change}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>
              Latest requests and confirmations from the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-2 rounded-lg border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-sm font-medium">{booking.guest}</div>
                  <div className="text-xs text-muted-foreground">
                    {booking.room} • {booking.dates}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[booking.status]}`}
                  >
                    {booking.status}
                  </span>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today&apos;s Tasks</CardTitle>
              <CardDescription>Quick admin checklist.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Confirm 3 pending bookings</span>
                <Button size="sm" variant="outline">
                  Review
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Update room availability</span>
                <Button size="sm" variant="outline">
                  Open
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Moderate 2 new testimonials</span>
                <Button size="sm" variant="outline">
                  Moderate
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Operational signals.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span>Website</span>
                <span className="text-emerald-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Payments</span>
                <span className="text-emerald-600">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span>AI Chat</span>
                <span className="text-amber-600">Degraded</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
