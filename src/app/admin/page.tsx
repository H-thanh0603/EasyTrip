import {
  ClipboardList,
  Wallet,
  Bus,
  XCircle,
  Route as RouteIcon,
  Building2,
} from "lucide-react";
import {
  getAdminStats,
  getRevenueByWeekday,
  getStatusBreakdown,
  getBusTypeShare,
  getRouteCount,
  getOperatorCount,
  adminBookings,
} from "@/lib/admin-data";
import { formatVND, formatShortDate } from "@/lib/format";
import { StatCard } from "@/components/admin/StatCard";
import { DataTable, type Column } from "@/components/admin/DataTable";
import { RevenueChart, StatusDonut } from "@/components/admin/Charts";
import { StatusBadge } from "@/components/ui/Badge";
import { bookingStatusLabel } from "@/lib/labels";
import type { AdminBooking } from "@/lib/admin-data";

const statusColors: Record<string, string> = {
  pending: "#f59e0b",
  confirmed: "#10b981",
  cancelled: "#f43f5e",
  completed: "#1d4ed8",
};

export default function AdminDashboardPage() {
  const stats = getAdminStats();
  const revenueData = getRevenueByWeekday();
  const statusBreakdown = getStatusBreakdown();
  const busTypeShare = getBusTypeShare();
  const recentBookings = adminBookings.slice(0, 8);

  const donutData = statusBreakdown.map((s) => ({
    label: bookingStatusLabel[s.status],
    value: s.count,
    color: statusColors[s.status],
  }));

  const columns: Column<AdminBooking>[] = [
    {
      key: "code",
      header: "Mã vé",
      render: (r) => <span className="font-mono font-semibold text-slate-900">{r.code}</span>,
    },
    { key: "customer", header: "Khách hàng", render: (r) => r.customer },
    {
      key: "route",
      header: "Tuyến",
      render: (r) => <span className="text-slate-600">{r.routeLabel}</span>,
    },
    {
      key: "total",
      header: "Số tiền",
      align: "right",
      render: (r) => <span className="font-semibold text-slate-900">{formatVND(r.total)}</span>,
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
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Tổng quan</h1>
        <p className="mt-1 text-sm text-slate-500">
          Số liệu hoạt động đặt vé trong 30 ngày gần nhất.
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Tổng đơn đặt vé"
          value={String(stats.totalBookings)}
          icon={ClipboardList}
          tone="brand"
          delta={12.5}
          hint="So với tháng trước"
        />
        <StatCard
          label="Doanh thu"
          value={formatVND(stats.revenue)}
          icon={Wallet}
          tone="success"
          delta={8.2}
          hint="So với tháng trước"
        />
        <StatCard
          label="Chuyến xe đang mở"
          value={String(stats.activeTrips)}
          icon={Bus}
          tone="accent"
        />
        <StatCard
          label="Vé đã hủy"
          value={String(stats.cancelled)}
          icon={XCircle}
          tone="danger"
        />
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 lg:col-span-2">
          <h2 className="mb-4 font-bold text-slate-900">Doanh thu theo ngày trong tuần</h2>
          <RevenueChart data={revenueData} />
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="mb-4 font-bold text-slate-900">Phân bố trạng thái vé</h2>
          <StatusDonut data={donutData} />
        </div>
      </div>

      {/* Secondary summaries */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Tuyến đường"
          value={String(getRouteCount())}
          icon={RouteIcon}
          tone="brand"
        />
        <StatCard
          label="Nhà xe đối tác"
          value={String(getOperatorCount())}
          icon={Building2}
          tone="accent"
        />
        {busTypeShare.slice(0, 2).map((b) => (
          <StatCard
            key={b.busType}
            label={`Chuyến ${b.label}`}
            value={String(b.count)}
            icon={Bus}
            tone="brand"
          />
        ))}
      </div>

      {/* Recent bookings */}
      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Đơn đặt vé gần đây</h2>
          <a
            href="/admin/bookings"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            Xem tất cả
          </a>
        </div>
        <DataTable columns={columns} rows={recentBookings} rowKey={(r) => r.code} />
      </div>
    </div>
  );
}
