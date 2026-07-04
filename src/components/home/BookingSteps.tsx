import { Search, MousePointerClick, CreditCard, BusFront } from "lucide-react";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Tìm chuyến xe",
    desc: "Nhập điểm đi, điểm đến và ngày khởi hành để xem các chuyến phù hợp.",
  },
  {
    icon: MousePointerClick,
    step: "02",
    title: "Chọn ghế & nhà xe",
    desc: "So sánh nhà xe, xem sơ đồ ghế và chọn vị trí bạn yêu thích.",
  },
  {
    icon: CreditCard,
    step: "03",
    title: "Điền thông tin & thanh toán",
    desc: "Nhập thông tin hành khách và hoàn tất đặt vé chỉ trong vài bước.",
  },
  {
    icon: BusFront,
    step: "04",
    title: "Lên xe & tận hưởng",
    desc: "Nhận vé điện tử, đến điểm đón đúng giờ và bắt đầu hành trình.",
  },
];

export function BookingSteps() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-12 text-center">
          <span className="chip bg-brand-50 text-brand-700">Quy trình đơn giản</span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Đặt vé chỉ với 4 bước
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line on large screens */}
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-brand-100 via-brand-300 to-brand-100 lg:block" />

          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 text-white shadow-card-hover">
                  <Icon className="h-7 w-7" />
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent-500 text-xs font-bold text-white shadow-sm">
                    {s.step}
                  </span>
                </div>
                <h3 className="mb-1.5 text-lg font-bold text-slate-900">{s.title}</h3>
                <p className="max-w-[240px] text-sm leading-relaxed text-slate-600">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
