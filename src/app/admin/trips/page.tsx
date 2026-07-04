import { Bus, Star, Armchair } from "lucide-react";
import { getAdminTrips, type AdminTripRow } from "@/lib/admin-data";
import { formatVND } from "@/lib/format";
import { DataTable, type Column } from "@/components/admin/DataTable";

export default function AdminTripsPage() {
  const trips = getAdminTrips();

  const columns: Column<AdminTripRow>[] = [
    {
      key: "operator",
      header: "Nhà xe",
      render: (r) => (
        <span className="font-semibold text-slate-900">{r.operatorName}</span>
      ),
    },
    {
      key: "route",
      header: "Tuyến đường",
      render: (r) => <span className="text-slate-600">{r.routeLabel}</span>,
    },
    {
      key: "busType",
      header: "Loại xe",
      render: (r) => (
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
          <Bus className="h-3.5 w-3.5" />
          {r.busTypeLabel}
        </span>
      ),
    },
    {
      key: "depart",
      header: "Giờ đi",
      align: "center",
      render: (r) => <span className="font-medium text-slate-700">{r.departLabel}</span>,
    },
    {
      key: "seats",
      header: "Ghế trống",
      align: "center",
      render: (r) => (
        <span className="inline-flex items-center gap-1 text-slate-600">
          <Armchair className="h-3.5 w-3.5 text-brand-500" />
          {r.availableSeats}/{r.totalSeats}
        </span>
      ),
    },
    {
      key: "rating",
      header: "Đánh giá",
      align: "center",
      render: (r) => (
        <span className="inline-flex items-center gap-1 font-medium text-amber-600">
          <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
          {r.rating.toFixed(1)}
        </span>
      ),
    },
    {
      key: "price",
      header: "Giá vé",
      align: "right",
      render: (r) => (
        <span className="font-semibold text-accent-600">{formatVND(r.price)}</span>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Quản lý chuyến xe</h1>
        <p className="mt-1 text-sm text-slate-500">
          Danh sách {trips.length} chuyến xe đang được khai thác trên hệ thống.
        </p>
      </div>

      <DataTable columns={columns} rows={trips} rowKey={(r) => r.id} />
    </div>
  );
}
