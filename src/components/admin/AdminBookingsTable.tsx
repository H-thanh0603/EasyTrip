"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { BookingStatus } from "@/lib/types";
import type { AdminBooking } from "@/lib/admin-data";
import { formatVND, formatShortDate } from "@/lib/format";
import { bookingStatusLabel } from "@/lib/labels";
import { DataTable, type Column } from "./DataTable";
import { StatusBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type FilterKey = "all" | BookingStatus;

const filterTabs: Array<{ key: FilterKey; label: string }> = [
  { key: "all", label: "Tất cả" },
  { key: "pending", label: bookingStatusLabel.pending },
  { key: "confirmed", label: bookingStatusLabel.confirmed },
  { key: "completed", label: bookingStatusLabel.completed },
  { key: "cancelled", label: bookingStatusLabel.cancelled },
];

// Bookings management: client-side search + status filtering over the mock list.
export function AdminBookingsTable({ bookings }: { bookings: AdminBooking[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return bookings.filter((b) => {
      const matchStatus = filter === "all" || b.status === filter;
      const matchQuery =
        !q ||
        b.code.toLowerCase().includes(q) ||
        b.customer.toLowerCase().includes(q) ||
        b.routeLabel.toLowerCase().includes(q);
      return matchStatus && matchQuery;
    });
  }, [bookings, filter, query]);

  const columns: Column<AdminBooking>[] = [
    {
      key: "code",
      header: "Mã vé",
      render: (r) => (
        <span className="font-mono font-semibold text-slate-900">{r.code}</span>
      ),
    },
    { key: "customer", header: "Khách hàng", render: (r) => r.customer },
    {
      key: "route",
      header: "Tuyến",
      render: (r) => <span className="text-slate-600">{r.routeLabel}</span>,
    },
    {
      key: "operator",
      header: "Nhà xe",
      render: (r) => <span className="text-slate-600">{r.operatorName}</span>,
    },
    {
      key: "seats",
      header: "Số ghế",
      align: "center",
      render: (r) => r.seats,
    },
    {
      key: "total",
      header: "Số tiền",
      align: "right",
      render: (r) => (
        <span className="font-semibold text-slate-900">{formatVND(r.total)}</span>
      ),
    },
    {
      key: "status",
      header: "Trạng thái",
      render: (r) => <StatusBadge status={r.status} />,
    },
    {
      key: "createdAt",
      header: "Ngày đặt",
      align: "right",
      render: (r) => <span className="text-slate-500">{formatShortDate(r.createdAt)}</span>,
    },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setFilter(tab.key)}
              className={cn(
                "shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                filter === tab.key
                  ? "bg-brand-700 text-white"
                  : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm mã vé, khách hàng, tuyến..."
            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
      </div>

      <p className="mb-3 text-sm text-slate-500">
        Hiển thị <span className="font-semibold text-slate-700">{visible.length}</span> đơn
      </p>

      <DataTable
        columns={columns}
        rows={visible}
        rowKey={(r) => r.code}
        emptyLabel="Không tìm thấy đơn đặt vé phù hợp"
      />
    </div>
  );
}
