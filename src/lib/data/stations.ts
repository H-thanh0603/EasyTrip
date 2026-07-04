import type { BusType } from "@/lib/types";

// Bus stations / pickup-dropoff points per city (Vietnamese).
export const stationsByCity: Record<string, string[]> = {
  sgn: [
    "Bến xe Miền Đông Mới",
    "Bến xe Miền Tây",
    "Văn phòng Quận 1 - 272 Đề Thám",
    "Ngã tư Hàng Xanh",
  ],
  dlt: ["Bến xe Đà Lạt", "Văn phòng Đà Lạt - 01 Tô Hiến Thành", "Chợ Đà Lạt"],
  nha: ["Bến xe phía Nam Nha Trang", "Văn phòng Nha Trang - 88 Lê Thánh Tôn"],
  dad: ["Bến xe Trung tâm Đà Nẵng", "Văn phòng Đà Nẵng - 201 Tôn Đức Thắng"],
  ctho: ["Bến xe Trung tâm Cần Thơ", "Văn phòng Ninh Kiều"],
  vtu: ["Bến xe Vũng Tàu", "Bãi Trước - 01 Quang Trung"],
  han: ["Bến xe Giáp Bát", "Bến xe Nước Ngầm", "Văn phòng Hà Nội - 12 Trần Nhật Duật"],
  hue: ["Bến xe phía Nam Huế", "Văn phòng Huế - 97 An Dương Vương"],
  qnh: ["Bến xe Quy Nhơn", "Văn phòng Quy Nhơn - 47 Tây Sơn"],
};

export function getStations(cityId: string): string[] {
  return stationsByCity[cityId] ?? ["Bến xe trung tâm"];
}

// Display metadata for each bus type (Vietnamese labels).
export const busTypeMeta: Record<BusType, { label: string; short: string }> = {
  seat: { label: "Ghế ngồi", short: "Ghế" },
  sleeper: { label: "Giường nằm", short: "Giường" },
  limousine: { label: "Limousine", short: "Limo" },
  "double-decker": { label: "Giường nằm 2 tầng", short: "2 tầng" },
};

export const amenityMeta: Record<
  string,
  { label: string }
> = {
  wifi: { label: "Wifi miễn phí" },
  water: { label: "Nước suối" },
  blanket: { label: "Chăn đắp" },
  charging: { label: "Cổng sạc USB" },
  tv: { label: "TV giải trí" },
  toilet: { label: "Nhà vệ sinh" },
  ac: { label: "Điều hòa" },
  snack: { label: "Bánh snack" },
};
