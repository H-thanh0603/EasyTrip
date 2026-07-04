import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EasyTrip — Đặt vé xe khách trực tuyến",
  description:
    "Đặt vé xe khách nhanh chóng, an toàn và tiện lợi. So sánh nhà xe, chọn ghế và thanh toán chỉ trong vài phút cùng EasyTrip.",
  keywords: [
    "đặt vé xe khách",
    "vé xe online",
    "xe giường nằm",
    "limousine",
    "EasyTrip",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3200,
            style: {
              borderRadius: "12px",
              background: "#0f172a",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 500,
            },
          }}
        />
      </body>
    </html>
  );
}
