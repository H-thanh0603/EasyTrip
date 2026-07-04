import Link from "next/link";
import { Bus, Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

const columns = [
  {
    title: "Về EasyTrip",
    links: [
      { label: "Giới thiệu", href: "/" },
      { label: "Tuyển dụng", href: "/" },
      { label: "Điều khoản sử dụng", href: "/" },
      { label: "Chính sách bảo mật", href: "/" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { label: "Trung tâm trợ giúp", href: "/" },
      { label: "Quy định hoàn vé", href: "/" },
      { label: "Câu hỏi thường gặp", href: "/" },
      { label: "Liên hệ", href: "/" },
    ],
  },
  {
    title: "Tuyến phổ biến",
    links: [
      { label: "TP.HCM → Đà Lạt", href: "/search" },
      { label: "Hà Nội → Đà Nẵng", href: "/search" },
      { label: "TP.HCM → Nha Trang", href: "/search" },
      { label: "Đà Nẵng → Huế", href: "/search" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <Bus className="h-5 w-5" />
              </span>
              <span className="text-lg font-bold tracking-tight text-white">
                Easy<span className="text-brand-400">Trip</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              Nền tảng đặt vé xe khách trực tuyến hàng đầu Việt Nam. Đặt vé nhanh
              chóng, chọn chỗ dễ dàng, thanh toán an toàn cho mọi hành trình.
            </p>
            <div className="mt-6 space-y-2.5 text-sm text-slate-400">
              <p className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-400" /> 1900 1234 (24/7)
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-400" /> hotro@easytrip.vn
              </p>
              <p className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 text-brand-400" /> 123 Nguyễn Huệ, Q.1, TP. Hồ Chí Minh
              </p>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-brand-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 sm:flex-row">
          <p className="text-sm text-slate-500">
            © 2026 EasyTrip. Đã đăng ký bản quyền.
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-slate-400 transition-colors hover:bg-brand-600 hover:text-white"
                aria-label="Mạng xã hội"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
