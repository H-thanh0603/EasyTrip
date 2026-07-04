// Aggregated mock data for the admin dashboard.
// Derived from the trips/operators/routes modules plus a seeded set of bookings
// so the dashboard looks realistic without a backend.

import type { BookingStatus, BusType } from "@/lib/types";
import { trips } from "@/lib/data/trips";
import { operators, getOperator } from "@/lib/data/operators";
import { routes } from "@/lib/data/routes";
import { getCityName } from "@/lib/data/cities";
import { busTypeLabel } from "@/lib/labels";

export interface AdminBooking {
  code: string;
  customer: string;
  routeLabel: string;
  operatorName: string;
  seats: number;
  total: number;
  status: BookingStatus;
  createdAt: string; // ISO
}

const CUSTOMER_NAMES = [
  "Nguyễn Văn An",
  "Trần Thị Bình",
  "Lê Hoàng Cường",
  "Phạm Thu Dung",
  "Vũ Minh Đức",
  "Hoàng Thị Én",
  "Đặng Quốc Phong",
  "Bùi Khánh Giang",
  "Ngô Thanh Hà",
  "Dương Gia Huy",
  "Lý Bảo Khánh",
  "Mai Tuyết Lan",
];

const STATUSES: BookingStatus[] = [
  "confirmed",
  "confirmed",
  "completed",
  "pending",
  "confirmed",
  "completed",
  "cancelled",
  "confirmed",
];

function seeded(seed: number): () => number {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function bookingCode(n: number): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const rng = seeded(n * 131 + 7);
  let out = "";
  for (let i = 0; i < 6; i++) out += chars[Math.floor(rng() * chars.length)];
  return `ET-${out}`;
}

// Build a deterministic list of recent bookings for the admin views.
function buildBookings(count: number): AdminBooking[] {
  const rng = seeded(20260704);
  const list: AdminBooking[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const trip = trips[Math.floor(rng() * trips.length)];
    const operator = getOperator(trip.operatorId)!;
    const seats = 1 + Math.floor(rng() * 3);
    const status = STATUSES[Math.floor(rng() * STATUSES.length)];
    const daysAgo = Math.floor(rng() * 30);
    const createdAt = new Date(now - daysAgo * 86_400_000 - Math.floor(rng() * 86_400_000));
    list.push({
      code: bookingCode(i + 1),
      customer: CUSTOMER_NAMES[Math.floor(rng() * CUSTOMER_NAMES.length)],
      routeLabel: `${getCityName(trip.fromCityId)} → ${getCityName(trip.toCityId)}`,
      operatorName: operator.name,
      seats,
      total: (trip.price + (rng() > 0.7 ? 50000 : 0)) * seats,
      status,
      createdAt: createdAt.toISOString(),
    });
  }

  return list.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export const adminBookings: AdminBooking[] = buildBookings(48);

export interface AdminStats {
  totalBookings: number;
  revenue: number;
  activeTrips: number;
  cancelled: number;
}

// Revenue counts only non-cancelled bookings.
export function getAdminStats(): AdminStats {
  const revenue = adminBookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.total, 0);
  const cancelled = adminBookings.filter((b) => b.status === "cancelled").length;
  return {
    totalBookings: adminBookings.length,
    revenue,
    activeTrips: trips.length,
    cancelled,
  };
}

// Revenue + booking count grouped by weekday label for the chart.
export interface RevenuePoint {
  label: string;
  revenue: number;
  bookings: number;
}

const WEEKDAY_LABELS = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export function getRevenueByWeekday(): RevenuePoint[] {
  const buckets = WEEKDAY_LABELS.map((label) => ({ label, revenue: 0, bookings: 0 }));
  for (const b of adminBookings) {
    if (b.status === "cancelled") continue;
    const day = new Date(b.createdAt).getDay();
    buckets[day].revenue += b.total;
    buckets[day].bookings += 1;
  }
  // Reorder Monday-first for a more natural business week.
  return [...buckets.slice(1), buckets[0]];
}

// Status distribution for a small breakdown widget.
export function getStatusBreakdown(): Array<{ status: BookingStatus; count: number }> {
  const map: Record<BookingStatus, number> = {
    pending: 0,
    confirmed: 0,
    cancelled: 0,
    completed: 0,
  };
  for (const b of adminBookings) map[b.status] += 1;
  return (Object.keys(map) as BookingStatus[]).map((status) => ({
    status,
    count: map[status],
  }));
}

// --- Trips management view ---
export interface AdminTripRow {
  id: string;
  operatorName: string;
  routeLabel: string;
  busTypeLabel: string;
  departLabel: string; // "21:30"
  price: number;
  availableSeats: number;
  totalSeats: number;
  rating: number;
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

export function getAdminTrips(): AdminTripRow[] {
  return trips.map((t) => {
    const operator = getOperator(t.operatorId)!;
    return {
      id: t.id,
      operatorName: operator.name,
      routeLabel: `${getCityName(t.fromCityId)} → ${getCityName(t.toCityId)}`,
      busTypeLabel: busTypeLabel[t.busType],
      departLabel: `${pad(t.departHour)}:${pad(t.departMinute)}`,
      price: t.price,
      availableSeats: t.availableSeats,
      totalSeats: t.totalSeats,
      rating: t.rating,
    };
  });
}

// --- Routes & operators summaries ---
export function getRouteCount(): number {
  return routes.length;
}

export function getOperatorCount(): number {
  return operators.length;
}

export interface BusTypeShare {
  busType: BusType;
  label: string;
  count: number;
}

export function getBusTypeShare(): BusTypeShare[] {
  const map = new Map<BusType, number>();
  for (const t of trips) {
    map.set(t.busType, (map.get(t.busType) ?? 0) + 1);
  }
  return Array.from(map.entries()).map(([busType, count]) => ({
    busType,
    label: busTypeLabel[busType],
    count,
  }));
}
