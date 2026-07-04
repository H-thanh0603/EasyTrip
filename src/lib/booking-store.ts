// localStorage-backed store for the in-progress booking draft, search params,
// and the user's confirmed tickets. All access is guarded for SSR safety.

import type { Booking, BookingDraft } from "@/lib/types";
import type { TripSearchParams } from "@/lib/mock-api";

const DRAFT_KEY = "easytrip.draft";
const SEARCH_KEY = "easytrip.search";
const TICKETS_KEY = "easytrip.tickets";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function read<T>(key: string): T | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota / serialization errors in this mock context.
  }
}

// --- Search params (last search, used to prefill and drive results) ---
export function saveSearch(params: TripSearchParams): void {
  write(SEARCH_KEY, params);
}
export function loadSearch(): TripSearchParams | null {
  return read<TripSearchParams>(SEARCH_KEY);
}

// --- Booking draft (trip + seats selected before passenger step) ---
export function saveDraft(draft: BookingDraft): void {
  write(DRAFT_KEY, draft);
}
export function loadDraft(): BookingDraft | null {
  return read<BookingDraft>(DRAFT_KEY);
}
export function clearDraft(): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(DRAFT_KEY);
}

// --- Confirmed tickets ---
export function loadTickets(): Booking[] {
  return read<Booking[]>(TICKETS_KEY) ?? [];
}

export function addTicket(booking: Booking): void {
  const existing = loadTickets();
  write(TICKETS_KEY, [booking, ...existing]);
}

export function getTicket(code: string): Booking | undefined {
  return loadTickets().find((b) => b.code === code);
}

// Generate a human-friendly booking code, e.g. "ET-8F3K2Q".
export function generateBookingCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ET-${out}`;
}
