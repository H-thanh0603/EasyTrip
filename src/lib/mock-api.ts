// Data-access layer over the mock data modules.
// Kept as the single seam so a real backend/API can replace these functions later.

import type {
  Amenity,
  BusOperator,
  BusType,
  City,
  Review,
  Seat,
  Trip,
} from "@/lib/types";
import { cities, getCity, getCityName } from "@/lib/data/cities";
import { operators, getOperator } from "@/lib/data/operators";
import { routes, findRoute } from "@/lib/data/routes";
import { trips, getTripById } from "@/lib/data/trips";
import { reviews } from "@/lib/data/reviews";
import { promotions } from "@/lib/data/promotions";
import { generateSeats } from "@/lib/data/seats";

export type SortKey = "cheapest" | "earliest" | "fastest" | "top-rated";

export interface TripFilters {
  priceMax?: number;
  busTypes?: BusType[];
  operatorIds?: string[];
  minRating?: number;
  amenities?: Amenity[];
  departWindows?: Array<"morning" | "afternoon" | "evening" | "night">;
}

export interface TripSearchParams {
  fromCityId: string;
  toCityId: string;
  date: string; // yyyy-mm-dd
  passengers: number;
}

// A trip enriched with computed absolute times for the searched date + operator info.
export interface EnrichedTrip extends Trip {
  operator: BusOperator;
  fromCityName: string;
  toCityName: string;
  departTime: string; // ISO for the searched date
  arriveTime: string; // ISO
}

function combineDateTime(date: string, hour: number, minute: number): Date {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d, hour, minute, 0, 0);
}

export function enrichTrip(trip: Trip, date: string): EnrichedTrip {
  const depart = combineDateTime(date, trip.departHour, trip.departMinute);
  const arrive = new Date(depart.getTime() + trip.durationMinutes * 60_000);
  const operator = getOperator(trip.operatorId)!;
  return {
    ...trip,
    operator,
    fromCityName: getCityName(trip.fromCityId),
    toCityName: getCityName(trip.toCityId),
    departTime: depart.toISOString(),
    arriveTime: arrive.toISOString(),
  };
}

function departWindow(hour: number): "morning" | "afternoon" | "evening" | "night" {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 21) return "evening";
  return "night";
}

export function searchTrips(
  params: TripSearchParams,
  filters: TripFilters = {},
  sort: SortKey = "cheapest",
): EnrichedTrip[] {
  let result = trips.filter(
    (t) => t.fromCityId === params.fromCityId && t.toCityId === params.toCityId,
  );

  if (filters.priceMax != null) {
    result = result.filter((t) => t.price <= filters.priceMax!);
  }
  if (filters.busTypes?.length) {
    result = result.filter((t) => filters.busTypes!.includes(t.busType));
  }
  if (filters.operatorIds?.length) {
    result = result.filter((t) => filters.operatorIds!.includes(t.operatorId));
  }
  if (filters.minRating != null) {
    result = result.filter((t) => t.rating >= filters.minRating!);
  }
  if (filters.amenities?.length) {
    result = result.filter((t) =>
      filters.amenities!.every((a) => t.amenities.includes(a)),
    );
  }
  if (filters.departWindows?.length) {
    result = result.filter((t) =>
      filters.departWindows!.includes(departWindow(t.departHour)),
    );
  }

  const enriched = result.map((t) => enrichTrip(t, params.date));

  switch (sort) {
    case "cheapest":
      enriched.sort((a, b) => a.price - b.price);
      break;
    case "earliest":
      enriched.sort((a, b) => a.departHour * 60 + a.departMinute - (b.departHour * 60 + b.departMinute));
      break;
    case "fastest":
      enriched.sort((a, b) => a.durationMinutes - b.durationMinutes);
      break;
    case "top-rated":
      enriched.sort((a, b) => b.rating - a.rating);
      break;
  }

  return enriched;
}

// Price range across all trips for a route (used to seed the price filter).
export function getPriceRange(fromCityId: string, toCityId: string): [number, number] {
  const routeTrips = trips.filter(
    (t) => t.fromCityId === fromCityId && t.toCityId === toCityId,
  );
  if (!routeTrips.length) return [0, 0];
  const prices = routeTrips.map((t) => t.price);
  return [Math.min(...prices), Math.max(...prices)];
}

// Operators that serve a given route (used to seed the operator filter).
export function getOperatorsForRoute(
  fromCityId: string,
  toCityId: string,
): BusOperator[] {
  const ids = new Set(
    trips
      .filter((t) => t.fromCityId === fromCityId && t.toCityId === toCityId)
      .map((t) => t.operatorId),
  );
  return operators.filter((o) => ids.has(o.id));
}

export function getSeatsForTrip(tripId: string): Seat[] {
  const trip = getTripById(tripId);
  if (!trip) return [];
  const bookedCount = trip.totalSeats - trip.availableSeats;
  return generateSeats(tripId, trip.busType, bookedCount);
}

// Popular routes for the home page: pick a representative cheapest trip per route.
export interface PopularRoute {
  routeId: string;
  fromCityName: string;
  toCityName: string;
  fromCityId: string;
  toCityId: string;
  fromPrice: number;
  distanceKm: number;
  operatorCount: number;
}

export function getPopularRoutes(limit = 6): PopularRoute[] {
  return routes.slice(0, limit).map((r) => {
    const routeTrips = trips.filter((t) => t.routeId === r.id);
    const fromPrice = routeTrips.length
      ? Math.min(...routeTrips.map((t) => t.price))
      : r.basePrice;
    const opCount = new Set(routeTrips.map((t) => t.operatorId)).size;
    return {
      routeId: r.id,
      fromCityName: getCityName(r.fromCityId),
      toCityName: getCityName(r.toCityId),
      fromCityId: r.fromCityId,
      toCityId: r.toCityId,
      fromPrice,
      distanceKm: r.distanceKm,
      operatorCount: opCount,
    };
  });
}

export function getFeaturedOperators(limit = 6): BusOperator[] {
  return [...operators].sort((a, b) => b.rating - a.rating).slice(0, limit);
}

export function getReviews(): Review[] {
  return reviews;
}

export function getPromotions() {
  return promotions;
}

export function getCities(): City[] {
  return cities;
}

export {
  getTripById,
  getCity,
  getCityName,
  getOperator,
  findRoute,
};
