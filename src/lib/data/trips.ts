import type { Amenity, BusType, Trip } from "@/lib/types";
import { routes } from "./routes";
import { operators } from "./operators";
import { getStations } from "./stations";

// Deterministic pseudo-random generator so trips stay stable between renders.
function seeded(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const BUS_TYPES: BusType[] = ["seat", "sleeper", "limousine", "double-decker"];
const ALL_AMENITIES: Amenity[] = [
  "wifi",
  "water",
  "blanket",
  "charging",
  "tv",
  "toilet",
  "ac",
  "snack",
];

// Base departure hours spread across the day.
const DEPART_HOURS = [6, 8, 9, 11, 13, 14, 16, 19, 21, 22, 23];

const busTypeConfig: Record<
  BusType,
  { priceMul: number; seats: number; durationMul: number }
> = {
  seat: { priceMul: 0.85, seats: 45, durationMul: 1.0 },
  sleeper: { priceMul: 1.0, seats: 40, durationMul: 1.0 },
  limousine: { priceMul: 1.45, seats: 22, durationMul: 0.92 },
  "double-decker": { priceMul: 1.15, seats: 44, durationMul: 1.0 },
};

function pickAmenities(rng: () => number, busType: BusType): Amenity[] {
  const base: Amenity[] = ["ac", "water", "charging"];
  if (rng() > 0.3) base.push("wifi");
  if (busType !== "seat") base.push("blanket");
  if (rng() > 0.5) base.push("tv");
  if (busType === "limousine" || rng() > 0.6) base.push("toilet");
  if (rng() > 0.7) base.push("snack");
  return Array.from(new Set(base));
}

function buildTrips(): Trip[] {
  const trips: Trip[] = [];
  let counter = 0;

  routes.forEach((route, rIdx) => {
    // Each route gets served by 3-4 operators.
    const routeOperators = operators.filter((_, i) => (i + rIdx) % 6 < 4);
    const fromStations = getStations(route.fromCityId);
    const toStations = getStations(route.toCityId);

    routeOperators.forEach((op, oIdx) => {
      const rng = seeded((rIdx + 1) * 100 + (oIdx + 1) * 7 + 13);
      const departCount = 2 + Math.floor(rng() * 2); // 2-3 daily departures

      for (let d = 0; d < departCount; d++) {
        const hour = DEPART_HOURS[(rIdx + oIdx + d) % DEPART_HOURS.length];
        const busType = BUS_TYPES[(oIdx + d) % BUS_TYPES.length];
        const cfg = busTypeConfig[busType];

        // Duration derived from distance (avg ~55km/h) with type modifier.
        const baseMinutes = Math.round((route.distanceKm / 55) * 60 * cfg.durationMul);
        const durationMinutes = Math.round(baseMinutes / 5) * 5;

        const price =
          Math.round((route.basePrice * cfg.priceMul * (0.95 + rng() * 0.15)) / 1000) *
          1000;

        const totalSeats = cfg.seats;
        const availableSeats = 4 + Math.floor(rng() * (totalSeats - 8));
        const rating = Math.round((3.9 + rng() * 1.0) * 10) / 10;

        trips.push({
          id: `trip-${route.id}-${op.id}-${d}`,
          operatorId: op.id,
          routeId: route.id,
          fromCityId: route.fromCityId,
          toCityId: route.toCityId,
          departureStation: fromStations[(oIdx + d) % fromStations.length],
          arrivalStation: toStations[(oIdx + d) % toStations.length],
          departHour: hour,
          departMinute: [0, 15, 30, 45][(rIdx + d) % 4],
          durationMinutes,
          busType,
          price,
          totalSeats,
          availableSeats,
          rating,
          amenities: pickAmenities(rng, busType),
        });
        counter++;
      }
    });
  });

  return trips;
}

export const trips: Trip[] = buildTrips();

export function getTripById(id: string): Trip | undefined {
  return trips.find((t) => t.id === id);
}
