import { getPromotions } from "@/lib/mock-api";
import { Ticket } from "lucide-react";
import { CopyCodeButton } from "./CopyCodeButton";

export function PromoBanner() {
  const promotions = getPromotions();

  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="chip bg-accent-100 text-accent-700">Ưu đãi hôm nay</span>
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Mã giảm giá & khuyến mãi
            </h2>
          </div>
          <p className="max-w-md text-sm text-slate-600">
            Áp dụng mã khi thanh toán để tiết kiệm hơn cho mỗi chuyến đi. Số lượng có hạn.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="group relative overflow-hidden rounded-2xl p-6 text-white shadow-card transition-all hover:shadow-card-hover"
              style={{
                background: `linear-gradient(135deg, ${promo.color} 0%, ${promo.color}dd 100%)`,
              }}
            >
              <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/10" />
              <div className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-white/10" />

              <div className="relative">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                    <Ticket className="h-5 w-5" />
                  </span>
                  <span className="text-2xl font-extrabold">{promo.discountLabel}</span>
                </div>
                <h3 className="mb-1 text-lg font-bold">{promo.title}</h3>
                <p className="mb-5 text-sm text-white/85">{promo.description}</p>

                <div className="flex items-center justify-between rounded-xl border border-dashed border-white/50 bg-white/10 px-3 py-2.5 backdrop-blur">
                  <span className="font-mono text-base font-bold tracking-wider">
                    {promo.code}
                  </span>
                  <CopyCodeButton code={promo.code} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
