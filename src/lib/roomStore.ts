import { rooms as seedRooms, type Room } from "@/lib/mockData";

type Store = {
  rooms: Room[];
};

const globalForRooms = globalThis as unknown as { __roomsStore?: Store };

if (!globalForRooms.__roomsStore) {
  globalForRooms.__roomsStore = { rooms: [...seedRooms] };
}

export function getRooms() {
  return globalForRooms.__roomsStore!.rooms;
}

export function saveRoom(room: Room) {
  const store = globalForRooms.__roomsStore!;
  const existingIndex = store.rooms.findIndex((item) => item.id === room.id);
  if (existingIndex >= 0) {
    store.rooms[existingIndex] = room;
  } else {
    store.rooms.unshift(room);
  }
  return room;
}

export function deleteRoom(roomId: string) {
  const store = globalForRooms.__roomsStore!;
  store.rooms = store.rooms.filter((room) => room.id !== roomId);
  return store.rooms;
}
