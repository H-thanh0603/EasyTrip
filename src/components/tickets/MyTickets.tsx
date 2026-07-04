"use client";

import { useEffect, useMemo, useState } from "react";
import { TicketX, Search } from "lucide-react";
import type { Booking, BookingStatus } from "@/lib/types";
import { loadTickets } from "@/lib/booking-store";
import { bookingStatusLabel } from "@/lib/labels";
import { TicketCard } from "./TicketCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { LoadingState } from "@/components/ui/LoadingState";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FilterKey = "all" | BookingStatus;

const filterTabs: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: bookingStatusLabel.pending },
  { key: "confirmed", label: bookingStatusLabel.confirmed },
  { key: "completed", label: bookingStatusLabel.completed },
  { key: "cancelled", label: bookingStatusLabel.cancelled },
];

// My Tickets: loads confirmed bookings from localStorage with status filtering.
export function MyTickets() {
  const [ready, setReady] = useState(false);
  const [tickets, setTickets] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<FilterKey>("all");

  useEffect(() => {
    setTickets(loadTickets());
    setReady(true);
  }, []);

  const counts = useMemo(() => {
    const map: Record<FilterKey, number> = {
      all: tickets.length,
      pending: 0,
      confirmed: 0,
      cancelled: 0,
      completed: 0,
    };
    for (const t of tickets) {
      map[t.status] += 1;
    }
    return map;
  }, [tickets]);

  const visible = useMemo(
    () => (filter === "all" ? tickets : tickets.filter((t) => t.status === filter)),
    [tickets, filter],
  );

  return (
    <div className="bg-slate-50">
      <div className="container-page py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Vé của tôi</h1>
          <p className="mt-1 text-slate-500">
            Quản lý và tra cứu các vé xe bạn đã đặt trên EasyTrip.
          </p>
        </div>

        {!ready ? (
          <LoadingState label="Đang tải danh sách vé..." />
        ) : tickets.length === 0 ? (
          <EmptyState
            icon={<TicketX className="h-8 w-8" />}
            title="Bạn chưa có vé nào"
            description="Hãy tìm chuyến xe phù hợp và đặt vé đầu tiên của bạn ngay hôm nay."
            action={
              <Button href="/search" variant="primary">
                <Search className="h-4 w-4" />
                Tìm chuyến xe
              </Button>
            }
          />
        ) : (
          <>
            {/* Filter tabs */}
            <div className="mb-5 flex gap-2 overflow-x-auto no-scrollbar">
              {filterTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={cn(
                    "inline-flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                    filter === tab.key
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-brand-300",
                  )}
                >
                  {tab.label}
                  <span
                    className={cn(
                      "rounded-full px-1.5 text-xs font-bold",
                      filter === tab.key
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-500",
                    )}
                  >
                    {counts[tab.key]}
                  </span>
                </button>
              ))}
            </div>

            {visible.length === 0 ? (
              <EmptyState
                icon={<TicketX className="h-8 w-8" />}
                title="Không có vé ở trạng thái này"
                description="Chọn bộ lọc khác để xem các vé của bạn."
              />
            ) : (
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {visible.map((booking) => (
                  <TicketCard key={booking.code} booking={booking} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
