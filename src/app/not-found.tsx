import Link from "next/link";
import { Bus, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-soft">
          <Bus className="h-10 w-10" />
        </div>
        <p className="text-6xl font-extrabold text-brand-700">404</p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">
          Không tìm thấy trang
        </h1>
        <p className="mx-auto mt-2 max-w-md text-slate-500">
          Trang bạn tìm kiếm không tồn tại hoặc chuyến xe đã hết hạn. Hãy quay lại
          trang chủ hoặc tìm chuyến xe khác.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700"
          >
            <Home className="h-4 w-4" />
            Về trang chủ
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-800"
          >
            <Search className="h-4 w-4" />
            Tìm chuyến xe
          </Link>
        </div>
      </div>
    </div>
  );
}
