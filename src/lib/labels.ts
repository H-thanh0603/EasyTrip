// Vietnamese display labels + icon keys for enum-like domain values.
// Centralized so TripCard, filters and detail pages stay consistent.

import type { Amenity, BusType, BookingStatus } from "@/lib/types";

export const busTypeLabel: Record<BusType, string> = {
  seat: "Ghế ngồi",
  sleeper: "Giường nằm",
  limousine: "Limousine",
  "double-decker": "Giường đôi 2 tầng",
};

export const busTypeShort: Record<BusType, string> = {
  seat: "Ghế ngồi",
  sleeper: "Giường nằm",
  limousine: "Limousine",
  "double-decker": "2 tầng",
};

export const amenityLabel: Record<Amenity, string> = {
  wifi: "Wifi miễn phí",
  water: "Nước suối",
  blanket: "Chăn gối",
  charging: "Cổng sạc USB",
  tv: "TV giải trí",
  toilet: "Nhà vệ sinh",
  ac: "Điều hòa",
  snack: "Đồ ăn nhẹ",
};

export const bookingStatusLabel: Record<BookingStatus, string> = {
  pending: "Chờ thanh toán",
  confirmed: "Đã xác nhận",
  cancelled: "Đã hủy",
  completed: "Hoàn thành",
};

export type DepartWindow = "morning" | "afternoon" | "evening" | "night";

export const departWindowLabel: Record<DepartWindow, string> = {
  morning: "Sáng sớm (05:00 - 12:00)",
  afternoon: "Buổi chiều (12:00 - 17:00)",
  evening: "Buổi tối (17:00 - 21:00)",
  night: "Đêm khuya (21:00 - 05:00)",
};
