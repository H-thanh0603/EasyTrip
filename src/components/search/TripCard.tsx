import Link from "next/link";
import { Star, MapPin, ArmchairIcon, ArrowRight } from "lucide-react";
import type { EnrichedTrip } from "@/lib/mock-api";
import { formatVND, formatTime, formatDuration } from "@/lib/format";
import { busTypeShort, amenityLabel } from "@/lib/labels";
import { amenityIcon } from "./amenityIcons";
import { cn } from "@/lib/utils";

interface TripCardProps {
  trip: EnrichedTrip;
  date: string;
  passengers: number;
}

// A single trip result: operator, times, route, amenities, price + CTA.
export function TripCard({ trip, date, passengers }: TripCardProps) {
  const seatsLow = trip.availableSeats <= 6;
  const href = `/trips/${trip.id}?date=${date}&passengers=${passengers}`;

  return (
    <article className="group card overflow-hidden transition-all hover:border-brand-200 hover:shadow-card-hover">
      <div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-stretch">
        {/* Operator + times */}
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-sm"
              style={{ backgroundColor: trip.operator.accentColor }}
            >
              {trip.operator.logoText}
            </span>
            <div className="min-w-0">
              <h3 className="truncate font-bold text-slate-900">
                {trip.operator.name}
              </h3>
              <div className="mt-0.5 flex flex-wrap items-center gap-2 text-sm">
                <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 font-semibold text-amber-700">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  {trip.rating.toFixed(1)}
                </span>
                <span className="chip bg-brand-50 text-brand-700">
                  {busTypeShort[trip.busType]}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-5 flex items-center gap-3">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">
                {formatTime(trip.departTime)}
              </p>
            </div>
            <div className="flex flex-1 flex-col items-center px-2">
              <span className="text-xs font-medium text-slate-400">
                {formatDuration(trip.durationMinutes)}
              </span>
              <div className="my-1 flex w-full items-center">
                <span className="h-2 w-2 rounded-full border-2 border-brand-500" />
                <span className="h-0.5 flex-1 bg-gradient-to-r from-brand-400 to-accent-400" />
                <ArrowRight className="h-4 w-4 shrink-0 text-accent-500" />
              </div>
              <span className="text-xs text-slate-400">Trực tuyến</span>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">
                {formatTime(trip.arriveTime)}
              </p>
            </div>
          </div>

          {/* Stations */}
          <div className="mt-3 flex items-start justify-between gap-3 text-sm text-slate-600">
            <span className="inline-flex items-start gap-1.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
              <span className="font-medium">{trip.departureStation}</span>
            </span>
            <span className="inline-flex items-start gap-1.5 text-right">
              <span className="font-medium">{trip.arrivalStation}</span>
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" />
            </span>
          </div>

          {/* Amenities */}
          <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
            {trip.amenities.slice(0, 5).map((a) => {
              const Icon = amenityIcon[a];
              return (
                <span
                  key={a}
                  className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-600"
                  title={amenityLabel[a]}
                >
                  <Icon className="h-3.5 w-3.5 text-brand-500" />
                  {amenityLabel[a]}
                </span>
              );
            })}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-row items-end justify-between gap-3 border-t border-slate-100 pt-4 lg:w-56 lg:flex-col lg:items-end lg:justify-between lg:border-l lg:border-t-0 lg:pl-5 lg:pt-0">
          <div className="text-left lg:text-right">
            <p className="text-xs text-slate-400">Giá từ</p>
            <p className="text-2xl font-extrabold text-accent-600">
              {formatVND(trip.price)}
            </p>
            <p
              className={cn(
                "mt-1 inline-flex items-center gap-1 text-xs font-medium",
                seatsLow ? "text-rose-600" : "text-emerald-600",
              )}
            >
              <ArmchairIcon className="h-3.5 w-3.5" />
              {seatsLow
                ? `Chỉ còn ${trip.availableSeats} ghế`
                : `Còn ${trip.availableSeats} ghế`}
            </p>
          </div>
          <Link
            href={href}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-800 hover:shadow-card-hover active:scale-[0.98]"
          >
            Chọn ghế
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
