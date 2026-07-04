import Link from "next/link";
import { ArrowRight, MapPin, TrendingUp } from "lucide-react";
import { getPopularRoutes } from "@/lib/mock-api";
import { formatVND } from "@/lib/format";

const gradients = [
  "from-blue-500/90 to-indigo-600/90",
  "from-emerald-500/90 to-teal-600/90",
  "from-amber-500/90 to-orange-600/90",
  "from-rose-500/90 to-pink-600/90",
  "from-violet-500/90 to-purple-600/90",
  "from-cyan-500/90 to-sky-600/90",
];

export function PopularRoutes() {
  const routes = getPopularRoutes(6);

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
            <TrendingUp className="h-4 w-4" />
            Tuyến phổ biến
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Các tuyến đường được đặt nhiều nhất
          </h2>
          <p className="mt-2 max-w-xl text-slate-600">
            Khám phá những hành trình được hành khách yêu thích với mức giá tốt và nhiều nhà xe chất lượng.
          </p>
        </div>
        <Link
          href="/search"
          className="inline-flex items-center gap-1.5 font-semibold text-brand-700 hover:text-brand-800"
        >
          Xem tất cả tuyến
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {routes.map((route, i) => (
          <Link
            key={route.routeId}
            href={`/search?from=${route.fromCityId}&to=${route.toCityId}&passengers=1`}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
          >
            <div className={`relative h-32 bg-gradient-to-br ${gradients[i % gradients.length]}`}>
              <div className="absolute inset-0 bg-hero-grid opacity-40" />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <div className="text-white">
                  <div className="text-lg font-bold drop-shadow">{route.fromCityName}</div>
                  <div className="my-1 flex items-center gap-1.5 text-white/80">
                    <div className="h-px w-8 bg-white/60" />
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div className="text-lg font-bold drop-shadow">{route.toCityName}</div>
                </div>
                <MapPin className="h-10 w-10 text-white/40" />
              </div>
            </div>
            <div className="flex items-center justify-between p-5">
              <div>
                <div className="text-xs text-slate-500">Chỉ từ</div>
                <div className="text-xl font-bold text-brand-700">
                  {formatVND(route.fromPrice)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">{route.distanceKm} km</div>
                <div className="text-sm font-medium text-slate-600">
                  {route.operatorCount} nhà xe
                </div>
              </div>
            </div>
            <div className="absolute right-5 top-5 rounded-full bg-white/20 p-2 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
