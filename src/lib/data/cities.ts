import type { City } from "@/lib/types";

// Vietnamese cities available as departure / destination points.
export const cities: City[] = [
  { id: "sgn", name: "TP. Hồ Chí Minh", region: "Nam" },
  { id: "dlt", name: "Đà Lạt", region: "Nam" },
  { id: "nha", name: "Nha Trang", region: "Trung" },
  { id: "dad", name: "Đà Nẵng", region: "Trung" },
  { id: "ctho", name: "Cần Thơ", region: "Nam" },
  { id: "vtu", name: "Vũng Tàu", region: "Nam" },
  { id: "han", name: "Hà Nội", region: "Bắc" },
  { id: "hue", name: "Huế", region: "Trung" },
  { id: "qnh", name: "Quy Nhơn", region: "Trung" },
];

export function getCity(id: string): City | undefined {
  return cities.find((c) => c.id === id);
}

export function getCityName(id: string): string {
  return getCity(id)?.name ?? id;
}
