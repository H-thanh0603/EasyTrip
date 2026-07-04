import { ShieldCheck, Star, Clock } from "lucide-react";
import { SearchBox } from "@/components/search/SearchBox";

const trustPoints = [
  { icon: ShieldCheck, label: "Thanh toán an toàn" },
  { icon: Star, label: "4.8/5 từ 25.000+ đánh giá" },
  { icon: Clock, label: "Hỗ trợ 24/7" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-900 text-white">
      {/* Decorative layers */}
      <div className="absolute inset-0 bg-hero-grid opacity-40" aria-hidden />
      <div
        className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-500/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-brand-400/20 blur-3xl"
        aria-hidden
      />

      <div className="container-page relative py-14 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur">
            <span className="flex h-2 w-2 rounded-full bg-accent-400" />
            Nền tảng đặt vé xe khách hàng đầu Việt Nam
          </span>
          <h1 className="mt-6 text-balance text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Đặt vé xe khách
            <span className="block bg-gradient-to-r from-accent-300 to-accent-500 bg-clip-text text-transparent">
              nhanh chóng & an tâm
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg text-white/80">
            So sánh hàng trăm nhà xe uy tín, chọn ghế yêu thích và thanh toán chỉ trong vài phút.
            EasyTrip đồng hành cùng mọi hành trình của bạn.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <SearchBox variant="hero" />
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {trustPoints.map((point) => (
            <div key={point.label} className="flex items-center gap-2 text-sm text-white/85">
              <point.icon className="h-5 w-5 text-accent-300" />
              {point.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
