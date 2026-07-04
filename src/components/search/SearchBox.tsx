"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { MapPin, CalendarDays, Users, ArrowLeftRight, Search } from "lucide-react";
import { getCities } from "@/lib/mock-api";
import { toDateInputValue } from "@/lib/format";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  variant?: "hero" | "page";
  initial?: {
    fromCityId?: string;
    toCityId?: string;
    date?: string;
    passengers?: number;
  };
  className?: string;
}

// Reusable ticket search form. Drives navigation to /search with query params.
export function SearchBox({ variant = "hero", initial, className }: SearchBoxProps) {
  const router = useRouter();
  const cities = useMemo(() => getCities(), []);
  const today = useMemo(() => toDateInputValue(new Date()), []);

  const [fromCityId, setFromCityId] = useState(initial?.fromCityId ?? "sgn");
  const [toCityId, setToCityId] = useState(initial?.toCityId ?? "dlt");
  const [date, setDate] = useState(initial?.date ?? today);
  const [passengers, setPassengers] = useState(initial?.passengers ?? 1);
  const [error, setError] = useState<string | null>(null);

  const swap = () => {
    setFromCityId(toCityId);
    setToCityId(fromCityId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fromCityId === toCityId) {
      setError("Điểm đi và điểm đến không được trùng nhau.");
      return;
    }
    setError(null);
    const params = new URLSearchParams({
      from: fromCityId,
      to: toCityId,
      date,
      passengers: String(passengers),
    });
    router.push(`/search?${params.toString()}`);
  };

  const isHero = variant === "hero";

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-3xl border border-white/60 bg-white/95 p-4 shadow-soft backdrop-blur sm:p-5",
        isHero && "ring-1 ring-black/5",
        className,
      )}
    >
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_auto_1fr_1fr_auto] lg:items-end">
        {/* From */}
        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Điểm đi
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-600" />
            <select
              value={fromCityId}
              onChange={(e) => setFromCityId(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 font-semibold text-slate-900 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap */}
        <button
          type="button"
          onClick={swap}
          className="mx-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-brand-600 shadow-sm transition hover:rotate-180 hover:border-brand-300 hover:text-brand-700 lg:mb-1"
          aria-label="Đổi chiều điểm đi và điểm đến"
        >
          <ArrowLeftRight className="h-5 w-5" />
        </button>

        {/* To */}
        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Điểm đến
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-accent-500" />
            <select
              value={toCityId}
              onChange={(e) => setToCityId(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 font-semibold text-slate-900 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date */}
        <div className="relative">
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Ngày đi
          </label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-600" />
            <input
              type="date"
              value={date}
              min={today}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-3 font-semibold text-slate-900 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {/* Passengers + submit */}
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
          <div className="relative min-w-[130px]">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
              Số vé
            </label>
            <div className="relative">
              <Users className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-600" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(Number(e.target.value))}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/80 py-3.5 pl-11 pr-4 font-semibold text-slate-900 transition focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} vé
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {error ? (
          <p className="text-sm font-medium text-rose-600">{error}</p>
        ) : (
          <p className="text-sm text-slate-500">
            Hơn <span className="font-semibold text-slate-700">500+</span> chuyến xe mỗi ngày, đặt vé trong 2 phút.
          </p>
        )}
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-8 py-3.5 text-base font-semibold text-white shadow-soft transition-all hover:bg-accent-600 hover:shadow-card-hover active:scale-[0.98]"
        >
          <Search className="h-5 w-5" />
          Tìm chuyến xe
        </button>
      </div>
    </form>
  );
}
