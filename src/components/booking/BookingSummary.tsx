import type { ReactNode } from "react";
import { MapPin, Clock, CalendarDays, Armchair } from "lucide-react";
import type { EnrichedTrip } from "@/lib/mock-api";
import { formatVND, formatTime, formatDateVI, formatDuration } from "@/lib/format";
import { busTypeLabel } from "@/lib/labels";

interface BookingSummaryProps {
  trip: EnrichedTrip;
  date: string;
  selectedSeats: string[];
  seatPrices: Record<string, number>;
  total: number;
  footer?: ReactNode;
}

// Sticky order summary shown on seat selection, passenger and confirmation steps.
export function BookingSummary({
  trip,
  date,
  selectedSeats,
  seatPrices,
  total,
  footer,
}: BookingSummaryProps) {
  return (
    <div className="card overflow-hidden">
      {/* Operator header */}
      <div className="flex items-center gap-3 border-b border-slate-100 p-5">
        <span
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white"
          style={{ backgroundColor: trip.operator.accentColor }}
        >
          {trip.operator.logoText}
        </span>
        <div className="min-w-0">
          <p className="truncate font-bold text-slate-900">{trip.operator.name}</p>
          <p className="text-xs text-slate-500">{busTypeLabel[trip.busType]}</p>
        </div>
      </div>

      {/* Trip details */}
      <div className="space-y-3 border-b border-slate-100 p-5 text-sm">
        <Row
          icon={<CalendarDays className="h-4 w-4 text-brand-500" />}
          label="Ngày đi"
          value={date ? formatDateVI(date) : "-"}
        />
        <Row
          icon={<Clock className="h-4 w-4 text-brand-500" />}
          label="Giờ khởi hành"
          value={`${formatTime(trip.departTime)} → ${formatTime(trip.arriveTime)} (${formatDuration(trip.durationMinutes)})`}
        />
        <div className="flex items-start gap-2">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
          <div className="min-w-0 flex-1">
            <p className="text-slate-700">
              <span className="text-slate-400">Đón: </span>
              {trip.departureStation}
            </p>
            <p className="mt-1 text-slate-700">
              <span className="text-slate-400">Trả: </span>
              {trip.arrivalStation}
            </p>
          </div>
        </div>
      </div>

      {/* Seats */}
      <div className="border-b border-slate-100 p-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
          <Armchair className="h-4 w-4 text-brand-500" />
          Ghế đã chọn
        </div>
        {selectedSeats.length === 0 ? (
          <p className="text-sm text-slate-400">Chưa chọn ghế nào</p>
        ) : (
          <div className="space-y-1.5">
            {selectedSeats.map((label) => (
              <div key={label} className="flex justify-between text-sm">
                <span className="inline-flex items-center gap-1.5 text-slate-600">
                  <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                    {label}
                  </span>
                </span>
                <span className="font-medium text-slate-700">
                  {formatVND(seatPrices[label] ?? 0)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Total */}
      <div className="p-5">
        <div className="flex items-end justify-between">
          <span className="text-sm text-slate-500">
            Tổng cộng ({selectedSeats.length} vé)
          </span>
          <span className="text-2xl font-extrabold text-accent-600">
            {formatVND(total)}
          </span>
        </div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-2">
      {icon}
      <div className="flex-1">
        <span className="text-slate-400">{label}: </span>
        <span className="text-slate-700">{value}</span>
      </div>
    </div>
  );
}
