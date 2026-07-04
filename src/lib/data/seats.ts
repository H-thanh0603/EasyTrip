import type { BusType, Seat, SeatStatus } from "@/lib/types";

// Seat layout config per bus type. Determines decks, rows and columns.
interface LayoutConfig {
  decks: Array<"lower" | "upper">;
  rows: number;
  cols: number; // seats per row (aisle rendered client-side)
  colLetters: string[];
  vipRows: number[]; // rows treated as VIP (front / premium)
}

const layouts: Record<BusType, LayoutConfig> = {
  // Standard seated coach: 2 + 2 layout, single deck.
  seat: {
    decks: ["lower"],
    rows: 12,
    cols: 4,
    colLetters: ["A", "B", "C", "D"],
    vipRows: [1],
  },
  // Sleeper bus: two decks, 3 columns (1 + 1 + 1).
  sleeper: {
    decks: ["lower", "upper"],
    rows: 7,
    cols: 3,
    colLetters: ["A", "B", "C"],
    vipRows: [1],
  },
  // Limousine: premium single deck, 2 + 1 layout.
  limousine: {
    decks: ["lower"],
    rows: 8,
    cols: 3,
    colLetters: ["A", "B", "C"],
    vipRows: [1, 2],
  },
  // Double-decker: two decks, 2 + 2.
  "double-decker": {
    decks: ["lower", "upper"],
    rows: 6,
    cols: 4,
    colLetters: ["A", "B", "C", "D"],
    vipRows: [1],
  },
};

// Deterministic seeded RNG (same as trips) to keep booked seats stable per trip.
function seeded(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function hashString(str: string): number {
  let h = 7;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) % 2147483647;
  }
  return h;
}

// Generate the full seat map for a trip. `bookedCount` seats are marked booked.
export function generateSeats(
  tripId: string,
  busType: BusType,
  bookedCount: number,
): Seat[] {
  const layout = layouts[busType];
  const rng = seeded(hashString(tripId) + 1);
  const seats: Seat[] = [];

  layout.decks.forEach((deck, deckIndex) => {
    for (let row = 1; row <= layout.rows; row++) {
      for (let col = 0; col < layout.cols; col++) {
        const deckPrefix = layout.decks.length > 1 ? (deck === "lower" ? "T" : "L") : "";
        const label = `${deckPrefix}${layout.colLetters[col]}${row}`;
        const isVip = layout.vipRows.includes(row);
        seats.push({
          id: `${tripId}-${deckIndex}-${row}-${col}`,
          label,
          deck,
          row,
          col,
          status: isVip ? "vip" : "available",
          priceModifier: isVip ? 50000 : 0,
        });
      }
    }
  });

  // Randomly mark seats booked. VIP seats can also become booked (status overrides).
  const total = seats.length;
  const toBook = Math.min(bookedCount, total - 4);
  const bookedIndexes = new Set<number>();
  let guard = 0;
  while (bookedIndexes.size < toBook && guard < total * 4) {
    bookedIndexes.add(Math.floor(rng() * total));
    guard++;
  }
  bookedIndexes.forEach((i) => {
    seats[i] = { ...seats[i], status: "booked" as SeatStatus };
  });

  return seats;
}
