import Link from "next/link";
import { MapPin, CalendarDays, Clock, Armchair, ArrowRight } from "lucide-react";
import type { Booking } from "@/lib/types";
import { formatVND, formatDateVI, formatTime } from "@/lib/format";
import { busTypeLabel } from "@/lib/labels";
import { StatusBadge } from "@/components/ui/Badge";

interface TicketCardProps {
  booking: Booking;
}

// Compact ticket summary card shown on the My Tickets page.
export function TicketCard({ booking }: TicketCardProps) {
  return (
    <article className="card overflow-hidden transition-all hover:shadow-card-hover">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50/60 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-bold tracking-wide text-brand-700">
            {booking.code}
          </span>
        </div>
        <StatusBadge status={booking.status} />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-slate-900">
              {booking.routeLabel}
            </h3>
            <p className="text-sm text-slate-500">
              {booking.operatorName} · {busTypeLabel[booking.busType]}
            </p>
          </div>
          <span className="shrink-0 rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
            {booking.seats.length} vé
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm sm:grid-cols-4">
          <Detail
            icon={<CalendarDays className="h-4 w-4 text-brand-500" />}
            label="Ngày đi"
            value={formatDateVI(booking.departTime)}
          />
          <Detail
            icon={<Clock className="h-4 w-4 text-brand-500" />}
            label="Giờ đi"
            value={formatTime(booking.departTime)}
          />
          <Detail
            icon={<Armchair className="h-4 w-4 text-brand-500" />}
            label="Ghế"
            value={booking.seats.join(", ")}
          />
          <Detail
            icon={<MapPin className="h-4 w-4 text-accent-500" />}
            label="Điểm đón"
            value={booking.pickupPoint}
          />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-400">Tổng tiền</p>
            <p className="text-xl font-extrabold text-accent-600">
              {formatVND(booking.total)}
            </p>
          </div>
          <Link
            href={`/booking/confirmation?code=${booking.code}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all hover:border-brand-400 hover:text-brand-700"
          >
            Xem chi tiết
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-1.5 text-xs text-slate-400">
        {icon}
        {label}
      </div>
      <p className="mt-0.5 truncate font-medium text-slate-700">{value}</p>
    </div>
  );
}
