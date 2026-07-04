"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, SearchX } from "lucide-react";
import {
  searchTrips,
  getPriceRange,
  getOperatorsForRoute,
  getCityName,
  type TripFilters,
  type SortKey,
} from "@/lib/mock-api";
import { saveSearch } from "@/lib/booking-store";
import { formatDateVI, toDateInputValue } from "@/lib/format";
import { SearchBox } from "./SearchBox";
import { TripCard } from "./TripCard";
import { FilterSidebar } from "./FilterSidebar";
import { SortBar } from "./SortBar";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";

// Reads search params from the URL, applies filters/sort, renders results.
export function SearchResults() {
  const params = useSearchParams();
  const today = useMemo(() => toDateInputValue(new Date()), []);
  const fromCityId = params.get("from") ?? "sgn";
  const toCityId = params.get("to") ?? "dlt";
  const date = params.get("date") || today;
  const passengers = Number(params.get("passengers") ?? "1");

  const [filters, setFilters] = useState<TripFilters>({});
  const [sort, setSort] = useState<SortKey>("cheapest");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Reset filters and show a brief loading state whenever the route changes.
  useEffect(() => {
    setFilters({});
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 450);
    return () => clearTimeout(id);
  }, [fromCityId, toCityId, date]);

  // Persist the latest search so downstream flow steps can recover it.
  useEffect(() => {
    if (date) {
      saveSearch({ fromCityId, toCityId, date, passengers });
    }
  }, [fromCityId, toCityId, date, passengers]);

  const priceRange = useMemo(
    () => getPriceRange(fromCityId, toCityId),
    [fromCityId, toCityId],
  );
  const routeOperators = useMemo(
    () => getOperatorsForRoute(fromCityId, toCityId),
    [fromCityId, toCityId],
  );
  const trips = useMemo(
    () => searchTrips({ fromCityId, toCityId, date, passengers }, filters, sort),
    [fromCityId, toCityId, date, passengers, filters, sort],
  );

  const routeLabel = `${getCityName(fromCityId)} → ${getCityName(toCityId)}`;

  return (
    <div className="bg-slate-50">
      {/* Search bar header */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-page py-5">
          <div className="mb-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{routeLabel}</h1>
            {date && (
              <span className="text-sm text-slate-500">{formatDateVI(date)}</span>
            )}
          </div>
          <p className="mb-4 text-sm text-slate-500">{passengers} hành khách</p>
          <SearchBox
            variant="page"
            initial={{ fromCityId, toCityId, date, passengers }}
          />
        </div>
      </div>

      <div className="container-page py-6">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-6">
          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-20">
              <FilterSidebar
                filters={filters}
                onChange={setFilters}
                priceRange={priceRange}
                operators={routeOperators}
              />
            </div>
          </aside>

          {/* Results */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowFilters(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Bộ lọc
              </button>
              <div className="flex-1">
                <SortBar value={sort} onChange={setSort} resultCount={trips.length} />
              </div>
            </div>

            {loading ? (
              <LoadingState label="Đang tìm chuyến xe phù hợp..." />
            ) : trips.length === 0 ? (
              <EmptyState
                icon={<SearchX className="h-8 w-8" />}
                title="Không tìm thấy chuyến xe"
                description="Thử điều chỉnh bộ lọc hoặc chọn ngày, tuyến đường khác để xem thêm lựa chọn."
                action={
                  <button
                    type="button"
                    onClick={() => setFilters({})}
                    className="btn-outline"
                  >
                    Xóa bộ lọc
                  </button>
                }
              />
            ) : (
              <div className="space-y-4">
                {trips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    date={date}
                    passengers={passengers}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {showFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="absolute inset-y-0 left-0 w-[85%] max-w-sm overflow-y-auto bg-slate-50 p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Bộ lọc</h2>
              <button
                type="button"
                onClick={() => setShowFilters(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200"
                aria-label="Đóng"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterSidebar
              filters={filters}
              onChange={setFilters}
              priceRange={priceRange}
              operators={routeOperators}
            />
            <button
              type="button"
              onClick={() => setShowFilters(false)}
              className="btn-primary mt-4 w-full"
            >
              Xem {trips.length} kết quả
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
