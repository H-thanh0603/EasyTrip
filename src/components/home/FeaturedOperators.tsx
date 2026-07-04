import { Star, ShieldCheck } from "lucide-react";
import { getFeaturedOperators } from "@/lib/mock-api";

export function FeaturedOperators() {
  const operators = getFeaturedOperators(6);

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-10 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-700">
            <ShieldCheck className="h-4 w-4" />
            Nhà xe đối tác
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Đồng hành cùng các nhà xe uy tín
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Chúng tôi hợp tác với những thương hiệu vận tải hàng đầu để mang đến hành trình an toàn và thoải mái.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {operators.map((op) => (
            <div
              key={op.id}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
            >
              <div className="flex items-center gap-4">
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-soft"
                  style={{ backgroundColor: op.accentColor }}
                >
                  {op.logoText}
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{op.name}</h3>
                  <div className="mt-0.5 flex items-center gap-2 text-sm">
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-500">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      {op.rating.toFixed(1)}
                    </span>
                    <span className="text-slate-400">
                      ({op.reviewCount.toLocaleString("vi-VN")} đánh giá)
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-slate-600">{op.description}</p>
              <div className="mt-auto flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                Hoạt động từ {op.established}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
