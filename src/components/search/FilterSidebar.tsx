"use client";

import { Star, RotateCcw } from "lucide-react";
import type { Amenity, BusOperator, BusType } from "@/lib/types";
import type { TripFilters } from "@/lib/mock-api";
import { formatVND } from "@/lib/format";
import {
  busTypeLabel,
  amenityLabel,
  departWindowLabel,
  type DepartWindow,
} from "@/lib/labels";
import { amenityIcon } from "./amenityIcons";

interface FilterSidebarProps {
  filters: TripFilters;
  onChange: (next: TripFilters) => void;
  priceRange: [number, number];
  operators: BusOperator[];
}

const BUS_TYPES: BusType[] = ["seat", "sleeper", "limousine", "double-decker"];
const AMENITIES: Amenity[] = ["wifi", "charging", "ac", "toilet", "blanket", "tv"];
const WINDOWS: DepartWindow[] = ["morning", "afternoon", "evening", "night"];

// Toggle a value inside an optional array filter immutably.
function toggle<T>(list: T[] | undefined, value: T): T[] {
  const set = new Set(list ?? []);
  if (set.has(value)) {
    set.delete(value);
  } else {
    set.add(value);
  }
  return Array.from(set);
}

export function FilterSidebar({
  filters,
  onChange,
  priceRange,
  operators,
}: FilterSidebarProps) {
  const [minPrice, maxPrice] = priceRange;
  const currentMax = filters.priceMax ?? maxPrice;
  const hasActive =
    filters.priceMax != null ||
    !!filters.busTypes?.length ||
    !!filters.operatorIds?.length ||
    filters.minRating != null ||
    !!filters.amenities?.length ||
    !!filters.departWindows?.length;

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-slate-900">Bộ lọc</h2>
        {hasActive && (
          <button
            type="button"
            onClick={() => onChange({})}
            className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Đặt lại
          </button>
        )}
      </div>

      {/* Price */}
      <FilterGroup title="Mức giá tối đa">
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          step={10000}
          value={currentMax}
          onChange={(e) => onChange({ ...filters, priceMax: Number(e.target.value) })}
          className="w-full accent-brand-600"
        />
        <div className="mt-1 flex justify-between text-xs text-slate-500">
          <span>{formatVND(minPrice)}</span>
          <span className="font-semibold text-brand-700">{formatVND(currentMax)}</span>
        </div>
      </FilterGroup>

      {/* Departure window */}
      <FilterGroup title="Giờ khởi hành">
        <div className="space-y-2">
          {WINDOWS.map((w) => (
            <CheckRow
              key={w}
              label={departWindowLabel[w]}
              checked={filters.departWindows?.includes(w) ?? false}
              onChange={() =>
                onChange({ ...filters, departWindows: toggle(filters.departWindows, w) })
              }
            />
          ))}
        </div>
      </FilterGroup>

      {/* Bus type */}
      <FilterGroup title="Loại xe">
        <div className="space-y-2">
          {BUS_TYPES.map((t) => (
            <CheckRow
              key={t}
              label={busTypeLabel[t]}
              checked={filters.busTypes?.includes(t) ?? false}
              onChange={() =>
                onChange({ ...filters, busTypes: toggle(filters.busTypes, t) })
              }
            />
          ))}
        </div>
      </FilterGroup>

      {/* Operator */}
      <FilterGroup title="Nhà xe">
        <div className="space-y-2">
          {operators.map((op) => (
            <CheckRow
              key={op.id}
              label={op.name}
              checked={filters.operatorIds?.includes(op.id) ?? false}
              onChange={() =>
                onChange({ ...filters, operatorIds: toggle(filters.operatorIds, op.id) })
              }
            />
          ))}
        </div>
      </FilterGroup>

      {/* Rating */}
      <FilterGroup title="Đánh giá tối thiểu">
        <div className="flex flex-wrap gap-2">
          {[3, 4, 4.5].map((r) => {
            const active = filters.minRating === r;
            return (
              <button
                key={r}
                type="button"
                onClick={() =>
                  onChange({ ...filters, minRating: active ? undefined : r })
                }
                className={
                  active
                    ? "inline-flex items-center gap-1 rounded-lg border border-brand-500 bg-brand-50 px-3 py-1.5 text-sm font-semibold text-brand-700"
                    : "inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:border-brand-300"
                }
              >
                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                {r}+
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Amenities */}
      <FilterGroup title="Tiện ích" last>
        <div className="space-y-2">
          {AMENITIES.map((a) => {
            const Icon = amenityIcon[a];
            return (
              <CheckRow
                key={a}
                label={amenityLabel[a]}
                icon={<Icon className="h-4 w-4 text-brand-500" />}
                checked={filters.amenities?.includes(a) ?? false}
                onChange={() =>
                  onChange({ ...filters, amenities: toggle(filters.amenities, a) })
                }
              />
            );
          })}
        </div>
      </FilterGroup>
    </div>
  );
}

function FilterGroup({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "pt-5" : "border-b border-slate-100 py-5"}>
      <h3 className="mb-3 text-sm font-semibold text-slate-800">{title}</h3>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
  icon,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-slate-600 hover:text-slate-900">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500/30"
      />
      {icon}
      <span>{label}</span>
    </label>
  );
}
