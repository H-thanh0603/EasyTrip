import { adminBookings } from "@/lib/admin-data";
import { AdminBookingsTable } from "@/components/admin/AdminBookingsTable";

export default function AdminBookingsPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Đơn đặt vé</h1>
        <p className="mt-1 text-sm text-slate-500">
          Tra cứu và theo dõi trạng thái tất cả đơn đặt vé.
        </p>
      </div>
      <AdminBookingsTable bookings={adminBookings} />
    </div>
  );
}
