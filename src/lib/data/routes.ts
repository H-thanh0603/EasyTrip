import type { Route } from "@/lib/types";

// Popular intercity routes with distance and base price (VND).
export const routes: Route[] = [
  { id: "r-sgn-dlt", fromCityId: "sgn", toCityId: "dlt", distanceKm: 308, basePrice: 290000 },
  { id: "r-sgn-nha", fromCityId: "sgn", toCityId: "nha", distanceKm: 435, basePrice: 350000 },
  { id: "r-sgn-vtu", fromCityId: "sgn", toCityId: "vtu", distanceKm: 95, basePrice: 150000 },
  { id: "r-sgn-ctho", fromCityId: "sgn", toCityId: "ctho", distanceKm: 169, basePrice: 180000 },
  { id: "r-sgn-dad", fromCityId: "sgn", toCityId: "dad", distanceKm: 964, basePrice: 620000 },
  { id: "r-dad-hue", fromCityId: "dad", toCityId: "hue", distanceKm: 95, basePrice: 130000 },
  { id: "r-dad-nha", fromCityId: "dad", toCityId: "nha", distanceKm: 530, basePrice: 400000 },
  { id: "r-nha-dlt", fromCityId: "nha", toCityId: "dlt", distanceKm: 135, basePrice: 170000 },
  { id: "r-han-hue", fromCityId: "han", toCityId: "hue", distanceKm: 668, basePrice: 480000 },
  { id: "r-han-dad", fromCityId: "han", toCityId: "dad", distanceKm: 763, basePrice: 540000 },
  { id: "r-sgn-qnh", fromCityId: "sgn", toCityId: "qnh", distanceKm: 649, basePrice: 460000 },
  { id: "r-dad-qnh", fromCityId: "dad", toCityId: "qnh", distanceKm: 303, basePrice: 250000 },
];

export function getRoute(id: string): Route | undefined {
  return routes.find((r) => r.id === id);
}

export function findRoute(fromCityId: string, toCityId: string): Route | undefined {
  return routes.find((r) => r.fromCityId === fromCityId && r.toCityId === toCityId);
}
