import {
  Wifi,
  Droplets,
  BedDouble,
  Plug,
  Tv,
  Bath,
  Snowflake,
  Cookie,
  type LucideIcon,
} from "lucide-react";
import type { Amenity } from "@/lib/types";

// Icon per amenity, shared by trip cards and the detail page.
export const amenityIcon: Record<Amenity, LucideIcon> = {
  wifi: Wifi,
  water: Droplets,
  blanket: BedDouble,
  charging: Plug,
  tv: Tv,
  toilet: Bath,
  ac: Snowflake,
  snack: Cookie,
};
