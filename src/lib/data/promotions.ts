import type { Promotion } from "@/lib/types";

// Marketing promotions shown in the home banner + promo section.
export const promotions: Promotion[] = [
  {
    id: "pr-1",
    code: "EASY50",
    title: "Giảm 50K cho chuyến đầu tiên",
    description: "Áp dụng cho khách hàng mới đặt vé lần đầu trên EasyTrip.",
    discountLabel: "Giảm 50.000đ",
    expiry: "2026-08-31",
    color: "#1D4ED8",
  },
  {
    id: "pr-2",
    code: "SUMMER20",
    title: "Ưu đãi hè - Giảm 20%",
    description: "Giảm 20% tối đa 100K cho các tuyến du lịch biển và cao nguyên.",
    discountLabel: "Giảm 20%",
    expiry: "2026-07-31",
    color: "#F59E0B",
  },
  {
    id: "pr-3",
    code: "WEEKEND15",
    title: "Vi vu cuối tuần",
    description: "Giảm 15% cho vé khởi hành thứ Bảy và Chủ Nhật hằng tuần.",
    discountLabel: "Giảm 15%",
    expiry: "2026-12-31",
    color: "#059669",
  },
];
