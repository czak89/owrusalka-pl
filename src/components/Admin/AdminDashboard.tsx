"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getAdminOverview, rooms as initialRooms, type Room } from "@/lib/mockData";
import { useState } from "react";

const statusStyles = {
  confirmed: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  cancelled: "bg-rose-100 text-rose-700",
} as const;

export default function AdminDashboard() {
  const { stats, recentBookings } = getAdminOverview();
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [form, setForm] = useState({
    name: "",
    type: "",
    capacity: "",
    pricePerNightPln: "",
    highlights: "",
  });

  const handleFormChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    if (!form.name.trim()) {
      return;
    }

    const capacity = Number(form.capacity) || 1;
    const pricePerNightPln = Number(form.pricePerNightPln) || 0;
    const amenities = form.highlights
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const newRoom: Room = {
      id: `room-${Date.now()}`,
      name: form.name.trim(),
      type: (form.type || "standard") as Room["type"],
      capacity,
      pricePerNightPln,
      amenities: amenities.length ? amenities : ["New listing"],
      nextAvailable: "TBD",
    };

    setRooms((prev) => [newRoom, ...prev]);
    setForm({
      name: "",
      type: "",
      capacity: "",
      pricePerNightPln: "",
      highlights: "",
    });
  };

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
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col gap-2 rounded-lg border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="text-sm font-medium">{booking.guest}</div>
                  <div className="text-xs text-muted-foreground">
                    {booking.roomName} • {booking.dates}
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
              <CardTitle>Add Room</CardTitle>
              <CardDescription>Draft a new room entry (mock).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="room-name">Room name</Label>
                <Input
                  id="room-name"
                  placeholder="Sea View Suite"
                  value={form.name}
                  onChange={(event) => handleFormChange("name", event.target.value)}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="room-type">Type</Label>
                  <Input
                    id="room-type"
                    placeholder="suite"
                    value={form.type}
                    onChange={(event) => handleFormChange("type", event.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="room-capacity">Capacity</Label>
                  <Input
                    id="room-capacity"
                    placeholder="2"
                    type="number"
                    min="1"
                    value={form.capacity}
                    onChange={(event) => handleFormChange("capacity", event.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="room-price">Price per night (PLN)</Label>
                <Input
                  id="room-price"
                  placeholder="580"
                  type="number"
                  min="0"
                  value={form.pricePerNightPln}
                  onChange={(event) =>
                    handleFormChange("pricePerNightPln", event.target.value)
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="room-notes">Highlights</Label>
                <Textarea
                  id="room-notes"
                  placeholder="Balcony, king bed, sea view..."
                  value={form.highlights}
                  onChange={(event) => handleFormChange("highlights", event.target.value)}
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={handleSaveDraft}>
                  Save Draft
                </Button>
                <Button size="sm" variant="outline">
                  Publish
                </Button>
              </div>
            </CardContent>
          </Card>

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
              <CardTitle>Rooms</CardTitle>
              <CardDescription>Current inventory snapshot.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {rooms.map((room) => (
                <div key={room.id} className="flex items-center justify-between">
                  <span>{room.name}</span>
                  <span className="text-muted-foreground">
                    {room.pricePerNightPln} PLN
                  </span>
                </div>
              ))}
              <Button size="sm" variant="outline" className="mt-2 w-full">
                Manage Rooms
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
