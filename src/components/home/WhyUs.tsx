import { ShieldCheck, Wallet, Headphones, Armchair, Ticket, Clock } from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Đặt vé dễ dàng",
    desc: "Tìm chuyến, chọn ghế và thanh toán chỉ trong vài phút với giao diện trực quan.",
    color: "text-brand-600",
    bg: "bg-brand-50",
  },
  {
    icon: ShieldCheck,
    title: "An toàn & tin cậy",
    desc: "Nhà xe được xác thực, thông tin minh bạch, vé điện tử xác nhận tức thì.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Wallet,
    title: "Giá tốt mỗi ngày",
    desc: "So sánh giá giữa các nhà xe và nhận ưu đãi độc quyền chỉ có tại EasyTrip.",
    color: "text-accent-600",
    bg: "bg-accent-50",
  },
  {
    icon: Armchair,
    title: "Chọn ghế yêu thích",
    desc: "Sơ đồ ghế trực quan giúp bạn chọn đúng vị trí mong muốn trên xe.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: Headphones,
    title: "Hỗ trợ 24/7",
    desc: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng đồng hành trên mọi hành trình.",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    icon: Clock,
    title: "Đúng giờ, đúng chuyến",
    desc: "Theo dõi trạng thái vé và thông tin chuyến đi cập nhật theo thời gian thực.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
];

export function WhyUs() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="container-page">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Vì sao chọn EasyTrip?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Trải nghiệm đặt vé xe khách hiện đại, minh bạch và tiện lợi bậc nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
              >
                <span
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.bg} ${f.color} transition-transform group-hover:scale-110`}
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mb-1.5 text-lg font-bold text-slate-900">{f.title}</h3>
                <p className="text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
