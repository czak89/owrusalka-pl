"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rooms } from "@/lib/mockData";

export default function BookingSystem() {
  return (
    <section className="py-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Quick Booking</h2>
            <p className="text-sm text-muted-foreground">
              Browse rooms and check the next available dates.
            </p>
          </div>
          <Button size="sm">Start Reservation</Button>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => (
            <Card key={room.id}>
              <CardHeader>
                <CardTitle className="text-lg">{room.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div>
                  {room.capacity} guests • {room.type}
                </div>
                <div>From {room.pricePerNightPln} PLN / night</div>
                <div>Next available: {room.nextAvailable}</div>
                <div className="text-xs text-muted-foreground">
                  {room.amenities.join(" • ")}
                </div>
                <Button size="sm" className="mt-2 w-full">
                  Check Availability
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
