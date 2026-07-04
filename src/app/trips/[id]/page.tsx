import { notFound } from "next/navigation";
import { Star, MapPin, Clock, Users } from "lucide-react";
import { getTripById, enrichTrip, getSeatsForTrip } from "@/lib/mock-api";
import { formatTime, formatDateVI, formatDuration } from "@/lib/format";
import { busTypeLabel, amenityLabel } from "@/lib/labels";
import { amenityIcon } from "@/components/search/amenityIcons";
import { SeatSelection } from "@/components/booking/SeatSelection";
import { toDateInputValue } from "@/lib/format";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date?: string; passengers?: string }>;
}

export default async function TripDetailPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { date: dateParam, passengers: passengersParam } = await searchParams;

  const trip = getTripById(id);
  if (!trip) {
    notFound();
  }

  const date = dateParam || toDateInputValue(new Date());
  const passengers = Math.max(1, Math.min(6, Number(passengersParam) || 1));

  const enriched = enrichTrip(trip, date);
  const seats = getSeatsForTrip(trip.id);

  return (
    <div className="bg-slate-50">
      {/* Trip summary header */}
      <section className="bg-gradient-to-br from-brand-800 to-brand-700 text-white">
        <div className="container-page py-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-soft ring-1 ring-white/20"
                style={{ backgroundColor: enriched.operator.accentColor }}
              >
                {enriched.operator.logoText}
              </span>
              <div>
                <h1 className="text-2xl font-bold">{enriched.operator.name}</h1>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-sm">
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/15 px-2 py-0.5 font-semibold backdrop-blur">
                    <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                    {enriched.rating.toFixed(1)}
                  </span>
                  <span className="rounded-md bg-white/15 px-2 py-0.5 font-medium backdrop-blur">
                    {busTypeLabel[enriched.busType]}
                  </span>
                  <span className="inline-flex items-center gap-1 text-white/80">
                    <Users className="h-3.5 w-3.5" />
                    Còn {enriched.availableSeats} ghế
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6 rounded-2xl bg-white/10 px-5 py-3 backdrop-blur">
              <div className="text-center">
                <p className="text-2xl font-bold">{formatTime(enriched.departTime)}</p>
                <p className="text-xs text-white/70">Khởi hành</p>
              </div>
              <div className="flex flex-col items-center text-white/70">
                <span className="text-xs">{formatDuration(enriched.durationMinutes)}</span>
                <div className="my-1 h-px w-16 bg-white/40" />
                <Clock className="h-3.5 w-3.5" />
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{formatTime(enriched.arriveTime)}</p>
                <p className="text-xs text-white/70">Đến nơi</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/85">
            <span>{formatDateVI(date)}</span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-accent-300" />
              {enriched.fromCityName} → {enriched.toCityName}
            </span>
          </div>

          {/* Amenities */}
          <div className="mt-4 flex flex-wrap gap-2">
            {enriched.amenities.map((a) => {
              const Icon = amenityIcon[a];
              return (
                <span
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur"
                >
                  <Icon className="h-3.5 w-3.5 text-accent-300" />
                  {amenityLabel[a]}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <SeatSelection
        trip={enriched}
        seats={seats}
        date={date}
        passengers={passengers}
      />
    </div>
  );
}
