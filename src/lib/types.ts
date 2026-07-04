// Core domain types for the EasyTrip bus booking system.
// All types are backend-agnostic so mock data can later be swapped for a real API.

export interface City {
  id: string;
  name: string; // Vietnamese display name, e.g. "TP. Hồ Chí Minh"
  region: "Bắc" | "Trung" | "Nam";
}

export interface BusOperator {
  id: string;
  name: string;
  logoText: string; // short text badge in lieu of a real logo
  rating: number; // 0..5
  reviewCount: number;
  established: number; // founding year
  description: string;
  accentColor: string; // hex accent used in UI badges
}

export interface Route {
  id: string;
  fromCityId: string;
  toCityId: string;
  distanceKm: number;
  basePrice: number; // VND
}

export type BusType = "seat" | "sleeper" | "limousine" | "double-decker";

export type Amenity =
  | "wifi"
  | "water"
  | "blanket"
  | "charging"
  | "tv"
  | "toilet"
  | "ac"
  | "snack";

export interface Trip {
  id: string;
  operatorId: string;
  routeId: string;
  fromCityId: string;
  toCityId: string;
  departureStation: string;
  arrivalStation: string;
  departHour: number; // 0..23; actual date comes from user's search
  departMinute: number; // 0..59
  durationMinutes: number;
  busType: BusType;
  price: number; // VND, per seat base
  totalSeats: number;
  availableSeats: number;
  rating: number;
  amenities: Amenity[];
}

export type SeatStatus = "available" | "booked" | "selected" | "vip";

export interface Seat {
  id: string;
  label: string; // e.g. "A1"
  deck: "lower" | "upper";
  row: number;
  col: number;
  status: SeatStatus;
  priceModifier: number; // added to trip base price (VIP > 0)
}

export interface Passenger {
  fullName: string;
  phone: string;
  email: string;
  seatLabel: string;
  note?: string;
}

export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";

export interface Booking {
  code: string;
  tripId: string;
  operatorName: string;
  routeLabel: string; // "TP. Hồ Chí Minh → Đà Lạt"
  fromCityId: string;
  toCityId: string;
  departTime: string;
  arriveTime: string;
  departureStation: string;
  arrivalStation: string;
  busType: BusType;
  seats: string[]; // seat labels
  passengers: Passenger[];
  pickupPoint: string;
  dropoffPoint: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  total: number;
  status: BookingStatus;
  paymentMethod: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  avatarText: string;
  rating: number;
  route: string;
  comment: string;
  date: string;
}

export interface Promotion {
  id: string;
  code: string;
  title: string;
  description: string;
  discountLabel: string; // "Giảm 20%"
  expiry: string;
  color: string;
}

// In-progress booking draft persisted to localStorage between flow steps.
export interface BookingDraft {
  tripId: string;
  seatLabels: string[];
  seatPrices: Record<string, number>; // label -> full price
  passengerCount: number;
  total: number;
}
